import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import fs from 'fs/promises';
import path from 'path';
import url from 'url';

type Result<T> = { success: true; data: T } | { success: false; error: string };

interface ElectronFileInfo {
  name: string;
  path: string;
  isDirectory: boolean;
  size: number;
  modified: Date;
}

interface FolderType {
  name: string;
  path: string;
  children: FolderType[];
}

const isDev = !app.isPackaged;
let mainWindow: BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: true,
      devTools: true,
    },
    titleBarStyle: 'default',
    show: false,
    backgroundColor: '#ffffff',
  });

  const startUrl = isDev
    ? 'http://localhost:3000'
    : url.format({
        pathname: path.join(__dirname, '../out/index.html'),
        protocol: 'file:',
        slashes: true,
      });

  mainWindow.loadURL(startUrl);

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();

    if (process.env.NODE_ENV === 'development') {
      mainWindow?.webContents
        .executeJavaScript(
          `
          console.log('CSS 로딩 상태 확인:');
          console.log('document.styleSheets.length:', document.styleSheets.length);
          console.log('Tailwind 클래스 테스트:', getComputedStyle(document.body));
        `
        )
        .catch(console.error);
    }
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.on(
    'did-fail-load',
    (_event, _code, description, url) => {
      console.error('❌ Failed to load:', url, description);
    }
  );
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  if (mainWindow === null) createWindow();
});

// 📁 폴더 선택
ipcMain.handle('select-folder', async (): Promise<Result<string | null>> => {
  try {
    const result = await dialog.showOpenDialog(mainWindow!, {
      properties: ['openDirectory'],
      title: '폴더 선택',
    });

    return {
      success: true,
      data: result.canceled ? null : result.filePaths[0],
    };
  } catch (error) {
    console.error('Error selecting folder:', error);
    return { success: false, error: '폴더 선택 중 오류가 발생했습니다.' };
  }
});

// 📄 파일 목록 가져오기
ipcMain.handle(
  'get-files',
  async (_event, folderPath: string): Promise<Result<ElectronFileInfo[]>> => {
    try {
      const items = await fs.readdir(folderPath);
      const fileDetails = await Promise.all(
        items.map(async item => {
          const itemPath = path.join(folderPath, item);
          try {
            const stats = await fs.stat(itemPath);
            return {
              name: item,
              path: itemPath,
              isDirectory: stats.isDirectory(),
              size: stats.size,
              modified: stats.mtime,
            };
          } catch (error) {
            console.error(`Error getting stats for ${itemPath}:`, error);
            return null;
          }
        })
      );

      const filtered = fileDetails.filter(
        item => item && !item.isDirectory && !item.name.startsWith('.')
      );
      return { success: true, data: filtered as ElectronFileInfo[] };
    } catch (error: any) {
      console.error('Error reading directory:', error);
      return {
        success: false,
        error: `폴더를 읽을 수 없습니다: ${error.message}`,
      };
    }
  }
);

// 📁 폴더 트리 가져오기
ipcMain.handle(
  'get-folder-tree',
  async (_event, rootPath: string): Promise<Result<FolderType[]>> => {
    const buildTree = async (
      folderPath: string,
      maxDepth = 3,
      currentDepth = 0
    ): Promise<FolderType[]> => {
      if (currentDepth >= maxDepth) return [];

      try {
        const items = await fs.readdir(folderPath);
        const folders: FolderType[] = [];

        for (const item of items) {
          const itemPath = path.join(folderPath, item);
          try {
            const stats = await fs.stat(itemPath);
            if (stats.isDirectory()) {
              const children = await buildTree(
                itemPath,
                maxDepth,
                currentDepth + 1
              );
              folders.push({ name: item, path: itemPath, children });
            }
          } catch {
            continue;
          }
        }

        return folders;
      } catch {
        return [];
      }
    };

    try {
      const tree = await buildTree(rootPath);
      return {
        success: true,
        data: [
          {
            name: path.basename(rootPath),
            path: rootPath,
            children: tree,
          },
        ],
      };
    } catch (error) {
      console.error('Error building folder tree:', error);
      return {
        success: false,
        error: '폴더 트리를 가져오는 중 오류가 발생했습니다.',
      };
    }
  }
);

// ✅ 파일명이 중복되면 고유한 경로 생성
async function getUniqueFilePath(
  targetFolder: string,
  fileName: string
): Promise<string> {
  const ext = path.extname(fileName);
  const baseName = path.basename(fileName, ext);
  let counter = 1;
  let targetPath = path.join(targetFolder, fileName);

  while (true) {
    try {
      await fs.access(targetPath);
      targetPath = path.join(targetFolder, `${baseName}_${counter}${ext}`);
      counter++;
    } catch {
      break;
    }
  }

  return targetPath;
}

// ✅ 파일 복사 (원본 유지)
async function copyFileSafely(
  source: string,
  destination: string
): Promise<void> {
  try {
    await fs.copyFile(source, destination);
  } catch (error) {
    throw error;
  }
}

// 📂 파일 이동 API
ipcMain.handle(
  'move-files',
  async (
    _event,
    filePaths: string[],
    targetFolder: string
  ): Promise<
    Result<{
      success: { file: string; to: string }[];
      fail: { file: string; error: string }[];
    }>
  > => {
    const success: { file: string; to: string }[] = [];
    const fail: { file: string; error: string }[] = [];

    await Promise.all(
      filePaths.map(async sourcePath => {
        const fileName = path.basename(sourcePath);
        const targetPath = path.join(targetFolder, fileName); // ✅ 고유 파일명 로직 제거

        try {
          await copyFileSafely(sourcePath, targetPath); // 그대로 복사
          success.push({ file: fileName, to: targetPath });
        } catch (error) {
          console.error(`❌ 파일 이동 실패: ${fileName}`, error);
          fail.push({
            file: fileName,
            error: error instanceof Error ? error.message : String(error),
          });
        }
      })
    );

    return { success: true, data: { success, fail } };
  }
);
