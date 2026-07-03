import type { StaticImageData } from 'next/image';
import { IMG } from './images';
import fromaNaikan from '@/public/images/brands/froma/naikan.jpg';

// ── 実績（projects）= /projects 一覧 と /projects/[slug] 詳細 の単一データソース ──
// トップの注目実績（FEATURED）= YORKYS BRUNCH / MADEMOISELLE CROQUETTE の2件。背景は動画 or 画像。
// 見出し文字列の規約（描画側 accentize で解釈）: '\n' → <br>、 '*word*' → <span class="v">word</span>

export type Img = StaticImageData | string;

// 画像 or 動画の1メディア枠（processStep 用）。video があれば <video autoplay loop muted playsinline> を再生。
export type Media = { src?: Img; video?: string; alt: string };

export type ProjectBlock =
  | { type: 'fullImage'; src: Img; alt: string; caption?: string }
  | { type: 'splitImageText'; src: Img; alt: string; side: 'left' | 'right'; heading?: string; body: string }
  | { type: 'textBlock'; kicker?: string; heading?: string; lead?: string; body?: string[] }
  | { type: 'imagePair'; left: { src: Img; alt: string }; right: { src: Img; alt: string } }
  | { type: 'quote'; text: string }
  // ── 長尺ドキュメンタリー用（mademoiselle 等）。既存型はそのまま＝後方互換 ──
  | { type: 'toolList'; kicker?: string; heading?: string; lead?: string; tools: { name: string; role: string }[]; note?: string }
  // variant: メディアのレイアウト指定（'logo8'=4列×2 / 'styling12'=8列密 / 'realize'=2×2・16:9・動画可）。未指定なら枚数で自動。
  | { type: 'processStep'; no: string; heading: string; body: string[]; images?: Media[]; climax?: boolean; variant?: string }
  | { type: 'imageGrid'; images: { src: Img; alt: string }[]; caption?: string }
  // 表情探索など「1コマずつ時間軸で見せる」横スクロールのフィルムストリップ（picked=丸印の有力候補を強調）
  | { type: 'frameSequence'; kicker?: string; heading?: string; body?: string[]; frames: { src?: Img; alt: string; picked?: boolean }[]; caption?: string };

export type Overview = {
  intro: string;
  date?: string;
  industry: string;
  role: string[];
  deliverables: string[];
  timeframe?: string;
  approach?: string; // AI壁打ち中心… 等（任意。空なら行ごと非表示）
  liveUrl?: string;
};

// hero は画像（src）か動画（video）のどちらか。video のときは CoverVideo が再生する。
export type Hero = { src?: Img; video?: string; alt: string };

export type Project = {
  slug: string;
  no: string; // {01}
  order: number;
  placeholder?: boolean;
  // 一覧パネル用
  title: string;
  nameLines: string[];
  category: string;
  tagline: string;
  jp: string;
  caption: string;
  panelMeta: string;
  hero: Hero;
  client: string;
  // 詳細ページ用
  overview: Overview;
  story: ProjectBlock[];
};

// ダミー画像（picsum）と mademoiselle 実画像パスのヘルパ。realProjects からも参照するため、データ定義より前に置く（const の TDZ 回避）。
const px = (seed: string, w = 1600, h = 1000) => `https://picsum.photos/seed/${seed}/${w}/${h}`;
const mq = (file: string) => `/images/mademoiselle/${file}`;

const realProjects: Project[] = [
  // ── 1. YORKYS BRUNCH（背景=動画） ──
  {
    slug: 'yorkys-brunch',
    no: '{01}',
    order: 1,
    placeholder: false,
    title: 'YORKYS BRUNCH',
    nameLines: ['YORKYS', 'BRUNCH'],
    category: '飲食 / ブランチ・カフェ',
    tagline: 'GOOD BRUNCH, GREAT DAY!',
    jp: '2014年・兵庫 夙川 / YORKYS の原点 ※要確認',
    caption: 'オーストラリアの朝食文化を関西へ。YORKYS の原点となったブランチ・カフェの世界観を、ブランドとして設計。',
    panelMeta: 'Branding · VI · Web · Mobile Order',
    client: '株式会社YORKYS ENTERTAINMENT',
    hero: { video: '/videos/business-video-2.mp4', alt: 'YORKYS BRUNCH のブランドムービー' },
    overview: {
      intro:
        'YORKYS グループの原点、YORKYS BRUNCH。サーフィンの朝に出会ったオーストラリアの“ブランチ”を関西へ——2014年、兵庫・夙川に生まれた一号店です。※開業年・場所は要確認。このページは、洋輔さんの原体験からロゴの意匠、グラフィック展開、空間、そして経営の広がりまでを、UTUTU の視点で紐解くドキュメントです。',
      date: '2014年・兵庫 夙川 ※要確認',
      industry: '飲食 / カフェレストラン（ブランチ）',
      // TODO: 実際の担当範囲に合わせて修正
      role: ['ブランド設計', 'ロゴ・VI', 'グラフィック展開', '空間ディレクション'],
      // TODO: 実際の納品物に合わせて修正
      deliverables: ['ロゴ', 'メニュー表', 'ポスター', 'ショップカード', 'グッズ', '空間グラフィック'],
    },
    // ── 画像は全てダミー（px＝picsum）。実ファイルは public/images/brands/yorkys-brunch/ 配下に後日差し込み。
    //    各ブロックの // TODO に想定パスを記載。数値・年号・担当範囲は // ※要確認 / TODO で仮置き。
    story: [
      // ── C. 起源のストーリー（洋輔さんの原体験）──
      {
        type: 'textBlock',
        kicker: 'Origin',
        heading: '朝を、\n*目的地*にする。',
        lead: 'サーフィンの後に食べる朝食のように——一日でいちばん豊かな時間を、ひとつの店に。',
        body: [
          '大学時代、授業よりサーフィンに明け暮れた洋輔さん。唯一夢中で聴いたのがマーケティングの講義だった。3年で休学し、オーストラリアへ渡る。※要確認',
          '日の出とともに海へ入り、上がってからカフェでゆっくりとブランチを取る——その朝の居心地の良さが、のちの起業の直接の動機になった。',
          '帰国・独立を経て、2014年、兵庫・夙川に YORKYS BRUNCH を開店。ここが YORKYS グループの原点になった。※開業年は要確認',
        ],
      },
      // TODO: replace → public/images/brands/yorkys-brunch/origin/ （オーストラリアの朝・サーフィン・夙川店の空気）
      { type: 'fullImage', src: px('yb-origin', 2200, 1240), alt: '朝の海とブランチの情景（ダミー）', caption: 'GOOD BRUNCH, GREAT DAY! — 一日は、朝の一皿から。' },
      { type: 'quote', text: '日の出とともに、海へ。\n海から上がって、朝食へ。その循環が、*ひとつの店*になった。' },

      // ── D. ロゴマークの意匠解説（このページ最大の見せ場）──
      {
        type: 'textBlock',
        kicker: 'The Mark',
        heading: 'なぜ、\n*卵*なのか。',
        body: [
          'ブランチは、卵料理の時間。だからモチーフは卵——と言えば、それだけの話に聞こえる。',
          'けれどこの卵には、もうひとつの絵が畳み込まれている。',
        ],
      },
      // TODO: replace → public/images/brands/yorkys-brunch/logo/anatomy/ （卵の解剖図：割れ目=山の稜線 / 黄身=太陽 の対応を示す注釈グラフィック）
      { type: 'fullImage', src: px('yb-logo-anatomy', 2200, 1300), alt: 'ロゴの解剖：卵＝山＋太陽（ダミー）', caption: '卵の割れ目は山の稜線、黄身は太陽。ひとつの形に、朝の情景が重ねられている。' },
      {
        type: 'textBlock',
        heading: '割れ目は*山*、\n黄身は*太陽*。',
        body: [
          'オーストラリアの朝——山（波・岸）の向こうから、太陽が昇ってくる。サーフィンから上がった、あの光景。',
          'それを一個の卵の輪郭に凝縮したのが、このロゴ。食材のアイコンではなく、創業の原体験そのものを図案化した“物語の圧縮”になっている。',
        ],
      },
      { type: 'quote', text: 'ひとつの卵に、\nあの朝が、*畳まれている*。' },

      // ── D-2. 表情の探索（卵シンボルのキャラクター化検証。1コマずつ時間軸で見せる）──
      // TODO: この表情探索が最終的にどう使われたか（製品化されたか）を天真さんに確認
      {
        type: 'frameSequence',
        kicker: 'Expressions',
        heading: '卵に、\n*表情*を与える。',
        body: [
          '卵のシンボルに目や口を描き、どの顔がブランドになり得るか——手描きで大量に検証した当時の資料。',
          '一枚のコンタクトシートではなく、試した順に一コマずつ。丸をつけた候補が、有力視されたもの。',
        ],
        // TODO: replace → public/images/brands/yorkys-brunch/logo/expressions/ （手描き表情候補を1コマずつ。picked=丸印の候補は強調）
        frames: [
          { src: px('yb-exp-01', 600, 800), alt: '表情候補 01（ダミー）' },
          { src: px('yb-exp-02', 600, 800), alt: '表情候補 02（ダミー）' },
          { src: px('yb-exp-03', 600, 800), alt: '表情候補 03（ダミー）', picked: true },
          { src: px('yb-exp-04', 600, 800), alt: '表情候補 04（ダミー）' },
          { src: px('yb-exp-05', 600, 800), alt: '表情候補 05（ダミー）' },
          { src: px('yb-exp-06', 600, 800), alt: '表情候補 06（ダミー）', picked: true },
          { src: px('yb-exp-07', 600, 800), alt: '表情候補 07（ダミー）' },
          { src: px('yb-exp-08', 600, 800), alt: '表情候補 08（ダミー）' },
          { src: px('yb-exp-09', 600, 800), alt: '表情候補 09（ダミー）' },
          { src: px('yb-exp-10', 600, 800), alt: '表情候補 10（ダミー）', picked: true },
          { src: px('yb-exp-11', 600, 800), alt: '表情候補 11（ダミー）' },
          { src: px('yb-exp-12', 600, 800), alt: '表情候補 12（ダミー）' },
        ],
        caption: '横スクロールで、試作の厚みをたどる。※実資料は手描きグリッド（a〜k列×1〜7行程度）、後日差し替え',
      },

      // ── E. ロゴ探索プロセス＋パターン展開（探索→決定の物語）──
      {
        type: 'textBlock',
        kicker: 'Exploration',
        heading: 'この曲線に、\n*決まる*まで。',
        lead: '2014年制作当時の検討資料を、探索から決定への道のりとして。',
      },
      // TODO: replace → public/images/brands/yorkys-brunch/logo/01-shape-exploration/ （卵のプロポーション比較）
      {
        type: 'imageGrid',
        images: [
          { src: px('yb-shape-1', 900, 1200), alt: '卵形状の探索 1（ダミー）' },
          { src: px('yb-shape-2', 900, 1200), alt: '卵形状の探索 2（ダミー）' },
          { src: px('yb-shape-3', 900, 1200), alt: '卵形状の探索 3（ダミー）' },
          { src: px('yb-shape-4', 900, 1200), alt: '卵形状の探索 4（ダミー）' },
        ],
        caption: '① シンボル形状の探索 — 卵のプロポーションを、細身からふくよかまで何段階も。',
      },
      // TODO: replace → public/images/brands/yorkys-brunch/logo/02-symbol-pattern/ （卵モチーフの別方向のバリエーション）
      {
        type: 'imagePair',
        left: { src: px('yb-sympat-a', 1400, 1050), alt: 'シンボルパターン展開 A（ダミー）' },
        right: { src: px('yb-sympat-b', 1050, 1400), alt: 'シンボルパターン展開 B（ダミー）' },
      },
      // TODO: replace → public/images/brands/yorkys-brunch/logo/03-font-pattern/ （ワードマークの書体・組み検討）
      {
        type: 'imageGrid',
        images: [
          { src: px('yb-font-1', 900, 1200), alt: 'ロゴタイプ探索 1（ダミー）' },
          { src: px('yb-font-2', 900, 1200), alt: 'ロゴタイプ探索 2（ダミー）' },
          { src: px('yb-font-3', 900, 1200), alt: 'ロゴタイプ探索 3（ダミー）' },
        ],
        caption: '③ ロゴタイプの探索 — ワードマークの書体・組みを、シンボルとは独立して。',
      },
      // TODO: replace → public/images/brands/yorkys-brunch/logo/04-final-decision/ （確定ロックアップ）
      { type: 'fullImage', src: px('yb-logo-final', 2200, 1300), alt: '最終ロゴのロックアップ（ダミー）', caption: '④ 決定 — シンボル＋ロゴタイプ＋タグラインのロックアップ。' },

      // ── F. グラフィック応用展開（代表例の抜粋。網羅しない）──
      {
        type: 'textBlock',
        kicker: 'Applications',
        heading: 'ロゴは、\n*運用*で生きる。',
        body: [
          'メニュー、グッズ、什器——ロゴは置かれて初めてブランドになる。ここでは網羅ではなく、代表的な応用をいくつか。',
        ],
      },
      // TODO: replace → public/images/brands/yorkys-brunch/applications/menu/ （木目背景＋卵ロゴのメニュー。表紙＋1〜2見開きを抜粋） / TODO: 洋輔さんへ確認
      {
        type: 'splitImageText',
        src: px('yb-app-menu', 1400, 1050),
        alt: 'メニューブック（ダミー）',
        side: 'left',
        heading: 'メニュー\n（*抜粋*）',
        body: '木目調の背景に卵ロゴを配した、エディトリアルなメニュー。全◯ページ構成のうち、表紙と見開きを代表として。※総ページ数は要確認',
      },
      // TODO: replace → public/images/brands/yorkys-brunch/applications/goods/ （トートバッグ 着用＋単体）
      {
        type: 'imagePair',
        left: { src: px('yb-app-tote-worn', 1400, 1050), alt: 'トートバッグ 着用（ダミー）' },
        right: { src: px('yb-app-tote', 1050, 1400), alt: 'トートバッグ 単体（ダミー）' },
      },
      // TODO: replace → public/images/brands/yorkys-brunch/applications/goods/mug/ （マグ完成写真を主役に。陶器転写の製造仕様書は補足）
      {
        type: 'splitImageText',
        src: px('yb-app-mug', 1400, 1050),
        alt: 'マグカップ（ダミー）',
        side: 'right',
        heading: '絵ではなく、\n*仕様*として。',
        body: 'タグラインとハート型の卵アイコンをあしらったマグ。陶器転写の製造仕様書（サイズ・絵付範囲）まで残り、ロゴが“運用ルール”として設計されていたことを示す。',
      },

      // ── G. 空間（インテリア＆ファサード）──
      // TODO: replace → public/images/brands/yorkys-brunch/space/interior/ （白壁×木・大きな窓・高い天井。2Fメニューシートの店内写真を転用可）
      {
        type: 'splitImageText',
        src: px('yb-space-interior', 1400, 1050),
        alt: '店内（ダミー）',
        side: 'left',
        heading: '光を、\n*家具*に反射させる。',
        body: '白い壁に木の家具。大きな窓から差す光が壁とテーブルに反射し、高い天井が開放感をつくる。カウンター、テーブル、ソファ——朝の過ごし方に、選択肢を。',
      },
      // TODO: replace → public/images/brands/yorkys-brunch/space/facade/ （夙川カトリック教会を望むファサード）
      { type: 'fullImage', src: px('yb-space-facade', 2200, 1240), alt: 'ファサード（ダミー）', caption: '阪急夙川から徒歩4分、教会の向かい。窓の向こうに教会が見える立地。※ロケーションは要確認' },
      { type: 'quote', text: '教会を望む、\n大きな窓の*朝*。' },

      // ── H. 経営的な工夫（ビジネス視点）──
      // NOTE: このセクションは「洋輔さんへの質問票（Achievement / ブランドストーリー用）」の回答が入り次第、精度を上げる前提。
      {
        type: 'textBlock',
        kicker: 'Business',
        heading: '生地の技術が、\n*グループ*を広げた。',
        body: [
          '「持ち帰りたい」という声に応え、パンケーキ生地を研究・改良。専用の温度と製法で独自食感のクレープ生地を開発し、これが YORKYS Creperie 誕生の起点になった（2018年・大阪梅田 ※要確認）。BRUNCH の生地技術が、グループ全体の起点になっている。',
          '洋輔さんは「飲食にこだわらない」という考えで領域を拡張。サーフィン用の服からアパレル「Byron Days」を、Web・内装を手がけるデザイン会社を自ら立ち上げた時期も。“食”だけでなく“デザイン”に早くから自覚的だった——UTUTU に地続きの伏線。※現況は要確認',
          '2024年7月時点で東京・名古屋・大阪・兵庫に計8店舗を運営。※店舗数・現在の数値は要確認（洋輔さんに最新値を確認）',
        ],
      },

      // ── I. クロージング ──
      {
        type: 'textBlock',
        kicker: 'The Point',
        heading: '一皿ではなく、\n*一日*を売る。',
        body: [
          'YORKYS BRUNCH が設計したのは、メニューではなく“朝の過ごし方”。ロゴの一個の卵に、創業者の原体験を畳み込み、店・グラフィック・グッズ・空間へと展開した。',
          'そしてその生地技術と美意識が、YORKYS グループ全体の起点になっていく。',
        ],
      },
      { type: 'quote', text: 'ひとつの卵に、ひとつの朝を描いた。\nYORKYS BRUNCH は、*そこから*始まった。' },
    ],
  },

  // ── 2. PIECE OF BAKE（背景=動画） ──
  {
    slug: 'piece-of-bake',
    no: '{02}',
    order: 2,
    placeholder: false,
    title: 'PIECE OF BAKE',
    nameLines: ['PIECE OF', 'BAKE'],
    category: '飲食 / ベイカリー・スイーツ',
    tagline: 'Bakery & Sweets Factory',
    jp: '2022年・梅田 / 生ドーナツ ボンボローニ ※要確認',
    caption: 'トスカーナ生まれの生ドーナツ“ボンボローニ”。出来立ての温もりを届けるブランドを設計。',
    panelMeta: 'Branding · VI · Packaging · Store',
    client: '株式会社YORKYS ENTERTAINMENT',
    hero: { video: '/videos/bake.mp4', alt: 'PIECE OF BAKE のブランドムービー' },
    overview: {
      intro:
        'イタリア・トスカーナの伝統菓子“ボンボローニ”を、日本の街のファクトリーへ。2022年、梅田に生まれた生ドーナツのブランドです。※開業年・場所は要確認。数種類の小麦粉をブレンドしたふわふわ生地に、北海道産クリームの軽さ。私たちは“出来立ての温もり”を、ロゴ・店舗グラフィック・商品ビジュアル・パッケージまで一貫した世界観に落とし込みました。',
      date: '2022〜 ※要確認',
      industry: '飲食 / ベイカリー・スイーツ',
      // TODO: 実際の担当範囲に修正
      role: ['ブランド戦略', 'ロゴ・VI', 'アートディレクション', 'パッケージ'],
      // TODO: 実際の納品物に修正
      deliverables: ['ロゴ・VI', '店舗グラフィック', '商品ビジュアル', 'パッケージ'],
    },
    story: [
      {
        type: 'textBlock',
        kicker: 'Origin',
        heading: 'ひと口で、\n*記憶*に残す。',
        lead: '看板は、イタリア・トスカーナ生まれの生ドーナツ“ボンボローニ”。',
        body: [
          '独自開発のふわふわ生地に、揚げたてでクリームを搾り入れる“ふわじゅわ”の食感。冷めても美味しい生地を、職人が一つずつ。',
          'よく似た焼き菓子が並ぶ街で、“わざわざ買いに行く”理由をどうつくるか。そこが出発点でした。',
        ],
      },
      { type: 'fullImage', src: IMG.pobStoreExterior, alt: 'PIECE OF BAKE の店舗外観', caption: '出来立てを手渡す、街の小さなファクトリー。' },
      {
        type: 'splitImageText',
        src: IMG.pobDonuts,
        alt: 'PIECE OF BAKE のドーナツのラインナップ',
        side: 'left',
        heading: '主役は、\n*商品*。',
        body: 'グラフィックは一歩引いて、焼き上がりを引き立てる。手描き風のロゴとイエローを軸に、棚でも袋でも画面でも“らしさ”が伝わるシステムへ。',
      },
      {
        type: 'textBlock',
        kicker: 'Flavor',
        heading: '日常の、\n*ご褒美*に。',
        body: [
          'プレーン、クレマ、ピスタチオ、キャラメル、チョコ、ラズベリー、レモン——次々に生まれるフレーバー。',
          '梅田・名古屋・吉祥寺・マリンピア神戸など、複数の街へ。※店舗は変動の可能性あり・要確認',
        ],
      },
      {
        type: 'imagePair',
        left: { src: IMG.pobStoreInterior, alt: 'PIECE OF BAKE の店内' },
        right: { src: IMG.pobHero, alt: 'PIECE OF BAKE のドーナツとブランドグラフィック' },
      },
      { type: 'quote', text: 'ただのドーナツじゃない。\n*記憶に残る*、ひとかけら。' },
    ],
  },

  // ── 3. FROMA（背景=画像 naikan.jpg） ──
  {
    slug: 'froma',
    no: '{03}',
    order: 3,
    placeholder: false,
    title: 'FROMA',
    nameLines: ['FROMA'],
    category: '飲食 / チーズ・ダイニング',
    tagline: 'Cheese Dining',
    jp: '神戸国際会館 SOL B2F / チーズ工房併設 ※要確認',
    caption: 'リコッタチーズに着目して生まれたチーズ・ダイニング。“地下の貯蔵庫”の世界観を設計。',
    panelMeta: 'Branding · VI · Space Graphic · Signage',
    client: '株式会社YORKYS ENTERTAINMENT',
    hero: { src: fromaNaikan, alt: 'FROMA の内観 — バーカウンターとダイニング' },
    overview: {
      intro:
        'YORKYS BRUNCH のパンケーキ生地に使われていたリコッタチーズ——その一点に着目して生まれた、チーズが主役のダイニング。神戸国際会館の20周年リニューアルに合わせ、地下の SOL フロアにオープンしました。※時期・場所は要確認。“地下の秘密のチーズ貯蔵庫”をコンセプトに、私たちは空間に紐づくブランドとグラフィックを設計しました。',
      date: '神戸国際会館 SOL B2F ※要確認',
      industry: '飲食 / チーズ・ダイニング',
      // TODO: 実際の担当範囲に修正
      role: ['ブランド設計', 'VI', '空間グラフィック', 'サイン計画'],
      // TODO: 実際の納品物に修正
      deliverables: ['ブランド・VI', 'サイン計画', 'メニュー・販促', 'Web'],
    },
    story: [
      {
        type: 'textBlock',
        kicker: 'Origin',
        heading: 'パンケーキから、\n*チーズ*へ。',
        lead: '一枚のパンケーキに入っていたリコッタチーズが、ひとつの業態になった。',
        body: [
          'YORKYS BRUNCH の生地に使われていたリコッタ。その一点を主役に引き上げて、チーズ・ダイニング FROMA は生まれました。',
          '“ひとつの原点から枝分かれする”——YORKYS の系譜を、もっとも象徴するブランドです。',
        ],
      },
      { type: 'fullImage', src: IMG.fromaHero, alt: 'FROMA の全景とバーカウンター', caption: '地下の秘密のチーズ貯蔵庫のような、特別な一室。' },
      {
        type: 'splitImageText',
        src: IMG.fromaInterior,
        alt: 'FROMA の店内空間',
        side: 'right',
        heading: '五感で、\n*味わう*空間。',
        body: '作りたてのフレッシュチーズを、その場で。店内のチーズ工房を核に、空間そのものが体験になるよう、ブランドとサインを設計しました。',
      },
      {
        type: 'imagePair',
        left: { src: IMG.fromaSignage, alt: 'FROMA のサイン' },
        right: { src: IMG.fromaFoodSpread, alt: 'FROMA の料理' },
      },
      {
        type: 'textBlock',
        kicker: 'Menu',
        heading: 'チーズが、\n*主役*。',
        body: [
          'モッツァレラやカマンベール、ゴルゴンゾーラに加え、ブッラータやカチョカバロ。シカゴピザ、チーズを絡めたパスタ、独創的なチーズケーキ。',
          'ランチのフレッシュチーズ・ビュッフェから、大人数のパーティまで。※提供内容・人数は要確認',
        ],
      },
      { type: 'fullImage', src: IMG.fromaPizza, alt: 'FROMA のピッツァ', caption: 'とろけるチーズを、料理の主語に。' },
      { type: 'quote', text: '地下の扉を開けると、\nそこは*チーズの貯蔵庫*。' },
    ],
  },
];

// ── プレースホルダ（実画像はあるがコピーは仮 / picsum） ──
// （px / mq ヘルパは realProjects より前に移動済み＝TDZ回避のため）

function picsumProject(order: number, title: string, nameLines: string[], category: string, jp: string): Project {
  const no = `{${String(order).padStart(2, '0')}}`;
  const slug = `project-${String(order).padStart(2, '0')}`;
  return {
    slug,
    no,
    order,
    placeholder: true,
    title,
    nameLines,
    category,
    tagline: 'Coming soon.',
    jp,
    caption: '※ プレースホルダー。データを差し替えると実績が増えます。',
    panelMeta: 'TBD',
    client: 'UTUTU',
    hero: { src: px(`ututu-${slug}-hero`, 2000, 1200), alt: `${title}（プレースホルダー画像）` },
    overview: {
      intro: '※ プレースホルダー。実プロジェクトのデータは後送。 / Placeholder — real data to follow.',
      date: 'TBD',
      industry: category,
      role: ['TBD'],
      deliverables: ['TBD'],
      timeframe: 'TBD',
    },
    story: [
      { type: 'textBlock', kicker: 'Overview', heading: 'Coming\n*soon.*', body: ['※ このプロジェクトは枠のみ。データを差し替えると詳細が埋まります。'] },
      { type: 'fullImage', src: px(`ututu-${slug}-1`, 2000, 1200), alt: `${title} 画像1（仮）` },
      { type: 'splitImageText', src: px(`ututu-${slug}-2`, 1400, 1000), alt: `${title} 画像2（仮）`, side: order % 2 === 0 ? 'left' : 'right', heading: 'Placeholder\n*block.*', body: '※ ここに実コピーが入ります。' },
    ],
  };
}

const placeholderProjects: Project[] = [
  // ── MADEMOISELLE CROQUETTE — プロセス・ドキュメンタリー型（縦長）。 ──
  // 実画像は public/images/mademoiselle/ に配置済み（mq() で参照）。被写体を view して各工程へ割当。
  //   写真=01(店先)/kv01(外観)/35,37,38(実写)・動画=36.mp4 / ロゴロックアップ=04〜21 / キャラ図版=22〜34
  {
    slug: 'mademoiselle-croquette',
    no: '{04}',
    order: 4,
    placeholder: false,
    title: 'MADEMOISELLE CROQUETTE',
    nameLines: ['MADEMOISELLE', 'CROQUETTE'],
    category: 'F&B / BRANDING',
    tagline: 'Crisp Out, Cream In.',
    jp: 'マドモアゼルクロケット — クリームコロッケ専門店',
    caption: '物語をまとった洋食ブランド。AIとの壁打ちで人格・ロゴ・世界観を立ち上げた、制作プロセスのドキュメント。',
    panelMeta: 'Branding · Logo · AI Direction · Deck',
    client: 'YORKYS Entertainment',
    hero: { src: mq('kv01.jpg'), alt: 'Mademoiselle Croquette の店舗イメージ（外観キービジュアル）' },
    overview: {
      intro:
        'クリームコロッケ専門店として構想された、YORKYS ENTERTAINMENT の新ブランド。出店イメージは大阪・梅田のカッパ横丁。日常の中の飲食店でありながら、ただの惣菜・揚げ物屋ではなく、"物語を持った洋食ブランド" として立ち上げました。',
      industry: '飲食 / クリームコロッケ専門店',
      // TODO: 実際の担当に合わせて微調整
      role: ['ブランド設計', 'ネーミング・タグライン', 'ストーリー設計', 'ロゴ・キャラクター', 'アートディレクション', 'AIプロンプト設計', '資料化'],
      // TODO: 実際の納品物に合わせて微調整
      deliverables: ['ブランドコンセプト', 'ロゴ（看板娘）', 'キャラクターバリエーション', 'キービジュアル方向性', 'ブランディング資料'],
      approach: 'AI壁打ち中心（ChatGPT ＋ 画像生成 ＋ デザインツール仕上げ）',
      timeframe: '資料化は約2日 ※要確認',
    },
    story: [
      // ── B→C ブリッジ：役割分担（記載順は 洋輔 → 天真） ──
      {
        type: 'textBlock',
        kicker: 'Team',
        heading: '事業の構想に、\n*AI × デザイン*を掛ける。',
        body: [
          '洋輔 ＝ 飲食ブランドを立ち上げる実業の文脈（YORKYS BRUNCH／PIECE OF BAKE／FROMA の延長）。',
          '天真 ＝ ブランドの人格設計、AIでの高速検証、ロゴから資料化までを一気通貫で。',
        ],
      },

      // ── C. 使用した手法・テクノロジー ──
      {
        type: 'toolList',
        kicker: 'Tools & Technology',
        heading: 'AI時代の、\n*作り方。*',
        lead: 'このブランドは、AIとの壁打ちから生まれた。使ったツールを、役割とともに。',
        tools: [
          {
            name: 'ChatGPT',
            role: 'コンセプト言語化・ストーリー・タグライン・プロンプト設計・資料構成の壁打ち。とりわけ「曖昧なイメージを、制作可能な要件へ分解する」役割。——「フランスっぽいけど古臭くない」「手描きだけど素人っぽくない」「キャラだけどキャラ商売っぽくしない」「ロゴとして使える抽象度」を、要件に翻訳する。',
          },
          {
            name: 'Midjourney / Stable Diffusion / ComfyUI',
            role: 'ビジュアル探索・キャラクター案・ロゴ方向性・看板娘の雰囲気づくり。参照画像から、構図・服装・世界観を保ったまま生成・反復する。',
          },
          {
            name: 'Photoshop / Illustrator / Figma',
            role: 'AI生成を最終成果物にせず、ロゴ運用・ロックアップ・色・余白・視認性を整える。質感・合成・キービジュアル化まで、人の手で仕上げる。',
          },
        ],
        note: 'AIで作る、ではなく、*AIを混ぜたアートディレクション。* AIは探索エンジン、最終判断と仕上げは人。',
      },

      // ── D. プロセス本編（全10工程・省略しない） ──
      {
        type: 'textBlock',
        kicker: 'Process — 全 10 工程',
        heading: 'ブランドを、\n*高速で試食する。*',
        lead: '曖昧なイメージを、制作可能な要件へ。立ち上げの全工程を、ひとつも削らずに辿ります。',
      },
      {
        type: 'processStep',
        no: '{01}',
        heading: '商店街のコロッケ屋',
        body: [
          'クリームコロッケ専門店として、何を売るブランドかを定義。出店イメージは大阪・梅田。',
          'まずは商店街にあるコロッケ屋を、現代的に見せたらどうなるかという観点で探っていく。',
          '——\n「昔懐かしの」イメージが強すぎて、新しいレシピに挑戦するブランドコンセプトと、ズレているかもしれない。',
        ],
        images: [{ src: mq('01.jpg'), alt: '商店街のコロッケ屋・出店イメージ（梅田）' }],
      },
      {
        type: 'processStep',
        no: '{02}',
        heading: '名前とタグラインの*確定*',
        body: [
          'Mademoiselle Croquette ／ Crisp Out, Cream In。',
          '洋食・フランスの空気・商品特徴（外はサクッ、中はクリーム）を、ブランド名とタグラインに圧縮した。',
          'ブランド名はしっくりと来た。\n古さの払拭と、新しさの探求がまだまだ必要と判断。',
        ],
        images: [{ src: mq('02.jpg'), alt: 'ネーミング・タグライン案' }],
      },
      { type: 'quote', text: '*ストーリーが、*\n足りない。' },
      {
        type: 'processStep',
        no: '{03}',
        heading: 'ブランドストーリーの*構築*',
        body: [
          'フランスで腕を磨いた女性シェフが、日本の洋食文化とクリームコロッケに惹かれ、日本で店を開く——。',
          '物語を与えることで、「商品」から「登場人物のいる店」へと輪郭が変わっていく。',
          'しかし、何かが足りない。表情か、ポーズか、はたまた...。',
        ],
        images: [{ src: mq('03.jpg'), alt: 'ブランドストーリー／ロゴの初期方向性' }],
      },
      {
        type: 'processStep',
        no: '{04}',
        heading: 'ロゴ・キャラクターの*探索*',
        variant: 'logo8',
        body: [
          '少女。表情豊かな横顔。パーマヘア。\n赤いワンピースに白いエプロン。版画調・手描き風で、色数は3色程度。',
          '狙いはあくまで、キャラクター作りではなく "看板娘ロゴ"。',
        ],
        // 04〜11：ロゴロックアップ生成バリエーション群（4列×2行）
        images: [
          { src: mq('04.jpg'), alt: 'ロゴ探索バリエーション1' },
          { src: mq('05.jpg'), alt: 'ロゴ探索バリエーション2' },
          { src: mq('06.jpg'), alt: 'ロゴ探索バリエーション3' },
          { src: mq('07.jpg'), alt: 'ロゴ探索バリエーション4' },
          { src: mq('08.jpg'), alt: 'ロゴ探索バリエーション5' },
          { src: mq('09.jpg'), alt: 'ロゴ探索バリエーション6' },
          { src: mq('10.jpg'), alt: 'ロゴ探索バリエーション7' },
          { src: mq('11.jpg'), alt: 'ロゴ探索バリエーション8' },
        ],
      },
      {
        type: 'processStep',
        no: '{05}',
        heading: '実用性の*検証*',
        body: [
          'ヘッダー／フッターでの視認性、1:1 比率での運用、シンボルを上に店名2行＋タグライン。文字は斜めにしない、小サイズでも潰れない。',
          '"絵" を "システム" へ。どこに置いても成立する強度を確かめた。',
        ],
        // 12〜13：ロゴ運用・ロックアップ・サイズ検証
        images: [
          { src: mq('12.jpg'), alt: 'ロゴ運用ルール・ロックアップ' },
          { src: mq('13.jpg'), alt: 'サイズ・配置検証' },
        ],
      },
      // ── 山場：ステップ6（驚き顔の看板娘）。フルスクリーン＋静かな余白 ──
      {
        type: 'processStep',
        no: '{06}',
        heading: '表情・人格の*発見*',
        climax: true,
        body: [
          '笑顔ではなく——目が合う、少し驚いた表情の看板娘。',
          '「いらっしゃいませ！」ではなく、「え、見つかっちゃった？」。物語のある余白を、ひとつの表情に宿す。',
          '可愛いけど媚びない。上品だけど冷たくない。レトロだけど古くない。',
        ],
        // 22：キャラのバスト（このページ最大の見せ場・大きく1枚）
        images: [{ src: mq('22.jpg'), alt: '驚いた表情の看板娘・決定案' }],
      },
      { type: 'quote', text: '「え、見つかっちゃった？」\n*物語のある、余白。*' },
      {
        type: 'processStep',
        no: '{07}',
        heading: '髪型・服装の*検討*',
        variant: 'styling12',
        body: [
          'ヘアスタイルとユニフォームを考える。',
        ],
        // 23〜34：看板娘の髪型・服装バリエーション12枚（8列＋4列）
        images: [
          { src: mq('23.jpg'), alt: '髪型・服装バリエーション01' },
          { src: mq('24.jpg'), alt: '髪型・服装バリエーション02' },
          { src: mq('25.jpg'), alt: '髪型・服装バリエーション03' },
          { src: mq('26.jpg'), alt: '髪型・服装バリエーション04' },
          { src: mq('27.jpg'), alt: '髪型・服装バリエーション05' },
          { src: mq('28.jpg'), alt: '髪型・服装バリエーション06' },
          { src: mq('29.jpg'), alt: '髪型・服装バリエーション07' },
          { src: mq('30.jpg'), alt: '髪型・服装バリエーション08' },
          { src: mq('31.jpg'), alt: '髪型・服装バリエーション09' },
          { src: mq('32.jpg'), alt: '髪型・服装バリエーション10' },
          { src: mq('33.jpg'), alt: '髪型・服装バリエーション11' },
          { src: mq('34.jpg'), alt: '髪型・服装バリエーション12' },
        ],
      },
      {
        type: 'processStep',
        no: '{08}',
        heading: '実写化キービジュアルの*展開*',
        variant: 'realize',
        body: [
          '看板娘を、リアルな写真風キービジュアルへ。カフェの背景をぼかし、人物にフォーカス。',
          '「ロゴ → キャラクター → 広告ビジュアル → ブランド世界」へと展開していく。',
        ],
        // 2×2・16:9：左上=画像(35) / 右上=動画(36) / 左下=画像(37) / 右下=画像(38)
        images: [
          { src: mq('35.jpg'), alt: '実写風キービジュアル（カフェの看板娘）' },
          { video: mq('36.mp4'), alt: '実写化キービジュアルのモーション' },
          { src: mq('37.jpg'), alt: 'ユニフォーム（エプロン）' },
          { src: mq('38.jpg'), alt: '衣装・スタイリング一式' },
        ],
      },
      {
        type: 'processStep',
        no: '{09}',
        heading: 'ビジュアルトーンの*整理*',
        variant: 'two-portrait', // 14〜15 は縦画像（3:4）なので縦2枚組で
        body: [
          'パリの空気感、クラシックすぎない現代ヨーロッパ。手作りの洋食感。クリーム色・赤・濃紺の少数色。版画調と紙のかすれ。ベタ塗りすぎない、女性的でエレガントなトーン。',
          '日本的なのっぺりは避ける。そして——「記号で殴らない」。エッフェル塔やベレー帽に逃げず、線・色・余白・佇まいで、ヨーロッパを感じさせる。',
        ],
        // 14〜15：ビジュアルトーンの参照・配色・質感サンプル
        images: [
          { src: mq('14.jpg'), alt: 'ビジュアルトーン参照1' },
          { src: mq('15.jpg'), alt: 'ビジュアルトーン参照2' },
        ],
      },
      // breather（トーンボードのグリッド）
      {
        type: 'imageGrid',
        // 16〜19：トーンボード（ロゴロックアップで色・質感・佇まいを4枚）
        images: [
          { src: mq('16.jpg'), alt: 'トーンボード1' },
          { src: mq('17.jpg'), alt: 'トーンボード2' },
          { src: mq('18.jpg'), alt: 'トーンボード3' },
          { src: mq('19.jpg'), alt: 'トーンボード4' },
        ],
        caption: 'Tone board — 記号で殴らない、ヨーロッパの佇まい。',
      },
      {
        type: 'processStep',
        no: '{10}',
        heading: '資料化と*プレゼン*',
        variant: 'two-portrait', // 20〜21 は縦画像（3:4）なので縦2枚組で
        body: [
          'ブランドの人格・世界観・ビジュアル方向性・展開可能性までを、短期間（約2日 ※要確認）で見える資料に。',
          '洋輔さんへ提案し、一発で方向性が確定した。',
          // ※要確認: 「この資料だけで100万円の価値」と評された、という逸話あり。誇張に見えないよう本文では触れていない。
        ],
        // 20〜21：提案資料・ブランドブックの抜粋
        images: [
          { src: mq('20.jpg'), alt: '提案資料1' },
          { src: mq('21.jpg'), alt: '提案資料2' },
        ],
      },

      // ── E. このプロジェクトの本質 ──
      {
        type: 'textBlock',
        kicker: 'The Point',
        heading: 'AIで絵を出した、\nのではない。',
        body: [
          '本質は、AIを使って "ブランドの可能性を高速に試食した" こと。',
          'どんな人格なら記憶に残るか。どんな線ならロゴになるか。どんな表情なら独自性が出るか。どんな物語ならブランド名と商品がつながるか。どんなビジュアルなら、店舗・パッケージ・SNS に展開できるか——。壁打ちしながら、何度も確かめた。',
          '洋輔の事業構想に、天真の AI・デザイン・言語化・アートディレクションを掛け合わせ、短期間で "これはいける" と感じられるブランドの芯をつくった。',
        ],
      },
      { type: 'quote', text: '商品ブランドではなく、\n*物語をまとった飲食ブランド*へ。' },
    ],
  },
  picsumProject(5, 'NEW CAFÉ', ['NEW', 'CAFÉ'], 'F&B / CAFÉ', '新カフェ業態 — 仮'),
  picsumProject(6, 'RETAIL POP-UP', ['RETAIL', 'POP-UP'], 'RETAIL / SPACE', 'ポップアップ — 仮'),
  picsumProject(7, 'DRINK BRAND', ['DRINK', 'BRAND'], 'F&B / PRODUCT', 'ドリンクブランド — 仮'),
  picsumProject(8, 'EVENT SERIES', ['EVENT', 'SERIES'], 'CULTURE / EVENT', 'イベントシリーズ — 仮'),
  picsumProject(9, 'STUDIO PROJECT', ['STUDIO', 'PROJECT'], 'BRAND / SYSTEM', 'スタジオ案件 — 仮'),
];

export const projects: Project[] = [...realProjects, ...placeholderProjects].sort((a, b) => a.order - b.order);

// トップに出す注目実績。順序を slug で明示（YORKYS BRUNCH → MADEMOISELLE CROQUETTE の2件）。
const FEATURED_SLUGS = ['yorkys-brunch', 'mademoiselle-croquette'] as const;
export const FEATURED: Project[] = FEATURED_SLUGS
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is Project => Boolean(p));

export const getProject = (slug: string): Project | undefined => projects.find((p) => p.slug === slug);
export const getAllSlugs = (): string[] => projects.map((p) => p.slug);

export function getAdjacent(slug: string): { prev: Project; next: Project } {
  const i = projects.findIndex((p) => p.slug === slug);
  const len = projects.length;
  const prev = projects[(i - 1 + len) % len];
  const next = projects[(i + 1) % len];
  return { prev, next };
}
