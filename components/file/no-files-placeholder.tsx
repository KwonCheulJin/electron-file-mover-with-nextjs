import { Search } from "lucide-react"

export default function NoFilesPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-gray-500 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <Search className="h-12 w-12 mb-4 text-gray-300" />
      <p className="text-lg font-medium mb-2">검색 결과가 없습니다</p>
      <p className="text-sm">다른 검색어나 필터를 시도해보세요</p>
    </div>
  )
}
