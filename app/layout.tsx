import { Toaster } from '@/components/ui/toaster';
import { FileMoverProvider } from '@/context/file-mover-context';
import { ThemeProvider } from '@/context/theme-provider';
import type { Metadata } from 'next';
import type React from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Electron 파일 이동 UI',
  description: 'Electron과 Next.js로 구현한 파일 이동 UI',
  generator: 'v0.dev',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Electron 환경에서 CSP 설정 */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
        />
      </head>
      <body className={`electron-fallback`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FileMoverProvider>{children}</FileMoverProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
