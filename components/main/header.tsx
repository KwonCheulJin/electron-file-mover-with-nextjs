'use client';

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800 px-6 py-4 bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center justify-center gap-2 text-center text-2xl font-bold tracking-wide">
        <span>📦</span>
        <span
          className="
            bg-gradient-to-r
            from-red-500 via-sky-400 to-orange-400
            bg-[length:400%_400%]
            animate-rainbow
            text-transparent
            bg-clip-text
            drop-shadow-md
          "
        >
          파일 이동 마스터
        </span>
        <span>🚀</span>
      </div>
    </header>
  );
}
