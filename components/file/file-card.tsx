'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { getFileIcon } from '@/lib/file-utils';
import type { FileType } from '@/lib/types';

interface FileCardProps {
  file: FileType;
  isSelected: boolean;
  onSelect: () => void;
}

export default function FileCard({
  file,
  isSelected,
  onSelect,
}: FileCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected
          ? 'border border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800'
          : 'border hover:border-gray-300 dark:hover:border-gray-600'
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-2">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={isSelected}
            onCheckedChange={onSelect}
            onClick={e => e.stopPropagation()}
          />
          <div className="xl:max-w-2xl overflow-x-auto whitespace-nowrap">
            <div className="flex items-center gap-2">
              <div>{getFileIcon(file.type)}</div>
              <span
                className="font-medium text-sm text-gray-900 dark:text-white"
                title={file.name}
              >
                {file.name}
              </span>
              <span className="flex justify-between gap-2 text-sm dark:text-gray-600">
                수정일:{' '}
                {new Date(file.modified).toLocaleString('ko', {
                  dateStyle: 'short',
                })}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
