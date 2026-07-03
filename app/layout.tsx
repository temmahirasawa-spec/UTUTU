import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, JetBrains_Mono, Noto_Sans_JP, Zen_Kaku_Gothic_New } from 'next/font/google';
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
// 大見出し/ページタイトル（--sans）— Zen Kaku Gothic New（Bold=700。CSS の weight:800 指定は 700 にフォールバック）
const zenKaku = Zen_Kaku_Gothic_New({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-zen-kaku',
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
  const fontVars = `${bricolage.variable} ${zenKaku.variable} ${jetbrains.variable} ${notoJp.variable}`;
  // フォント変数は :root（=html）に付与する。:root で宣言した --sans 等が
  // var(--font-*) を解決できるようにするため（body に付けると親の :root から見えず無効化される）。
  return (
    <html lang="en" className={fontVars}>
      <body>
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
