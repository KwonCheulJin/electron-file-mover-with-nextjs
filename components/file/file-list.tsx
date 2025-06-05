'use client';

import FileCard from '@/components/file/file-card';
import NoFilesPlaceholder from '@/components/file/no-files-placeholder';
import NoFolderSelectedPlaceholder from '@/components/folder/no-folder-selected-placeholder';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useFileMoverContext } from '@/context/file-mover-context';
import { useFileMover } from '@/hooks/use-file-mover';
import type { ElectronAPI } from '@/lib/types';
import { RefreshCw, Search, X } from 'lucide-react';
import { useState } from 'react';

interface FileListProps {
  electronAPI: ElectronAPI | null;
}

export default function FileList({ electronAPI }: FileListProps) {
  const { sourceFolder, files, selectedFiles, isLoadingFiles } =
    useFileMoverContext();

  const { toggleFileSelection, toggleSelectAll, refreshFiles } =
    useFileMover(electronAPI);
  const [searchQuery, setSearchQuery] = useState('');
  const [fileTypeFilter, setFileTypeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');

  // 파일 필터링
  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType =
      fileTypeFilter === 'all' ? true : file.type === fileTypeFilter;
    return matchesSearch && matchesType;
  });

  // 파일 정렬
  const sortedFiles = [...filteredFiles].sort((a, b) => {
    // 크기 문자열에서 숫자 부분만 추출하여 비교
    const sizeA = Number.parseFloat(a.size.split(' ')[0]);
    const sizeB = Number.parseFloat(b.size.split(' ')[0]);
    const sortSize = sizeB - sizeA;
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'size':
        return sortSize;
      case 'date':
        return new Date(b.modified).getTime() - new Date(a.modified).getTime();
      default:
        return 0;
    }
  });

  const fileTypes = Array.from(new Set(files.map(file => file.type)));

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {sourceFolder ? `파일 목록` : '소스 폴더를 선택하세요'}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {sourceFolder
                ? '이동할 파일을 선택하세요'
                : '좌측에서 소스 폴더를 선택하세요'}
            </p>
          </div>
          {sourceFolder && (
            <Button
              onClick={refreshFiles}
              variant="outline"
              size="sm"
              disabled={isLoadingFiles}
            >
              <RefreshCw
                className={`h-4 w-4 ${isLoadingFiles ? 'animate-spin' : ''}`}
              />
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="파일명으로 검색..."
              className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              disabled={isLoadingFiles}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <Select
            value={fileTypeFilter}
            onValueChange={value => setFileTypeFilter(value)}
            disabled={isLoadingFiles}
          >
            <SelectTrigger className="w-[150px] bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <SelectValue placeholder="파일 유형" />
            </SelectTrigger>
            <SelectContent className="bg-gray-50 dark:bg-gray-800">
              <SelectItem value="all">모든 유형</SelectItem>
              {fileTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={sortBy}
            onValueChange={value => setSortBy(value)}
            disabled={isLoadingFiles}
          >
            <SelectTrigger className="w-[150px] bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <SelectValue placeholder="정렬 기준" />
            </SelectTrigger>
            <SelectContent className="bg-gray-50 dark:bg-gray-800">
              <SelectItem value="name">이름순</SelectItem>
              <SelectItem value="size">크기순</SelectItem>
              <SelectItem value="date">날짜순</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-hidden bg-gray-50 dark:bg-gray-950">
        {sourceFolder ? (
          <>
            {isLoadingFiles ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-500">파일 목록을 불러오는 중...</p>
                </div>
              </div>
            ) : filteredFiles.length === 0 ? (
              <NoFilesPlaceholder />
            ) : (
              <>
                <div className="min-h-[48px] flex items-center justify-between mb-4 bg-white dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="selectAll"
                      checked={
                        selectedFiles.length > 0 &&
                        selectedFiles.length === filteredFiles.length
                      }
                      onCheckedChange={() => toggleSelectAll(filteredFiles)}
                    />
                    <label
                      htmlFor="selectAll"
                      className="text-sm font-medium cursor-pointer"
                    >
                      전체 선택
                    </label>
                    {selectedFiles.length > 0 && (
                      <>
                        <Separator orientation="vertical" className="h-4" />
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        >
                          {selectedFiles.length}개 선택됨
                        </Badge>
                      </>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    총 <strong>{filteredFiles.length}</strong>개 파일
                  </div>
                </div>

                <div className="overflow-y-auto max-h-[calc(100vh-360px)]">
                  <div className="grid grid-cols-1 gap-3">
                    {sortedFiles.map(file => (
                      <FileCard
                        key={file.id}
                        file={file}
                        isSelected={selectedFiles.includes(file.id)}
                        onSelect={() => toggleFileSelection(file.id)}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <NoFolderSelectedPlaceholder />
        )}
      </div>
    </div>
  );
}
