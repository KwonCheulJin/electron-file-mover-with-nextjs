'use client';

import { Button } from '@/components/ui/button';
import { useFileMoverContext } from '@/context/file-mover-context';
import { ElectronAPI, FolderCategory } from '@/lib/types';
import { FolderOpen } from 'lucide-react';

interface Props {
  electronAPI: ElectronAPI | null;
  type: FolderCategory;
  folder: string | null;
}

export const category: Record<FolderCategory, string> = {
  SOURCE: '원본',
  TARGET: '대상',
};

export default function FolderSelectButton({
  electronAPI,
  type,
  folder,
}: Props) {
  const { handleSelectFolder } = useFileMoverContext();

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-800">
      <h2 className="font-semibold mb-2">{category[type]} 폴더</h2>
      <Button
        onClick={() => handleSelectFolder(type, electronAPI)}
        className="w-full mb-2 hover:bg-slate-800"
        variant="outline"
      >
        <FolderOpen className="mr-2 h-4 w-4" />
        폴더 선택
      </Button>
      {folder && (
        <div className="text-xs text-gray-600 dark:text-gray-400 break-all">
          {folder}
        </div>
      )}
    </div>
  );
}
