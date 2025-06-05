'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { getFileIcon, getTypeColor } from '@/lib/file-utils';
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
        <div className="flex items-start gap-3">
          <Checkbox
            checked={isSelected}
            className="mt-1"
            onCheckedChange={onSelect}
            onClick={e => e.stopPropagation()}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {getFileIcon(file.type)}
              <span
                className="font-medium text-sm text-gray-900 dark:text-white truncate"
                title={file.name}
              >
                {file.name}
              </span>
            </div>
            <div className="space-y-2">
              <Badge
                variant="default"
                className={`text-xs ${getTypeColor(file.type)}`}
              >
                {file.type}
              </Badge>
              <div className="text-xs text-gray-500 space-y-1">
                <div className="flex justify-between">
                  <span>크기:</span>
                  <span className="font-medium">{file.size}</span>
                </div>
                <div className="flex justify-between">
                  <span>수정일:</span>
                  <span className="font-medium">{file.modified}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
