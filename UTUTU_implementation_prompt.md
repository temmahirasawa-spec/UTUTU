# UTUTU コーポレートサイト 実装プロンプト（Claude Code / YOLO 用）

---

## 0. 最初に読むファイル（必ず最初に view すること）

**`UTUTU_tone_and_manner_v0.7.html`** を最初に view してください。
これがこのプロジェクトの **視覚・モーション・コピー・配色・タイポ・間隔・セクション構成のすべての正本** です。

このプロンプトと v0.7 HTML が矛盾した場合は **v0.7 HTML を優先** すること。

Phase 1 に入る前に：
1. v0.7 HTML をブラウザで開いて全セクションをスクロール、すべてのモーション（ヒーローのcaustic、UTUTUロゴのmorph、Worksのasymmetric rise、ブランドパネルのsticky stacking、Dark→Lightトランジション）を体感する
2. CSS変数（`:root`）、`<style>` 内の全クラス、`<script>` の全関数を把握する
3. 把握できたら Phase 1 に入る

---

## 1. プロジェクト概要

- **会社名**: UTUTU
- **位置づけ**: Brand × AI Creative Studio
- **創業メンバー**: 洋輔（事業/営業リード）× 天真（クリエイティブ/技術リード）
- **重要**: 資料・記載順は **常に 洋輔 → 天真** の順（洋輔さんを主に書く）
- **本体ブランド**: 装飾の美しさ × 機能の美しさを一つのブランドに織り込む
- **主な強み**: グラフィック出自の装飾美 + UI/UX出自の機能美 + AI制作フロー + 飲食/ライフスタイル領域の実績

---

## 2. 技術スタック（必須）

```
- Next.js 14 (App Router, TypeScript)
- Tailwind CSS
- Framer Motion (Hero含む大半のscroll/reveal演出に使用)
- GSAP + ScrollTrigger (sticky stacking, pin演出が必要な箇所のみ)
- Lenis (スムーススクロール)
- next/font (Bricolage Grotesque, Noto Sans JP, JetBrains Mono, Inter)
- Vercel deploy, region は **hnd1（東京）固定**
```

**vercel.json は最初に作成すること：**
```json
{
  "regions": ["hnd1"],
  "functions": {
    "app/**/*": { "maxDuration": 10 }
  }
}
```

**CMS は不要**。コンテンツは `lib/` 配下の TS データで持つ。将来Notion/Supabase化する想定だが v1 はファイルベースで完結。

---

## 3. プロジェクト構成（推奨）

```
ututu-site/
├─ app/
│  ├─ layout.tsx          # fonts, Lenis init, cursor, grid overlay, blur top
│  ├─ page.tsx            # トップ（全セクション統合）
│  ├─ work/
│  │  └─ [slug]/
│  │     └─ page.tsx      # ブランド詳細（×3 cases）
│  ├─ business/
│  │  └─ page.tsx         # 洋輔さんのビジネスケース詳細
│  └─ globals.css         # tokens + Tailwind base
│
├─ components/
│  ├─ Nav.tsx
│  ├─ GridOverlay.tsx
│  ├─ TopBlur.tsx
│  ├─ CustomCursor.tsx
│  ├─ MorphingMark.tsx    # 巨大UTUTU → ナビへmorphする単一要素
│  ├─ HeroCaustic.tsx     # WebGLシェーダー canvas
│  ├─ Hero.tsx
│  ├─ WorksStage.tsx      # asymmetric image rise
│  ├─ BrandPanels.tsx     # sticky stacking ×3
│  ├─ Achievement.tsx
│  ├─ ActTransition.tsx   # 黒→白の幕間
│  ├─ Services.tsx        # What We Do
│  ├─ WhyChooseUs.tsx     # bento
│  ├─ BigCTA.tsx
│  └─ Footer.tsx
│
├─ lib/
│  ├─ brands.ts           # 3つのブランド詳細データ
│  ├─ business-cases.ts   # 洋輔さんの戦略ケース
│  └─ images.ts           # 画像メタとマッピング（§6参照）
│
├─ public/
│  └─ images/
│     └─ brands/          # ユーザー指定フォルダ（§6参照）
│
├─ styles/
│  └─ tokens.css          # CSS変数
│
├─ vercel.json
├─ tailwind.config.ts
└─ next.config.js          # images.unoptimized=false, formats: ['avif','webp']
```

---

## 4. デザイントークン（v0.7 と完全一致させる）

```css
:root {
  --v: #E8482A;             /* vermilion accent — 1点のみ使用 */
  --v-glow: rgba(232,72,42,0.22);
  --bg: #0A0A0B;            /* dark act 背景 */
  --bg-2: #0E0E10;
  --fg: #F4F2ED;            /* dark幕のテキスト（温白） */
  --mid: rgba(244,242,237,0.62);
  --low: rgba(244,242,237,0.40);
  --line: rgba(244,242,237,0.10);
  --l-bg: #F4F2ED;          /* light act 背景 */
  --l-ink: #141416;
  --l-mid: #6B6B6B;
  --l-line: rgba(20,20,22,0.10);
}
```

### タイポグラフィ
- **ロゴマーク（UTUTU）**: `Bricolage Grotesque 700`, `letter-spacing: 0.34em`（em単位でscale時も比例維持）
- **見出し・本文（日本語含むメイン）**: `Helvetica Neue, Helvetica, Arial, Inter` を sans の主、`Noto Sans JP` を日本語に
- **mono ラベル/数値**: `JetBrains Mono`
- **使わないもの**: 日本語明朝 / Playfair / Fraunces / 装飾セリフ全般 — **全編サンセリフ**

### 言語の主従
- **英語が主、日本語は補足**として小さく添える。タイトル類はすべてこの構成。
- 例:
  ```html
  <h2 class="en">Make brands <span class="v">work.</span></h2>
  <p class="jp">機能を、デザインする。</p>
  ```

### 日本語の改行
- `word-break: keep-all` + `line-break: strict` を日本語コンテナに適用（CJKの不自然な改行防止）
- 必要に応じて手動 `<br>` で制御

---

## 5. ページ・セクション構成（v0.7 と同一）

### トップページ `/`（縦長・ダーク → ライト → ダークの構成）

| # | セクション | 幕 | 備考 |
|---|---|---|---|
| 1 | Hero（写真 + caustic + UTUTUマーク） | Dark | sticky scroll, 220vh |
| 2 | Works Stage（6画像の非対称rise） | Dark | sticky scroll, 240vh |
| 3 | Brand Panels（sticky stacking ×3） | Dark | 各 100vh |
| 4 | Achievement（KPI 4指標パネル） | Dark | static |
| 5 | Act Transition（黒→白の幕間） | → Light | sticky scroll, 220vh |
| 6 | Services / What We Do（{01}{02}{03}） | Light | static |
| 7 | Why Choose Us（bento ×4 cards） | Light | static |
| 8 | Big CTA | Light | "We transform brands..." |
| 9 | Footer | Dark | 4カラム + コピーライト |

### サブページ
- `/work/[slug]` — ブランド詳細（YORKYS BRUNCH / YORKYS Creperie / YORKYS Entertainment）。天真主導のビジュアル中心構成。
- `/business` — 洋輔さんの戦略・KPIケース詳細。戦略/数値/言葉中心の構成。

### v1 で **作らない** もの
- Journal / Blog（運用負担のため見送り）
- Testimonials（UTUTU名義の声がまだ無い）
- 詳細なお問い合わせフォーム（v1 は mailto: または別ツールリンクで十分）

---

## 6. 画像素材の扱い（重要 — ここを丁寧に）

### 6.1 ユーザー指定フォルダ
ユーザーが `public/images/brands/` （または別途指定するパス）に YORKYS各ブランドの写真を配置します。プロジェクト開始時に、ユーザーに **画像フォルダのパスを確認** してください。

### 6.2 画像の解析と割り当て手順

```
1. 指定フォルダ内の全画像ファイルを ls で列挙
2. 各画像を view コマンドで実際に確認（ファイル名だけで判断しない）
3. 写真の被写体・構図・色調から、以下のどのブランドかを判定:
   - YORKYS BRUNCH（カフェ・朝食・店舗ファサード・西宮）
   - YORKYS Creperie（クレープ・FCマーブル外観・スイーツ・商品ショット）
   - YORKYS Entertainment（レストラン全景・バー・親会社系の空間）
   - Piece of Bake（焼き菓子カウンター・ネオンサイン）
   - Mademiselle Croquette（コロッケ・横浜ランドマーク）
4. 各配置に「最適な1枚」を選んで lib/images.ts にマッピング
5. 配置に対して画像が不足する場合は、プレースホルダ画像を picsum.photos の seeded URL で代替し、コードに `// TODO: replace with [brand] real photo` コメントを残す
```

### 6.3 各配置に求める画像の特性

| 配置 | アスペクト | 求めるもの |
|---|---|---|
| Hero 背景 | 横長 / 16:9 | 空間性のある雰囲気写真（店内全景・引きの構図・抽象的でない） |
| Works Stage × 6 | 各種 | 各ブランドの代表ビジュアル1枚ずつ。縦長・正方・横長が混在してOK（非対称配置） |
| Brand Panel × 3 | 縦長または16:9 | 各ブランドを最も象徴する1枚（ファサード or 空間 or 商品ヒーロー） |
| Why Choose Us bento large card | 縦長 | 商品ショットなど「人の手・温度」を感じるもの |

### 6.4 next/image での扱い
- すべて `<Image>` コンポーネント使用
- `placeholder="blur"` + `blurDataURL` を設定
- ヒーローのみ `priority` を付ける
- `next.config.js` で `images.formats: ['image/avif', 'image/webp']`

### 6.5 lib/images.ts の構造例

```typescript
// 画像メタとマッピング
export const HERO_IMAGE = '/images/brands/yorkys-ent-interior.jpg';

export const WORKS_GALLERY: WorkImage[] = [
  { src: '/images/brands/mademiselle-yokohama.jpg', alt: 'Mademiselle Croquette × Yokohama Landmark Tower' },
  { src: '/images/brands/brunch-front.jpg',         alt: 'YORKYS BRUNCH facade entrance' },
  { src: '/images/brands/creperie-facade.png',      alt: 'YORKYS Creperie Nagoya marble facade' },
  { src: '/images/brands/pob-counter.jpg',          alt: 'Piece of Bake neon counter' },
  { src: '/images/brands/ent-interior.jpg',         alt: 'YORKYS Entertainment Roma interior' },
  { src: '/images/brands/creperie-products.jpg',    alt: 'YORKYS Creperie products in hand' },
];

export const BRAND_PANELS = [
  { slug: 'yorkys-brunch',       hero: '/images/brands/brunch-front.jpg', ... },
  { slug: 'yorkys-creperie',     hero: '/images/brands/creperie-facade.png', ... },
  { slug: 'yorkys-entertainment',hero: '/images/brands/ent-interior.jpg', ... },
];
```

---

## 7. 実装の重要ポイント（v0.7 から正確に移植する箇所）

### 7.1 単一の morphing UTUTU マーク
**v0.7 HTML の `.mark` 要素と `heroFrame()` 関数を 1:1 で移植** してください（ロジックは検証済み）。

- 単一の `<div>` で実装（クロスフェードではなく、scale + translateY で実移動）
- `position: fixed`, `bottom: -1.5vh`, `transform-origin: 50% 100%`（下端を軸に縮小）
- `font-size: 24vw`, `letter-spacing: 0.34em`（em単位なのでscale時も比率維持）
- スクロール進行 p（0→1）に対して easeInOut でscale `1 → 14/(24vw)` & translateY を計算
- ナビ中央に正確に着地

実装は Framer Motion の `useScroll` + `useTransform` で書き換えてOK。挙動が同等であること。

### 7.2 WebGL Caustic Shader
**v0.7 の `initCaustic()` 関数と fragment shader を 1:1 で移植**。これは ShaderToy 由来の検証済みアルゴリズムなので、書き換えない。

- 480×270 の低解像度 canvas で GPU レンダー
- `mix-blend-mode: screen`, `opacity: 0.62`, `filter: blur(1.4px)`
- `IntersectionObserver` で画面外時 pause
- `prefers-reduced-motion` 対応
- WebGL 未対応時は CSS グラデーション fallback

`'use client'` コンポーネントとして `HeroCaustic.tsx` に切り出し。

### 7.3 Brand Panels の sticky stacking
シンプルな CSS パターン：

```tsx
<section className="panels-stack">
  {brands.map(b => (
    <article key={b.slug} className="panel sticky top-0 h-screen">
      {/* ... */}
    </article>
  ))}
</section>
```

同じ親内で `position: sticky; top: 0; height: 100vh` を複数並べると、source order で z-stack され、次のパネルが上から覆う挙動になる（GSAP 不要）。v0.7 の `.panel` の box-shadow と `::before` のヘアラインは継承すること。

### 7.4 Works Stage の asymmetric rise
- 240vh の sticky container
- 6画像が固定の非対称座標（v0.7 の `.ws-img--1` 〜 `.ws-img--6` を踏襲）
- 各画像はスクロール進行 p に対して stagger 0.07 で `translateY(130vh → 0)` 
- Framer Motion の `useScroll({ target, offset })` + `useTransform` でも、GSAP ScrollTrigger でも可

### 7.5 Custom Cursor
- desktop（`hover: hover` AND `pointer: fine`）のみ表示
- `body { cursor: none }`、12px の vermilion dot を `position: fixed`
- マウス位置に lerp 0.22 で追従
- 対話可能要素 hover で 32px の枠だけサークルに変形

### 7.6 + Grid Overlay
SVG pattern で `+` を全画面に敷く（v0.7 のものをコピー）。`position: fixed; mix-blend-mode: difference` で背景の明暗関係なく見える。

### 7.7 Top Blur
`position: fixed; top:0; height: 110px; backdrop-filter: blur(14px)` + mask で下端フェード。ヒーロースクロール完了時に opacity 1 に上がる。

### 7.8 Dark→Light Transition（幕間）
- 220vh の sticky container
- スクロール scrub（GSAP ScrollTrigger 推奨、Framer の `useScroll` でも可）
- 白パネルが `translateY(100% → 0)` + `border-radius 52px → 0`
- 中央線（"From form, to function."）が opacity & translateY で抜ける
- 中盤 p≈0.5 で vermilion の細い水平線が一瞬走る

### 7.9 + grid と blur top の z-index
```
cursor:    9999
grid:      40
blur-top:  80
nav:       100
mark:      105
content:   1〜10
```

---

## 8. コンテンツ（v0.7 のコピーをベースに）

### Hero（英主・日従）
- メイン: `Design with meaning. / Not just things that look good.`
- 補足: `「良い」が量産される時代に、意味をデザインする。/ 装飾の美しさと、機能の美しさを、ひとつのブランドへ。`
- 右上: `Tokyo 2026—`
- 下部: `UTUTU`（巨大ロゴ）

### Works Stage
- 見出し: `The brands we built.`
- 補足: `私たちが育てた、ブランドたち。`

### Brand Panels（3つ）
- {01} YORKYS BRUNCH — "Good brunch, great day."
- {02} YORKYS Creperie — "Crazy for crepe?"
- {03} YORKYS Entertainment — "A house of brands."

### Achievement（4指標 — 数値はすべて仮）
- Brands Launched: 8+
- YoY Growth: 128%
- Stores Opened: 12+
- Reach: 36k

### What We Do（3サービス）
- {01} Branding — Brand Strategy / Identity / Visual System / Art Direction / Naming / Guidelines
- {02} Digital & Web — UX/UI / Website / LP / Motion / CMS / Analytics
- {03} AI Creative — Image Generation / Prompt Design / Workflow Integration / Asset Pipeline

### Why Choose Us（4カード）
- 01 Decorative × Functional — 装飾の美しさと、機能の美しさ
- 02 AI-augmented Craft — 速度 × 質
- 03 F&B Specialty — 飲食・ライフスタイルに強い（数値カード 8+）
- 04 Direct, Senior Team — 中間レイヤーなし

### Big CTA
- `We transform brands. Your story is next.`
- `あなたの次の章を、ともにつくりましょう。`
- ボタン: `Book a call →` / `Contact us →`

### Footer
- 4カラム: Where we are / Sitemap / Social+Contact / Stay in the loop
- 最下段: `© 2026 UTUTU — All rights reserved.` / `洋輔 × 天真 · 東京`

---

## 9. 品質基準

### パフォーマンス
- LCP < 2.5s（4G想定）
- 画像は全て AVIF/WebP 配信
- WebGL canvas は 480×270 固定（高解像度にしない）
- Lenis のスムーススクロールが scroll-driven motion を壊さないこと

### アクセシビリティ
- `prefers-reduced-motion: reduce` で全モーション無効化（カスタムカーソル含む）
- 全 interactive 要素に focus-visible リング
- カスタムカーソル使用時もキーボード操作で全機能到達可能
- 画像に意味のある alt（装飾画像は `alt=""` + `aria-hidden`）

### レスポンシブ
- ブレークポイント: 480 / 720 / 880 / 1280
- モバイルではカスタムカーソル無効、Works Stage の画像配置を変更（v0.7 の `@media (max-width: 720px)` を踏襲）
- ヒーロー巨大ロゴは mobile で 36vw

### ブラウザ
- Safari 16+ / Chrome / Firefox / Edge の最新2バージョン
- WebGL 非対応時 は CSS fallback で動作（既に v0.7 に実装あり）

---

## 10. 進め方（YOLO モードでの推奨フェーズ）

各フェーズ完了時に `npm run build` が通ること & `/` をブラウザで確認して問題なければ次へ。

### Phase 1: 基盤（30分目安）
- `pnpm create next-app` で TS + Tailwind + App Router
- `vercel.json` で hnd1 設定
- 依存追加: `framer-motion`, `gsap`, `@studio-freight/lenis`, `clsx`
- `app/layout.tsx` に fonts + Lenis + cursor + grid + top blur
- `app/page.tsx` に全セクションの空コンポーネント

### Phase 2: トークン & ベース（30分）
- `globals.css` に :root 変数を v0.7 から移植
- Tailwind config に変数連動の color/font tokens
- `Nav.tsx`, `GridOverlay.tsx`, `TopBlur.tsx`, `CustomCursor.tsx` 実装

### Phase 3: Hero（60分）
- `Hero.tsx` 構造
- `HeroCaustic.tsx`（WebGL）を v0.7 から移植
- `MorphingMark.tsx` で UTUTUロゴの morph 実装（Framer Motion `useScroll` 推奨）
- 画像は §6 の手順で選定して配置

### Phase 4: Works Stage（45分）
- 6画像の非対称配置（v0.7 の CSS を Tailwind 化）
- Framer Motion で stagger rise 実装

### Phase 5: Brand Panels（45分）
- sticky stacking パターン
- 各パネルの内容データを `lib/brands.ts` から
- 画像は §6 の手順で

### Phase 6: 後半セクション（90分）
- Achievement / Act Transition / Services / Why Choose Us / Big CTA / Footer
- 各セクションを v0.7 から移植

### Phase 7: サブページ（60分）
- `/work/[slug]` テンプレート（共通 case-study レイアウト）
- `/business` ページ（洋輔さんの戦略ケース）

### Phase 8: 仕上げ・デプロイ（30分）
- reduced motion チェック、a11y、focus styles
- `npm run build` の警告ゼロ
- Vercel デプロイ、hnd1 確認

---

## 11. やってはいけないこと

- **書体を変えない**：Bricolage Grotesque / Helvetica系 / Noto Sans JP / JetBrains Mono の4つだけ。Playfair・Fraunces・日本語明朝・Inter以外の sans を勝手に足さない。
- **色を増やさない**：vermilion `#E8482A` 一点アクセント。グラデーション・カラフルなUIは禁止。
- **モーションを足さない**：v0.7 にないモーション（パララックス、回転、変なホバー）を勝手に追加しない。v0.7 が定義する文法を守る。
- **画像を勝手に Unsplash 等で代用しない**：ユーザー指定フォルダの画像を分析して使う。本当に不足する場合のみ picsum で代替し、TODO コメントを残す。
- **同期 `await action() → router.refresh()` パターンを使わない**：v1 はサーバーアクション不要（静的サイト中心）だが、もし Contact フォーム等で使う場合は optimistic update パターンで。
- **CMS を勝手に導入しない**：v1 はファイルベース。

---

## 12. 完了の定義

以下が満たされたら v1 完了：

- [ ] `/` を開いて v0.7 と視覚的に同等のヒーロー（caustic, morph, type, grid, blur）
- [ ] スクロールで Works Stage の6画像が下から非対称に rise
- [ ] Brand Panels が sticky stacking で3つ重なる
- [ ] Dark→Light トランジションが滑らかに切り替わる
- [ ] Why Choose Us bento が4カードで表示
- [ ] Footer がダーク基調で完成
- [ ] `/work/yorkys-brunch` 等の3つの詳細ページが開ける
- [ ] `/business` が開ける
- [ ] Lighthouse Performance ≥ 85, Accessibility ≥ 95
- [ ] モバイル（375px）で全セクションが破綻なく見られる
- [ ] `prefers-reduced-motion` で全モーション静止
- [ ] Vercel に hnd1 でデプロイ済み

---

## 13. 最後に

v0.7 HTML は天真さんが何度も詰めた完成形に近いトーン&マナーです。**自己判断で改善しようとせず、忠実に再現すること** を最優先で。改善提案がある場合は実装前に天真さんに確認してください。

質問があれば手を止めて聞く。仕様が不明確なまま走らない。

実装完了したら、ローカルプレビューのURL（`localhost:3000`）と、Vercel デプロイのURLを共有してください。
