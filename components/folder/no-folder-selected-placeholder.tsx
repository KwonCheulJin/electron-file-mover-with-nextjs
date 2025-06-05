import { Folder } from 'lucide-react';

export default function NoFolderSelectedPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-500 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <Folder className="h-16 w-16 mb-4 text-gray-300" />
      <p className="text-xl font-medium mb-2">원본 폴더를 선택하세요</p>
      <p className="text-sm text-center">
        상단 버튼을 클릭하여 파일을 가져올 폴더를 선택해주세요
      </p>
    </div>
  );
}
