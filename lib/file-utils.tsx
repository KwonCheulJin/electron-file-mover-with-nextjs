import { FileFormatType } from '@/lib/types';
import {
  Archive,
  Code,
  Database,
  FileImage,
  FileSpreadsheet,
  FileText,
  ImageIcon,
  Music,
  Settings,
  Video,
  Zap,
} from 'lucide-react';
import { ReactElement } from 'react';

// 파일 타입별 색상 매핑
export const colors: Record<FileFormatType, string> = {
  document: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  presentation:
    'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  spreadsheet:
    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  image:
    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  audio: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
  video: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  code: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
  data: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  config: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
  archive: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300',
  executable: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
};
// 파일 아이콘 매핑
const fileIconMap: Record<FileFormatType, ReactElement> = {
  image: <ImageIcon className="h-5 w-5 text-blue-500" />,
  audio: <Music className="h-5 w-5 text-green-500" />,
  video: <Video className="h-5 w-5 text-red-500" />,
  code: <Code className="h-5 w-5 text-purple-500" />,
  data: <Database className="h-5 w-5 text-orange-500" />,
  config: <Settings className="h-5 w-5 text-gray-500" />,
  spreadsheet: <FileSpreadsheet className="h-5 w-5 text-green-600" />,
  presentation: <FileImage className="h-5 w-5 text-orange-600" />,
  document: <FileText className="h-5 w-5 text-blue-600" />,
  archive: <Archive className="h-5 w-5 text-teal-600" />,
  executable: <Zap className="h-5 w-5 text-cyan-600" />,
};

export const getFileIcon = (type: FileFormatType) => {
  return fileIconMap[type];
};

export const getTypeColor = (type: FileFormatType) => {
  return colors[type];
};

const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];
const videoExts = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv'];
const audioExts = ['mp3', 'wav', 'flac', 'aac', 'ogg', 'wma'];
const codeExts = [
  'js',
  'ts',
  'jsx',
  'tsx',
  'html',
  'css',
  'scss',
  'py',
  'java',
  'cpp',
  'c',
  'php',
];
const dataExts = ['json', 'xml', 'csv', 'sql', 'db'];
const configExts = ['config', 'ini', 'conf', 'env'];
const docExts = ['doc', 'docx', 'pdf', 'txt', 'md', 'rtf'];
const spreadsheetExts = ['xls', 'xlsx', 'csv'];
const presentationExts = ['ppt', 'pptx'];
const archiveExts = ['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz'];
const executableExts = [
  'exe',
  'msi',
  'dmg',
  'apk',
  'appimage',
  'deb',
  'rpm',
  'pkg',
];
// 유틸리티 함수들

export function getFileType(fileName: string): FileFormatType {
  const ext = getFileExtension(fileName).toLowerCase();

  if (imageExts.includes(ext)) return 'image';
  if (videoExts.includes(ext)) return 'video';
  if (audioExts.includes(ext)) return 'audio';
  if (codeExts.includes(ext)) return 'code';
  if (dataExts.includes(ext)) return 'data';
  if (configExts.includes(ext)) return 'config';
  if (spreadsheetExts.includes(ext)) return 'spreadsheet';
  if (presentationExts.includes(ext)) return 'presentation';
  if (archiveExts.includes(ext)) return 'archive';
  if (executableExts.includes(ext)) return 'executable';
  if (docExts.includes(ext)) return 'document';

  return 'document';
}

export function getFileExtension(fileName: string): string {
  return fileName.split('.').pop() || '';
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${
    sizes[i]
  }`;
}
