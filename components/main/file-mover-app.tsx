'use client';

import FileList from '@/components/file/file-list';
import FolderSelectButton from '@/components/folder/folder-select-button';
import FolderSelector from '@/components/folder/folder-selector';
import Header from '@/components/main/header';
import { Button } from '@/components/ui/button';
import { useFileMoverContext } from '@/context/file-mover-context';
import { useElectron } from '@/hooks/use-electron';
import { useFileMover } from '@/hooks/use-file-mover';
import { ArrowRight } from 'lucide-react';
import { useEffect } from 'react';

export default function FileMoverApp() {
  const { electronAPI } = useElectron();
  const {
    sourceFolder,
    sourceFolderTree,
    targetFolder,
    targetFolderTree,
    isMoving,
    moveSuccess,
    setSourceFolder,
    setTargetFolder,
    setFiles,
    selectedFiles,
    setSelectedFiles,
  } = useFileMoverContext();

  const { loadFiles, moveFiles } = useFileMover(electronAPI);

  // 소스 폴더가 변경되면 파일 목록 로드
  useEffect(() => {
    if (sourceFolder) {
      loadFiles(sourceFolder);
    } else {
      setFiles([]);
      setSelectedFiles([]);
    }
  }, [sourceFolder]);

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* 소스 폴더 선택 영역 */}
        <div className="w-1/4 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col">
          <FolderSelectButton
            electronAPI={electronAPI}
            folder={sourceFolder}
            type="SOURCE"
          />
          <FolderSelector
            folders={sourceFolderTree}
            selectedFolder={sourceFolder}
            onFolderSelect={setSourceFolder}
            electronAPI={electronAPI}
          />
        </div>

        {/* 파일 목록 및 필터링 영역 */}
        <div className="flex-1 flex flex-col">
          <FileList electronAPI={electronAPI} />
        </div>

        {/* 대상 폴더 선택 영역 */}
        <div className="w-1/4 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col">
          <FolderSelectButton
            electronAPI={electronAPI}
            folder={targetFolder}
            type="TARGET"
          />
          <FolderSelector
            folders={targetFolderTree}
            selectedFolder={targetFolder}
            onFolderSelect={setTargetFolder}
            electronAPI={electronAPI}
          />
        </div>
      </div>

      {/* 하단 작업 영역 */}
      <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            {selectedFiles.length > 0 ? (
              <span>
                <strong>{selectedFiles.length}개</strong> 파일 선택됨
              </span>
            ) : (
              <span>파일을 선택하세요</span>
            )}
          </div>

          <div className="flex items-center gap-4">
            {moveSuccess && (
              <div className="text-green-600 animate-fade-out">
                파일 이동이 완료되었습니다!
              </div>
            )}

            <Button
              onClick={() => moveFiles(targetFolder)}
              disabled={
                !sourceFolder ||
                !targetFolder ||
                selectedFiles.length === 0 ||
                isMoving
              }
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isMoving ? (
                <>처리 중...</>
              ) : (
                <>
                  <ArrowRight className="mr-2 h-4 w-4" />
                  파일 이동
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
