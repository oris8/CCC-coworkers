import Header from '@/components/header/Header';
import ServerErrorBoundary from '@/components/server-error-boundary';
import ThemeProvider from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';

const pretendardFont = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  preload: true,
  display: 'swap',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: '코워커스 - Coworkers',
  description: '함께 만들어가는 투두 리스트 🛠️',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_BASE_URL || ''),
  // 웹사이트의 대표 이미지
  icons: {
    icon: '/icons/logo_coworkers.svg',
  },
  openGraph: {
    title: {
      template: '%s - Coworkers',
      default: '코워커스 - Coworkers',
    },
    description: '함께 만들어가는 투두 리스트 🛠️',
    url: process.env.NEXT_PUBLIC_APP_BASE_URL,
    siteName: 'Coworkers',
    locale: 'ko-KR',
    type: 'website',
    images: [
      {
        url: '/icons/logo_coworkers.svg',
        alt: '코워커스 로고',
      },
    ],
  },
};

/* eslint-disable react/jsx-no-useless-fragment */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // NOTE - suppressHydrationWarning 추가하여 Extra attributes 오류 해결
    // https://github.com/vercel/next.js/discussions/22388
    <html lang="ko-KR" suppressHydrationWarning>
      <body className={pretendardFont.className}>
        <ThemeProvider
          attribute="class"
          // NOTE - 기본적으로 다크모드로 설정하였습니다.
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <ServerErrorBoundary>
            {children}
            <Toaster />
          </ServerErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
