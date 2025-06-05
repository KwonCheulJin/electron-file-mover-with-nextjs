export type FileFormatType =
  | 'image'
  | 'video'
  | 'audio'
  | 'code'
  | 'data'
  | 'config'
  | 'spreadsheet'
  | 'presentation'
  | 'archive'
  | 'executable'
  | 'document';

export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };
export interface FileType {
  id: number;
  name: string;
  type: FileFormatType;
  size: string;
  modified: string;
  extension: string;
  path: string;
}

export interface FolderType {
  id: number;
  name: string;
  path: string;
  children: FolderType[];
}

export const folderCategory = {
  SOURCE: 'SOURCE',
  TARGET: 'TARGET',
} as const;

export interface ElectronFileInfo {
  name: string;
  path: string;
  isDirectory: boolean;
  size: number;
  modified: Date;
}

interface MoveFile {
  file: string;
  to: string;
}
export interface MoveResult {
  success: MoveFile[];
  fail: MoveFile[];
}

export interface ElectronAPI {
  selectFolder: () => Promise<Result<string | null>>;
  getFiles: (folderPath: string) => Promise<Result<ElectronFileInfo[]>>;
  getFolderTree: (folderPath: string) => Promise<Result<FolderType[]>>;
  moveFiles: (
    filePaths: string[],
    targetFolder: string
  ) => Promise<Result<MoveResult>>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export type ValueOf<T> = T[keyof T];

export type FolderCategory = ValueOf<typeof folderCategory>;
