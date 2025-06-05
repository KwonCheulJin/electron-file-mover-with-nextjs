'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { ElectronAPI, FolderType } from '@/lib/types';
import { ChevronDown, ChevronRight, Folder, FolderOpen } from 'lucide-react';
import { useState } from 'react';

interface FolderSelectorProps {
  folders: FolderType[];
  selectedFolder: string | null;
  onFolderSelect: (path: string) => void;
  electronAPI: ElectronAPI | null;
}

export default function FolderSelector({
  folders,
  selectedFolder,
  onFolderSelect,
}: FolderSelectorProps) {
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);

  const toggleFolder = async (folderPath: string) => {
    if (expandedFolders.includes(folderPath)) {
      setExpandedFolders(expandedFolders.filter(path => path !== folderPath));
    } else {
      setExpandedFolders([...expandedFolders, folderPath]);
    }
  };

  const renderFolderTree = (folders: FolderType[], level = 0) => {
    return folders.map(folder => (
      <div key={folder.path} className="mb-1">
        <div
          className={`flex items-center py-2 pr-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
            selectedFolder === folder.path
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
              : ''
          }`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => onFolderSelect(folder.path)}
        >
          {folder.children && folder.children.length > 0 ? (
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 p-0 mr-2 hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={e => {
                e.stopPropagation();
                toggleFolder(folder.path);
              }}
            >
              {expandedFolders.includes(folder.path) ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          ) : (
            <div className="w-7"></div>
          )}
          {selectedFolder === folder.path ? (
            <FolderOpen className="h-4 w-4 mr-2 text-green-500" />
          ) : (
            <Folder className="h-4 w-4 mr-2 text-gray-500" />
          )}
          <span
            className={`text-sm font-medium whitespace-nowrap overflow-x-auto inline-block ${
              selectedFolder === folder.path
                ? 'text-green-700 dark:text-green-300'
                : ''
            }`}
            style={{ maxWidth: 'max-content' }}
          >
            {folder.name}
          </span>
        </div>

        {folder.children &&
          expandedFolders.includes(folder.path) &&
          renderFolderTree(folder.children, level + 1)}
      </div>
    ));
  };

  return (
    <ScrollArea className="flex-1 p-2 overflow-auto">
      {renderFolderTree(folders)}
    </ScrollArea>
  );
}
