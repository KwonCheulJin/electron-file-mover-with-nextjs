import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  selectFolder: (): Promise<string | null> =>
    ipcRenderer.invoke('select-folder'),
  getFiles: (folderPath: string): Promise<any[]> =>
    ipcRenderer.invoke('get-files', folderPath),
  getFolderTree: (folderPath: string): Promise<any[]> =>
    ipcRenderer.invoke('get-folder-tree', folderPath),
  moveFiles: (filePaths: string[], targetFolder: string): Promise<any[]> =>
    ipcRenderer.invoke('move-files', filePaths, targetFolder),
});
