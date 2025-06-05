'use client';
import { category } from '@/components/folder/folder-select-button';
import { handleError } from '@/lib/handleError';
import type {
  ElectronAPI,
  FileType,
  FolderCategory,
  FolderType,
} from '@/lib/types';
import { createContext, useContext, useMemo, useState } from 'react';

interface FileMoverContextType {
  sourceFolder: string | null;
  setSourceFolder: React.Dispatch<React.SetStateAction<string | null>>;
  targetFolder: string | null;
  setTargetFolder: React.Dispatch<React.SetStateAction<string | null>>;
  sourceFolderTree: FolderType[];
  setSourceFolderTree: React.Dispatch<React.SetStateAction<FolderType[]>>;
  targetFolderTree: FolderType[];
  setTargetFolderTree: React.Dispatch<React.SetStateAction<FolderType[]>>;
  files: FileType[];
  setFiles: React.Dispatch<React.SetStateAction<FileType[]>>;
  selectedFiles: number[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<number[]>>;
  isMoving: boolean;
  setIsMoving: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingFiles: boolean;
  setIsLoadingFiles: React.Dispatch<React.SetStateAction<boolean>>;
  moveSuccess: boolean | null;
  setMoveSuccess: React.Dispatch<React.SetStateAction<boolean | null>>;
  handleSelectFolder: (
    type: FolderCategory,
    electronAPI: ElectronAPI | null
  ) => Promise<void>;
}

const FileMoverContext = createContext<FileMoverContextType | undefined>(
  undefined
);

export function FileMoverProvider({ children }: { children: React.ReactNode }) {
  const [sourceFolder, setSourceFolder] = useState<string | null>(null);
  const [targetFolder, setTargetFolder] = useState<string | null>(null);
  const [files, setFiles] = useState<FileType[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const [isMoving, setIsMoving] = useState(false);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [moveSuccess, setMoveSuccess] = useState<boolean | null>(null);
  const [sourceFolderTree, setSourceFolderTree] = useState<FolderType[]>([]);
  const [targetFolderTree, setTargetFolderTree] = useState<FolderType[]>([]);

  const handleSelectFolder = async (
    type: FolderCategory,
    electronAPI: ElectronAPI | null
  ) => {
    if (!electronAPI) return;
    try {
      const result = await electronAPI.selectFolder();
      if (result.success && result.data) {
        const path = result.data;
        const tree = await electronAPI.getFolderTree(path);
        if (tree.success) {
          if (type === 'SOURCE') {
            setSourceFolder(path);
            setSourceFolderTree(tree.data);
          } else {
            setTargetFolder(path);
            setTargetFolderTree(tree.data);
          }
        }
      }
    } catch (err) {
      handleError(err, `${category[type]} 선택 오류`);
    }
  };

  const value = useMemo(
    () => ({
      sourceFolder,
      setSourceFolder,
      targetFolder,
      setTargetFolder,
      files,
      setFiles,
      selectedFiles,
      setSelectedFiles,
      isMoving,
      setIsMoving,
      isLoadingFiles,
      setIsLoadingFiles,
      moveSuccess,
      setMoveSuccess,
      sourceFolderTree,
      setSourceFolderTree,
      targetFolderTree,
      setTargetFolderTree,
      handleSelectFolder,
    }),
    [
      sourceFolder,
      targetFolder,
      files,
      selectedFiles,
      isMoving,
      isLoadingFiles,
      moveSuccess,
      sourceFolderTree,
      targetFolderTree,
    ]
  );

  return (
    <FileMoverContext.Provider value={value}>
      {children}
    </FileMoverContext.Provider>
  );
}

export function useFileMoverContext() {
  const context = useContext(FileMoverContext);
  if (!context)
    throw new Error(
      'useFileMoverContext must be used within FileMoverProvider'
    );
  return context;
}
