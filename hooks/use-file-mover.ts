import { useFileMoverContext } from '@/context/file-mover-context';
import {
  formatFileSize,
  getFileExtension,
  getFileType,
} from '@/lib/file-utils';
import { handleError } from '@/lib/handleError';
import type { ElectronAPI, FileType } from '@/lib/types';

export function useFileMover(electronAPI: ElectronAPI | null) {
  const {
    sourceFolder,
    setFiles,
    setSelectedFiles,
    setIsLoadingFiles,
    setIsMoving,
    setMoveSuccess,
    selectedFiles,
    files,
  } = useFileMoverContext();

  const loadFiles = async (folderPath: string) => {
    if (!electronAPI) return;

    setIsLoadingFiles(true);

    try {
      const result = await electronAPI.getFiles(folderPath);
      if (result.success) {
        const formattedFiles = result.data.map((file, index) => ({
          id: index + 1,
          name: file.name,
          type: getFileType(file.name),
          size: formatFileSize(file.size),
          modified: new Date(file.modified).toLocaleDateString(),
          extension: getFileExtension(file.name),
          path: file.path,
        }));
        setFiles(formattedFiles);
        setSelectedFiles([]);
      }
    } catch (err) {
      handleError(err, '파일 목록을 불러오는 중 오류');
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const moveFiles = async (targetFolder: string | null) => {
    if (
      !electronAPI ||
      !sourceFolder ||
      !targetFolder ||
      selectedFiles.length === 0
    )
      return;

    setIsMoving(true);

    try {
      const selectedPaths = files
        .filter(file => selectedFiles.includes(file.id))
        .map(file => file.path);

      const results = await electronAPI.moveFiles(selectedPaths, targetFolder);

      if (results.success) {
        const failed = results.data.fail;
        if (failed.length > 0) {
          handleError(
            new Error(`${failed.length}개 파일 이동에 실패했습니다.`),
            '파일 이동 실패'
          );
        }
        setMoveSuccess(true);
        await loadFiles(sourceFolder);
      }
      setTimeout(() => {
        setSelectedFiles([]);
        setMoveSuccess(null);
      }, 3000);
    } catch (err) {
      handleError(err, '파일 이동 중 오류');
    } finally {
      setIsMoving(false);
    }
  };

  const toggleFileSelection = (fileId: number) => {
    setSelectedFiles(prev =>
      prev.includes(fileId)
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const toggleSelectAll = (filesToSelect: FileType[]) => {
    if (selectedFiles.length === filesToSelect.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filesToSelect.map(file => file.id));
    }
  };

  const refreshFiles = () => {
    if (sourceFolder) {
      loadFiles(sourceFolder);
    }
  };

  return {
    loadFiles,
    moveFiles,
    toggleFileSelection,
    toggleSelectAll,
    refreshFiles,
  };
}
