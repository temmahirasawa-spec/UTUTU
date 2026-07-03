# Handoff: UTUTU — Hero セクション調整

リポジトリ: `temmahirasawa-spec/UTUTU`（Next.js / Tailwind）
対象: トップページ Hero（`components/Hero.tsx` + `app/globals.css` + `components/Nav.tsx`）

---

## 概要 / Overview

UTUTU トップページの Hero（ファーストビュー）に対するデザイン調整。
このフォルダの HTML（`UTUTU Hero.dc.html`）は **デザインの参照プロトタイプ** であり、そのまま本番へコピーするコードではありません。**既存の Next.js コードベースの該当ファイルに、下記の差分を適用** してください。レイアウト・配色・フォントは現状のトークン（`app/globals.css` の `:root`）を 1:1 で踏襲しています。

## 忠実度 / Fidelity

**High-fidelity（hifi）**。配色・タイポ・余白・寸法は実コードの値に一致。下記「変更点」の数値は確定値として適用可。

---

## 変更点 / Changes（← これが実装タスク）

元の Hero に対し、今回のデザインで変更したのは **3点のみ**。他は現状維持。

### 1. 日本語サブコピーを拡大
`app/globals.css` の `.hero-jp`

```diff
.hero-jp {
  font-family: var(--jp); font-weight: 500;
- font-size: clamp(0.86rem, 1.25vw, 1.2rem);
+ font-size: 26px;
  line-height: 1.85; margin-top: 22px; max-width: 36em;
  color: var(--mid); letter-spacing: 0.02em;
  word-break: keep-all; line-break: strict;
}
```
対象テキスト: `つくる。そして、機能させる。`
※レスポンシブの clamp をやめ固定 26px に。モバイルで大きすぎる場合は `clamp(1.1rem, 3.2vw, 26px)` を提案。

### 2. 拠点都市リストを拡大・行間拡張
`app/globals.css` の `.hero-content__right p`

```diff
.hero-content__right p {
  font-family: var(--mono); font-weight: 500;
- font-size: clamp(0.66rem, 0.8vw, 0.8rem);
- letter-spacing: 0.16em; line-height: 1.9;
+ font-size: 18px;
+ letter-spacing: 0.16em; line-height: 2.45;
  color: var(--mid); text-align: right;
  align-self: flex-end;
}
```
対象テキスト: `KOBE / OSAKA / NAGOYA / TOKYO`

### 3. ナビのソーシャルリンクを削減
`components/Nav.tsx` — `WA` `X` `LI` を削除し、`IG` `EMAIL` のみ残す

```diff
  <nav className="nav__left" aria-label="Social and contact">
-   <a href="#" aria-label="WhatsApp">WA</a>
-   <a href="#" aria-label="X (Twitter)">X</a>
    <a href="#" aria-label="Instagram">IG</a>
-   <a href="#" aria-label="LinkedIn">LI</a>
    <a href="mailto:hello@ututu.studio" aria-label="Email">EMAIL</a>
  </nav>
```

---

## Hero 仕様（参照）/ Reference Spec

変更しない既存値も含めた全体像。

### レイアウト
- `.hero-stage` 高さ `220vh`、`.hero-sticky` が `sticky top:0; height:100vh`（スクロール演出）。今回のプロトタイプは sticky 着地状態を 1 枚で再現。
- `.hero-content`: `position:absolute; inset:0; display:grid; grid-template-columns:1.4fr 1fr; align-items:center; gap:60px; padding:18vh clamp(28px,5vw,80px) 40vh`
- 左カラム = 見出し群、右カラム = 拠点リスト（右寄せ）
- `@media (max-width:880px)` で 1 カラム化（既存挙動を維持）

### コンテンツ
| 要素 | テキスト |
|---|---|
| H1 | `We design it.` / `We make it work.`（"work." のみアクセント色）|
| JP sub | `つくる。そして、機能させる。` |
| ステータス | `● Brand × AI Creative Studio` |
| 拠点 | `KOBE / OSAKA / NAGOYA / TOKYO` |
| ナビ | `IG` `EMAIL`（変更後）|
| ワードマーク | `UTUTU`（下部・特大・mint）|

### デザイントークン（`app/globals.css :root`）
| Token | 値 | 用途 |
|---|---|---|
| `--v` | `#5FD0A8` | mint アクセント（1点のみ）|
| `--v-glow` | `rgba(95,208,168,0.22)` | アクセント微光 |
| `--bg` | `#0A0A0B` | ダーク背景 |
| `--bg-2` | `#0E0E10` | 副背景 |
| `--fg` | `#F4F2ED` | warm white テキスト |
| `--mid` | `rgba(244,242,237,0.62)` | 中間テキスト |
| `--low` | `rgba(244,242,237,0.40)` | 低コントラスト |
| `--line` | `rgba(244,242,237,0.10)` | 罫線 |

### タイポグラフィ
- `--mark`: Bricolage Grotesque 700（ワードマーク）
- `--sans`: Helvetica Neue / Inter / Noto Sans JP（見出し・本文。H1 は weight 800）
- `--jp`: Noto Sans JP（日本語）
- `--mono`: JetBrains Mono（ラベル・拠点・ナビ）

---

## プロトタイプのみの要素（本番には実装しない）

- **Hero 写真**: プロトタイプでは縞模様プレースホルダ。本番は既存の `HERO_IMAGE`（`@/lib/images`）を使用。
- **アニメーション**: スクロール連動の sticky 拡縮・morphing wordmark・LenisProvider・CustomCursor などは既存コンポーネントのまま。プロトタイプは静止状態のみ表現。
- **Tweaks（accent / scrim / grid）**: デザイン検討用のプロトタイプ操作。本番コードへの反映は不要。

---

## ファイル / Files
- `UTUTU Hero.dc.html` — Hero デザイン参照（ブラウザで直接開けます）
- `hero-preview.png` — 完成イメージのスクリーンショット
