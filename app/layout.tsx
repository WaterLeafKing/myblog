import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'NerdInSight', // 기본 타이틀
    template: '%s | NerdInSight', // 다른 페이지의 타이틀 템플릿
  },
  description: 'Blog for Journey of Nerd',
  openGraph: {
    title: 'NerdInSight',
    description: 'Blog for Journey of Nerd',
    url: 'https://nerdinsight.vercel.app',
    siteName: 'NerdInSight',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head />
      <body>{children}</body>
    </html>
  );
}
