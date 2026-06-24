import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Inter, JetBrains_Mono, Noto_Sans_JP } from 'next/font/google';
import './globals.css';

import LenisProvider from '@/components/LenisProvider';
import CustomCursor from '@/components/CustomCursor';
import GridOverlay from '@/components/GridOverlay';
import RevealObserver from '@/components/RevealObserver';

// ロゴマーク（UTUTU）— Bricolage Grotesque（variable, 700 を CSS 側で指定）
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
});
// 本文 sans のフォールバック（主は Helvetica Neue / system）
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
// mono ラベル/数値
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
});
// 日本語
const notoJp = Noto_Sans_JP({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-jp',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ututu.studio'),
  title: 'UTUTU — Brand × AI Creative Studio',
  description:
    'Design with meaning. 装飾の美しさと、機能の美しさを、ひとつのブランドへ。東京のブランド × AI クリエイティブスタジオ UTUTU。',
  openGraph: {
    title: 'UTUTU — Brand × AI Creative Studio',
    description: '装飾の美しさと、機能の美しさを、ひとつのブランドへ。',
    locale: 'ja_JP',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0B',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontVars = `${bricolage.variable} ${inter.variable} ${jetbrains.variable} ${notoJp.variable}`;
  return (
    <html lang="en">
      <body className={fontVars}>
        {/* fixed chrome */}
        <GridOverlay />
        <div className="blur-top" id="blurTop" aria-hidden="true" />
        <CustomCursor />

        {/* behaviour */}
        <LenisProvider />
        <RevealObserver />

        {children}
      </body>
    </html>
  );
}
