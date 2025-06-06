import type { FileType, FolderType } from './types';

// 모크 폴더 데이터
export const mockFolders: FolderType[] = [
  {
    id: 1,
    name: '문서',
    path: '/문서',
    children: [
      { id: 11, name: '업무', path: '/문서/업무', children: [] },
      { id: 12, name: '개인', path: '/문서/개인', children: [] },
      {
        id: 13,
        name: '프로젝트',
        path: '/문서/프로젝트',
        children: [
          {
            id: 131,
            name: '웹개발',
            path: '/문서/프로젝트/웹개발',
            children: [],
          },
          {
            id: 132,
            name: '모바일앱',
            path: '/문서/프로젝트/모바일앱',
            children: [],
          },
        ],
      },
    ],
  },
  { id: 2, name: '다운로드', path: '/다운로드', children: [] },
  {
    id: 3,
    name: '사진',
    path: '/사진',
    children: [
      { id: 31, name: '가족', path: '/사진/가족', children: [] },
      { id: 32, name: '여행', path: '/사진/여행', children: [] },
      { id: 33, name: '업무', path: '/사진/업무', children: [] },
    ],
  },
  { id: 4, name: '음악', path: '/음악', children: [] },
  { id: 5, name: '비디오', path: '/비디오', children: [] },
  {
    id: 6,
    name: '개발',
    path: '/개발',
    children: [
      { id: 61, name: '프론트엔드', path: '/개발/프론트엔드', children: [] },
      { id: 62, name: '백엔드', path: '/개발/백엔드', children: [] },
    ],
  },
];

// 모크 파일 데이터
export const mockFiles: FileType[] = [
  {
    id: 1,
    name: '월간보고서.docx',
    type: 'document',
    size: '2.3 MB',
    modified: '2024-01-15',
    extension: 'docx',
    path: '/문서/월간보고서.docx',
  },
  {
    id: 2,
    name: '프레젠테이션.pptx',
    type: 'presentation',
    size: '5.7 MB',
    modified: '2024-01-10',
    extension: 'pptx',
    path: '/문서/프레젠테이션.pptx',
  },
  {
    id: 3,
    name: '예산계획.xlsx',
    type: 'spreadsheet',
    size: '1.2 MB',
    modified: '2024-01-12',
    extension: 'xlsx',
    path: '/문서/예산계획.xlsx',
  },
  {
    id: 4,
    name: '로고이미지.jpg',
    type: 'image',
    size: '3.5 MB',
    modified: '2024-01-14',
    extension: 'jpg',
    path: '/사진/로고이미지.jpg',
  },
  {
    id: 5,
    name: '배경음악.mp3',
    type: 'audio',
    size: '8.1 MB',
    modified: '2024-01-08',
    extension: 'mp3',
    path: '/음악/배경음악.mp3',
  },
  {
    id: 6,
    name: '홍보영상.mp4',
    type: 'video',
    size: '45.2 MB',
    modified: '2024-01-01',
    extension: 'mp4',
    path: '/비디오/홍보영상.mp4',
  },
  {
    id: 7,
    name: '사용자매뉴얼.pdf',
    type: 'document',
    size: '1.8 MB',
    modified: '2024-01-11',
    extension: 'pdf',
    path: '/문서/사용자매뉴얼.pdf',
  },
  {
    id: 8,
    name: 'main.js',
    type: 'code',
    size: '0.2 MB',
    modified: '2024-01-13',
    extension: 'js',
    path: '/개발/main.js',
  },
  {
    id: 9,
    name: 'config.json',
    type: 'data',
    size: '0.5 MB',
    modified: '2024-01-09',
    extension: 'json',
    path: '/개발/config.json',
  },
  {
    id: 10,
    name: 'settings.config',
    type: 'config',
    size: '0.1 MB',
    modified: '2024-01-07',
    extension: 'config',
    path: '/개발/settings.config',
  },
  {
    id: 11,
    name: '스크린샷.png',
    type: 'image',
    size: '2.1 MB',
    modified: '2024-01-16',
    extension: 'png',
    path: '/사진/스크린샷.png',
  },
  {
    id: 12,
    name: '데이터베이스.sql',
    type: 'data',
    size: '4.3 MB',
    modified: '2024-01-05',
    extension: 'sql',
    path: '/개발/데이터베이스.sql',
  },
  {
    id: 13,
    name: 'readme.md',
    type: 'document',
    size: '0.3 MB',
    modified: '2024-01-18',
    extension: 'md',
    path: '/개발/readme.md',
  },
  {
    id: 14,
    name: 'style.css',
    type: 'code',
    size: '0.8 MB',
    modified: '2024-01-17',
    extension: 'css',
    path: '/개발/style.css',
  },
  {
    id: 15,
    name: 'podcast.wav',
    type: 'audio',
    size: '12.5 MB',
    modified: '2024-01-03',
    extension: 'wav',
    path: '/음악/podcast.wav',
  },
];
