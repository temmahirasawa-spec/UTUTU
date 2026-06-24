# UTUTU ポートフォリオ（実績）ページ 実装プロンプト（Claude Code 用）

このプロンプトは、既に出来上がっている UTUTU コーポレートサイト（Next.js 14 / App Router / TS / Tailwind / Framer Motion / GSAP+ScrollTrigger / Lenis / Vercel hnd1）に、**実績一覧ページと実績詳細ページ**を追加するためのものです。

**最重要の前提：既存サイトのトーン&マナー（v0.7 HTML が正本）を1ミリも崩さないこと。** 配色・タイポ・モーションの文法・余白の作法はすべて既存に従う。新しい書体や色、既存にないモーション語彙を勝手に足さない。迷ったら既存コンポーネントの実装を読んで合わせる。

---

## 0. ゴールと全体動線

```
トップページ
  └─ "View More Projects" ボタン（※トップに新設）
        └─→ /projects（実績一覧ページ）
              └─→ /projects/[slug]（実績詳細ページ・最終的に約10件）
```

- **一覧ページ `/projects`**：今トップページの途中にある「3つ連続で実績が出てくる sticky stacking の見せ方」と **完全に同じUI・同じ動き**で、1枚ずつスクロールして実績を探す。各カードにタイトル＋短いキャプション、クリックで詳細へ遷移。現状3件、最終的に10件程度。
- **詳細ページ `/projects/[slug]`**：参考サイト（Spector）の詳細ページ構造を**まるっと踏襲**。下までスクロールさせる仕掛けを盛り込む。最終的に約10ページぶんのデータが入る想定。

参考サイト（構造の元ネタ。デザインを真似るのではなく**構造・スクロール演出の型**を借りる）：
- 一覧：https://spector.framer.website/projects
- 詳細：https://spector.framer.website/projects/thermal-dynamics

> 注意：参考サイトは Framer 製テンプレート。**見た目・配色・書体は一切コピーしない。** 借りるのは「セクションの並び」と「スクロールに連動した演出の型」だけ。最終的な質感は UTUTU 既存（ダーク基調 / vermilion #E8482A 一点 / Helvetica系＋Noto Sans JP＋JetBrains Mono / 余白広め / 引き算）に**翻訳**すること。

---

## 1. データ構造（CMSは入れない・ファイルベース）

10件をスケールさせるので、詳細ページは**1つの動的ルート `/projects/[slug]` + データ駆動**で作る。ページを10個手書きしない。

`lib/projects.ts`（型 + データ）を作る。型はおおよそ以下：

```typescript
export type ProjectBlock =
  | { type: 'fullImage'; src: string; alt: string; caption?: string }
  | { type: 'splitImageText'; src: string; alt: string; side: 'left' | 'right';
      heading?: string; body: string }
  | { type: 'textBlock'; kicker?: string; heading?: string; lead?: string; body?: string[] }
  | { type: 'imagePair'; left: { src: string; alt: string }; right: { src: string; alt: string } }
  | { type: 'quote'; text: string };  // 大きめの引用・締めの一文

export type Project = {
  slug: string;                 // 'yorkys-brunch'
  title: string;                // 'YORKYS BRUNCH'
  client: string;               // 'YORKYS Entertainment'
  caption: string;              // 一覧カード用の短い説明（1行）
  hero: { src: string; alt: string };
  // 概要セクション
  overview: {
    intro: string;              // リード文
    date: string;               // 'Mar 2024' など
    industry: string;           // 'F&B / Cafe'
    role: string[];             // ['Brand Strategy', 'Art Direction', ...]
    deliverables: string[];     // ['Logo', 'Web', 'Mobile Order', ...]
    timeframe: string;          // '6 weeks'
    liveUrl?: string;           // 公開URL（あれば "VIEW PROJECT" を出す）
  };
  // ストーリー（自由ブロックの配列。順番＝表示順）
  story: ProjectBlock[];
  order: number;                // 一覧の並び順
};

export const projects: Project[] = [ /* ... 現状3件、増やせる構造 ... */ ];

export const getProject = (slug: string) => projects.find(p => p.slug === slug);
export const getAllSlugs = () => projects.map(p => p.slug);
export const getAdjacent = (slug: string) => { /* prev / next を返す */ };
```

`generateStaticParams` で全 slug を静的生成。画像は §6（既存サイトの画像運用ルール）に従い、ユーザー指定フォルダの画像を解析して割り当て、不足は picsum + `// TODO` コメント。

---

## 2. 実績一覧ページ `/projects`

**既存トップの「3連続で実績が出てくる sticky stacking」を、そのまま一覧ページとして独立させる。**

- 既存トップにあるブランドパネル（`BrandPanels.tsx` 相当、`position: sticky; top:0; height:100vh` を縦に積んで次のパネルが上に重なる挙動）の**コンポーネントを再利用**する。実装を二重化しない。共通化できるなら共通コンポーネントに切り出して、トップと `/projects` の両方から使う。
- データは `lib/projects.ts` を参照して**件数可変**にする（3→10件でもそのまま動く）。
- 各パネル（カード）に表示するもの：
  - 連番（{01}{02}… 既存の `.panel__no` の作法）
  - プロジェクトタイトル（既存 `.panel__title` の作法）
  - 短いキャプション1行（`caption`）
  - メタ（業種・主な担当など、既存 `.panel__meta` の作法）
  - "View Case →" CTA（既存 `.panel__cta`）
- **パネル全体クリックで `/projects/[slug]` に遷移**（`next/link`）。カーソルは既存のカスタムカーソルがホバーで反応すること。
- ページ最上部に小さなページヘッダ（eyebrow "Selected Work" + 件数 + 1行リード）を既存の `.eyebrow` / `.sublabel` の作法で置く。スクロールするとパネル群に入る。
- モバイル挙動は既存トップのブランドパネルの `@media` を踏襲。

### トップページへの導線追加
- トップの実績セクション（現状3連続パネル）の**直後**に、`View More Projects →` ボタンを新設し `/projects` へリンク。既存の CTA ボタン（`.cta-btn` 等）の作法に合わせる。新しいボタンスタイルを発明しない。

---

## 3. 実績詳細ページ `/projects/[slug]`

参考サイトの詳細ページの**セクション構成を踏襲**しつつ、UTUTU のトーンに翻訳する。下までスクロールさせる「飽きさせない仕掛け」を各セクションに仕込む。セクション順は以下。

### 3-1. ヒーローセクション
- **(a) キービジュアルを大きく**：`project.hero` をフルブリード（`100vw` 近く、高さ `90–100vh`）でダーク基調に馴染ませて表示。既存ヒーローと同じ画像処理（`brightness` を落とす + vermilion グローのオーバーレイ）で世界観を統一。
- **(b) スクロールで文字が消えるアニメーション**：タイトル（大きな英字 = プロジェクト名）と1行 description をヒーロー中央〜下に重ね、**スクロールに応じて opacity を下げ、わずかに上へ translate して抜けていく**（Framer Motion `useScroll` + `useTransform`、既存ヒーローの `heroContent` のフェード挙動と同じ作法）。背景KVは残したまま文字だけ消える。
- スクロールダウンの微小なインジケータ（既存にあれば踏襲、なければ控えめに）。
- タイトルは英語主・日本語は小さく補足（既存の主従ルール）。

### 3-2. 概要セクション（Overview）
参考サイトの「intro文 + 日付 + Industry / ROLE / Deliverables / TIMEFRAME + VIEW PROJECT」のメタ構造を踏襲。
- **(a) 概要欄**：以下を既存のミニマルなメタ表現（mono ラベル + 値、`.svc` のような区切り罫線の作法）で組む：
  - リード文（`overview.intro`）— 少し大きめの抑えたサイズ
  - `Date` / `Industry` / `Role`（複数行）/ `Deliverables`（複数行）/ `Timeframe`
  - `liveUrl` があれば `VIEW PROJECT →`（既存リンク作法、下線 or ボーダー）
- **(b) 画像の上に文字が重なり、スクロールで動く**：概要ブロックを、背景に大きめの画像（`hero` とは別カット or ブランドロゴ）を敷いた上に重ね、スクロールで**テキストが少し遅れて入る/視差気味に動く**（重め演出は GSAP ScrollTrigger、軽いものは Framer Motion）。テキストの可読性は最優先（暗いオーバーレイを必ず噛ます）。

### 3-3. ストーリーセクション（メイン・ここで飽きさせない）
参考サイトの「Challenge → Solution」の語りを、UTUTU では**`project.story` ブロック配列を順に描画**する自由構成に一般化する。`ProjectBlock` の type ごとにレイアウトを変え、**縦一辺倒や単純な左右交互を避け、リズムを作る**。

ブロック type と描画ルール：
- **`textBlock`**：kicker（mono の小見出し、例 "Challenge" "Solution"）→ 大きな2行見出し（英字、既存の見出し作法、vermilion を一語に差す）→ lead 文 → body 段落（複数）。**スクロールで行ごと/段落ごとに reveal**（既存 `.reveal` の作法を踏襲）。
- **`fullImage`**：フルスクリーン（`100vw × 90–100vh`）の大画像。スクロールで軽い ken-burns or パララックス。キャプションがあれば mono で小さく。**画面いっぱいで"間"を作り、リズムの緩急をつける**。
- **`splitImageText`**：画像とテキストを左右に。`side` で画像が左/右かを指定。**毎回同じ並びにせず、ブロックごとに side を散らす**（データ側で制御）。テキストはスクロールで reveal、画像は軽くパララックス。
- **`imagePair`**：2枚を横並び/ずらし配置。サイズに非対称をつける（既存 Works Stage の非対称配置の精神）。
- **`quote`**：大きめの一文を中央に据える"余白の章"。前後を広く空け、緩急の"静"を作る。

**メリハリ設計（必須）**：
- フルスクリーン画像 → 左右分割 → テキストブロック → 余白の引用 → フルスクリーン…のように、**密度の異なるブロックを交互に**並べてスクロールの緩急を作る。
- 同じ type を3つ以上連続させない（データ側で担保しつつ、コンポーネントもそれを前提に余白を調整）。
- スクロール演出は"全部盛り"にしない。**reveal / 軽いパララックス / ken-burns / sticky の数種類**に絞り、既存サイトの文法内で組む（新種のド派手モーションを発明しない）。

### 3-4. クロージング CTA
参考サイトの「We don't pitch. We have a conversation.」に相当する締めの CTA を、UTUTU のコピー文法で。
- 大きめの一文 + `Book a call →`（既存 BigCTA / `.cta-btn` の作法）。
- 既存トップの BigCTA と被って冗長にならないよう、詳細ページ用は1ブロックに抑える。

### 3-5. Prev / Next + All Projects
- `getAdjacent(slug)` で前後プロジェクトへのリンク（タイトル + クライアント名）。
- `ALL PROJECTS →` で `/projects` に戻る。
- 既存フッターの直前に配置。フッターは既存の `Footer.tsx`（TVノイズ背景含む）をそのまま使う。

---

## 4. モーション実装の指針（既存に合わせる）

- スクロール連動の基盤は既存と同じ：**Lenis（スムーススクロール）+ Framer Motion `useScroll/useTransform`（軽い演出）+ GSAP ScrollTrigger（pin・scrub が要る重い演出）**。
- ヒーローの文字フェードアウト、概要の重ね、ストーリーの reveal は、**既存トップで使っているのと同じ関数・同じ係数感**で。挙動の一貫性が最優先。
- `prefers-reduced-motion: reduce` で全演出を無効化（既存方針）。
- 画面外の重い処理は IntersectionObserver で停止（既存の caustic / footer noise と同じ作法）。**詳細ページは画像が多いので、`next/image` の lazy + blur placeholder を徹底**し、初期ロードを軽くする。

---

## 5. パフォーマンス & 品質

- 画像は全て `next/image`、AVIF/WebP、`sizes` 適正化、ヒーローのみ `priority`。**10件 × 多数画像**になるので遅延読み込みと適切な `sizes` を徹底。
- 詳細ページ LCP < 2.5s 目標。フルスクリーン画像が LCP になりがちなので、ヒーロー画像は最適化最優先。
- Lighthouse：Performance ≥ 85 / Accessibility ≥ 95。
- a11y：見出し階層（h1=プロジェクト名）、画像 alt、リンクの focus-visible、キーボードで一覧→詳細→prev/next を辿れること。
- レスポンシブ：既存ブレークポイント（480 / 720 / 880 / 1280）。詳細ページの split / pair / fullscreen はモバイルで縦積みに落とす。
- `npm run build` 警告ゼロ。Vercel hnd1。

---

## 6. 画像の扱い（既存ルールに従う）

- ユーザー指定フォルダ（例 `public/images/projects/<slug>/`）の画像を `ls` → 各画像を `view` で確認 → 被写体・ブランドを判断 → 各ブロック（hero / fullImage / split / pair）に最適な1枚を割り当てる。**ファイル名だけで判断しない。**
- 不足する配置は `picsum.photos` の seeded URL で代替し、`// TODO: replace with real photo` コメントを残す。
- Unsplash 等で勝手に埋めない。

---

## 7. 既存3件 → データ化

現状トップに3件（YORKYS BRUNCH / YORKYS Creperie / YORKYS Entertainment）がある。これらを `lib/projects.ts` の `Project` 形式に移し、トップ・一覧・詳細すべてが**同じデータソース**を参照するようにする。残り約7件は同じ型で**プレースホルダ（タイトル仮 + picsum + TODO）として枠だけ用意**し、後からデータを差すだけで増やせる状態にする。

---

## 8. やってはいけないこと

- 参考サイト（Spector）の**見た目・配色・書体・文言をコピーしない**。借りるのは構造とスクロール演出の型のみ。
- 既存 UTUTU に**ない書体・色・モーション語彙を足さない**（vermilion 一点 / 既存4書体 / 既存モーション文法）。
- 詳細ページを**10枚手書きしない**（必ず `[slug]` + データ駆動）。
- CMS を勝手に導入しない（v1 はファイルベース）。
- 画像を勝手に Unsplash で埋めない。
- 重い演出を全部盛りにしない。**引き算**を守る。

---

## 9. 進め方（フェーズ）

各フェーズ後に `npm run build` が通り、該当ページをブラウザ確認してから次へ。

1. **データ基盤**：`lib/projects.ts`（型 + 既存3件 + 7件プレースホルダ + ヘルパ関数）。`generateStaticParams`。
2. **一覧ページ `/projects`**：既存ブランドパネルを共通コンポーネント化して再利用、データ駆動・件数可変に。トップに `View More Projects` 導線を追加。
3. **詳細ページ枠**：`/projects/[slug]` のルートと、ヒーロー（文字フェードアウト）→ 概要（画像に重なるテキスト）までを実装。
4. **ストーリーセクション**：`ProjectBlock` の各 type コンポーネントを実装し、メリハリ（フルスクリーン/左右/余白引用）を作る。reveal・パララックス・ken-burns を既存文法で。
5. **クロージング CTA + Prev/Next + All Projects**、既存フッター接続。
6. **画像割り当て**（§6）、`next/image` 最適化、reduced-motion、a11y、レスポンシブ。
7. **仕上げ**：Lighthouse、build 警告ゼロ、Vercel hnd1 デプロイ確認。

---

## 10. 完了の定義

- [ ] トップの実績セクション直後に `View More Projects →` があり `/projects` へ飛ぶ
- [ ] `/projects` がトップと同じ sticky stacking の動きで、データ件数ぶん（現状3、将来10）を1枚ずつ見せる
- [ ] 各カードクリックで `/projects/[slug]` に遷移
- [ ] 詳細ヒーローで、KVは残しつつ**文字がスクロールで消える**
- [ ] 概要セクションで、**画像の上に重なったテキストがスクロールで動く**、メタ（Date/Industry/Role/Deliverables/Timeframe）が読める
- [ ] ストーリーが、フルスクリーン画像・左右分割・余白引用などで**緩急がつき、最後まで飽きずにスクロールできる**
- [ ] Prev/Next と ALL PROJECTS が機能
- [ ] 既存フッター（TVノイズ）に接続
- [ ] 既存サイトとトーン&マナーが完全に一致（色・書体・モーション・余白）
- [ ] 10件にスケールしても、`lib/projects.ts` にデータを足すだけで増える構造
- [ ] Lighthouse Perf ≥ 85 / A11y ≥ 95、build 警告ゼロ、Vercel hnd1

---

## 付録：参考サイト詳細ページの構造分析（Spector / Thermal Dynamics）

借りる「型」の出所として、参考ページの実際の section 順を記録（**内容・文言は真似ない**。順番と演出の型のみ）：

1. **Hero**：大タイトル（プロジェクト名）＋1行 description。スクロールで文字が抜ける。
2. **Overview**：クライアントロゴ → イントロ1文 → 日付 → メタ4種（Industry / Role（複数）/ Deliverables（複数）/ Timeframe）→ VIEW PROJECT リンク。画像とテキストが重なる構成。
3. **Story – Challenge**：kicker "Challenge" → 大見出し2行 → lead → body 2段落。
4. **Story – Solution**：kicker "Solution" → 大見出し2行 → lead → body 2段落 → 締めの要約文＋ロール列挙＋クロージング1文。大画像を随所に挟む。
5. **CTA**：「We don't pitch. We have a conversation.」＋ Book a Call ＋ 担当者カード。
6. **Prev / Next** プロジェクト＋ ALL PROJECTS。
7. Footer。

UTUTU では 3・4 を「`Challenge`/`Solution` という固定2章」ではなく、**`story: ProjectBlock[]` の自由な並び**に一般化し、プロジェクトごとに語りの構成を変えられるようにする（テンプレ臭を避け、10件が金太郎飴にならないように）。
