import type { StaticImageData } from 'next/image';
import { IMG } from './images';
import fromaNaikan from '@/public/images/brands/froma/naikan.jpg';

// ── 実績（projects）= /projects 一覧 と /projects/[slug] 詳細 の単一データソース ──
// トップの注目3件（FEATURED）= YORKYS BRUNCH / PIECE OF BAKE / FROMA。背景は動画 or 画像。
// 見出し文字列の規約（描画側 accentize で解釈）: '\n' → <br>、 '*word*' → <span class="v">word</span>

export type Img = StaticImageData | string;

export type ProjectBlock =
  | { type: 'fullImage'; src: Img; alt: string; caption?: string }
  | { type: 'splitImageText'; src: Img; alt: string; side: 'left' | 'right'; heading?: string; body: string }
  | { type: 'textBlock'; kicker?: string; heading?: string; lead?: string; body?: string[] }
  | { type: 'imagePair'; left: { src: Img; alt: string }; right: { src: Img; alt: string } }
  | { type: 'quote'; text: string }
  // ── 長尺ドキュメンタリー用（mademoiselle 等）。既存型はそのまま＝後方互換 ──
  | { type: 'toolList'; kicker?: string; heading?: string; lead?: string; tools: { name: string; role: string }[]; note?: string }
  | { type: 'processStep'; no: string; heading: string; body: string[]; images?: { src: Img; alt: string }[]; climax?: boolean }
  | { type: 'imageGrid'; images: { src: Img; alt: string }[]; caption?: string };

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
        'サーフィン好きのオーナーが、オーストラリアで体感した“ブランチ”という朝の豊かさを関西へ。2014年、兵庫・夙川に生まれた YORKYS の原点です。※開業年・場所は要確認。私たちはその“朝の時間”を、ロゴ・店舗グラフィック・Web・モバイルオーダーまで、ひとつのブランド体験へと翻訳しました。',
      date: '2014〜 ※要確認',
      industry: '飲食 / ブランチ・カフェ',
      // TODO: 実際の担当範囲に修正
      role: ['ブランド戦略', 'ロゴ・VI', 'アートディレクション', 'サイン計画'],
      // TODO: 実際の納品物に修正
      deliverables: ['ロゴ・VI', '店舗グラフィック', 'Web', 'モバイルオーダー', 'メニュー'],
    },
    story: [
      {
        type: 'textBlock',
        kicker: 'Origin',
        heading: '朝を、\n*目的地*にする。',
        lead: 'サーフィンの後に食べる朝食のように——一日でいちばん豊かな時間を、外食の体験として。',
        body: [
          'YORKYS BRUNCH は、オーナーがオーストラリアで出会った“ブランチ”の文化を関西へ持ち帰り、2014年に夙川で生まれた YORKYS の原点。※開業年は要確認',
          '私たちの仕事は、その“朝の豊かさ”を、ロゴ・空間・グラフィック・モバイルオーダーまで、ひとつのブランド体験へ翻訳することでした。',
        ],
      },
      { type: 'fullImage', src: IMG.brunchHero, alt: 'YORKYS BRUNCH の明るい店内、朝の光', caption: '夙川カトリック教会を望む、朝の光に満ちた店内。※ロケーションは要確認' },
      {
        type: 'splitImageText',
        src: IMG.brunchExterior,
        alt: 'YORKYS BRUNCH のファサードとサイン',
        side: 'right',
        heading: '看板は、\n*遠く*から読ませる。',
        body: '通りの向こうからでも「ここだ」と分かるように。ロゴとサインは、近づくほど親しみが増すトーンで。視認する距離と角度まで合わせて整えました。',
      },
      {
        type: 'textBlock',
        kicker: 'Signature',
        heading: 'ふわふわの、\n*理由*。',
        body: [
          '看板は、リコッタチーズを練り込んだスフレ系のふわふわパンケーキ。エッグベネディクトやフレンチトースト、夜にはワインも。',
          '朝から夜まで“ちょっとだけリッチ”を貫く一皿を、ブランドの中心に据えました。',
        ],
      },
      {
        type: 'imagePair',
        left: { src: IMG.brunchCup, alt: 'YORKYS BRUNCH のドリンクカップ' },
        right: { src: IMG.brunchFrontKv, alt: 'YORKYS BRUNCH 木彫りロゴの入口' },
      },
      { type: 'quote', text: '休日の朝、いつもより少し遅く起きて。\nその一皿が、*いい一日*の合図になる。' },
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
const px = (seed: string, w = 1600, h = 1000) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

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
  // 画像はすべてダミー（picsum）。本番画像の配置先 →
  //   public/images/brands/mademoiselle-croquette/<step>/  （例 01-business, 06-expression …）
  //   各 step の想定内容は各ブロックの // TODO コメント参照。ファイル名は後で確定。
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
    // TODO: replace → public/images/brands/mademoiselle-croquette/00-hero/ （看板娘キービジュアル / フルブリードKV）
    hero: { src: px('mq-hero', 2000, 1300), alt: 'Mademoiselle Croquette のキービジュアル（ダミー）' },
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

      // ── D. プロセス本編（全9工程・省略しない） ──
      {
        type: 'textBlock',
        kicker: 'Process — 全 9 工程',
        heading: 'ブランドを、\n*高速で試食する。*',
        lead: '曖昧なイメージを、制作可能な要件へ。立ち上げの全工程を、ひとつも削らずに辿ります。',
      },
      {
        type: 'processStep',
        no: '{01}',
        heading: '業態の*整理*',
        body: [
          'クリームコロッケ専門店として、何を売るブランドかを定義。出店イメージは大阪・梅田のカッパ横丁。',
          '最初に置いた前提は、ただひとつ——「ただの揚げ物屋にしない」。',
        ],
        // TODO: replace → 01-business/ （業態整理のムードボード・出店イメージ・カッパ横丁の空気）
        images: [{ src: px('mq-01', 1600, 1100), alt: '業態整理のイメージ（ダミー）' }],
      },
      {
        type: 'processStep',
        no: '{02}',
        heading: '名前とタグラインの*確定*',
        body: [
          'Mademoiselle Croquette ／ Crisp Out, Cream In。',
          '洋食・フランスの空気・商品特徴（外はサクッ、中はクリーム）を、ブランド名とタグラインに圧縮した。',
        ],
        // TODO: replace → 02-name/ （ネーミング/タグライン案・ロゴタイプ初期）
        images: [{ src: px('mq-02', 1600, 1100), alt: 'ネーミング・タグライン案（ダミー）' }],
      },
      { type: 'quote', text: 'ただの揚げ物屋には、\n*しない。*' },
      {
        type: 'processStep',
        no: '{03}',
        heading: 'ブランドストーリーの*構築*',
        body: [
          'フランスで腕を磨いた女性シェフが、日本の洋食文化とクリームコロッケに惹かれ、日本で店を開く——。',
          '物語を与えることで、「商品」から「登場人物のいる店」へと輪郭が変わっていく。',
        ],
        // TODO: replace → 03-story/ （ストーリーボード・シェフ設定画・世界観ラフ）
        images: [{ src: px('mq-03', 1600, 1100), alt: 'ブランドストーリーのイメージ（ダミー）' }],
      },
      {
        type: 'processStep',
        no: '{04}',
        heading: 'ロゴ・キャラクターの*探索*',
        body: [
          '少女の横顔／全身シルエット／料理する姿。赤いワンピースに白いエプロン、濃紺の髪。版画調・手描き風で、色数は3色程度。',
          '抽象化しすぎず、1色刷りでも成立し、細い線は避ける。狙いは、マスコットではなく "看板娘ロゴ"。',
        ],
        // TODO: replace → 04-logo/ （ロゴ・看板娘の生成バリエーション群。4枚以上のグリッド想定）
        images: [
          { src: px('mq-04a', 1200, 1500), alt: 'ロゴ探索バリエーション1（ダミー）' },
          { src: px('mq-04b', 1200, 1500), alt: 'ロゴ探索バリエーション2（ダミー）' },
          { src: px('mq-04c', 1200, 1500), alt: 'ロゴ探索バリエーション3（ダミー）' },
          { src: px('mq-04d', 1200, 1500), alt: 'ロゴ探索バリエーション4（ダミー）' },
        ],
      },
      // breather（フルスクリーン画像で"間"）
      // TODO: replace → 04-logo/ （採用方向のロゴを大きく1枚）
      { type: 'fullImage', src: px('mq-04-hero', 2200, 1240), alt: 'ロゴ方向性のキービジュアル（ダミー）', caption: 'From sketch to system — 看板娘ロゴの方向性。' },
      {
        type: 'processStep',
        no: '{05}',
        heading: '実用性の*検証*',
        body: [
          'ヘッダー／フッターでの視認性、1:1 比率での運用、シンボルを上に店名2行＋タグライン。文字は斜めにしない、小サイズでも潰れない。',
          '"絵" を "システム" へ。どこに置いても成立する強度を確かめた。',
        ],
        // TODO: replace → 05-system/ （ロゴ運用・ロックアップ・サイズ検証・配置ルール）
        images: [
          { src: px('mq-05a', 1500, 1100), alt: 'ロゴ運用ルール（ダミー）' },
          { src: px('mq-05b', 1500, 1100), alt: 'サイズ・配置検証（ダミー）' },
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
        // TODO: replace → 06-expression/ （"驚き顔" 決定案。このページ最大の見せ場・大きく1枚）
        images: [{ src: px('mq-06', 2200, 1380), alt: '驚いた表情の看板娘・決定案（ダミー）' }],
      },
      { type: 'quote', text: '「え、見つかっちゃった？」\n*物語のある、余白。*' },
      {
        type: 'processStep',
        no: '{07}',
        heading: '髪型・服装・実写化の*検討*',
        body: [
          'パーマヘア／赤いバンダナ／赤チェックのシャツ／白エプロン／青いスカートやジーンズ。三角巾バージョンは特に反応が良かった。',
          'さらに看板娘を、リアルな写真風キービジュアルへ（カフェの背景をぼかし、人物にフォーカス）。「ロゴ → キャラクター → 広告ビジュアル → ブランド世界」へと展開していく。',
        ],
        // TODO: replace → 07-styling/ （髪型・服装バリエーション、三角巾版、実写風KV。3枚以上のグリッド想定）
        images: [
          { src: px('mq-07a', 1200, 1500), alt: '服装バリエーション1（ダミー）' },
          { src: px('mq-07b', 1200, 1500), alt: '三角巾バージョン（ダミー）' },
          { src: px('mq-07c', 1200, 1500), alt: '実写風キービジュアル（ダミー）' },
        ],
      },
      {
        type: 'processStep',
        no: '{08}',
        heading: 'ビジュアルトーンの*整理*',
        body: [
          'パリの空気感、クラシックすぎない現代ヨーロッパ。手作りの洋食感。クリーム色・赤・濃紺の少数色。版画調と紙のかすれ。ベタ塗りすぎない、女性的でエレガントなトーン。',
          '日本的なのっぺりは避ける。そして——「記号で殴らない」。エッフェル塔やベレー帽に逃げず、線・色・余白・佇まいで、ヨーロッパを感じさせる。',
        ],
        // TODO: replace → 08-tone/ （ビジュアルトーンの参照・配色・質感サンプル）
        images: [
          { src: px('mq-08a', 1500, 1100), alt: 'ビジュアルトーン参照1（ダミー）' },
          { src: px('mq-08b', 1500, 1100), alt: 'ビジュアルトーン参照2（ダミー）' },
        ],
      },
      // breather（トーンボードのグリッド）
      // TODO: replace → 08-tone/ （トーンボード。色・質感・モチーフを4枚程度で）
      {
        type: 'imageGrid',
        images: [
          { src: px('mq-tone-a', 1000, 1300), alt: 'トーンボード1（ダミー）' },
          { src: px('mq-tone-b', 1000, 1300), alt: 'トーンボード2（ダミー）' },
          { src: px('mq-tone-c', 1000, 1300), alt: 'トーンボード3（ダミー）' },
          { src: px('mq-tone-d', 1000, 1300), alt: 'トーンボード4（ダミー）' },
        ],
        caption: 'Tone board — 記号で殴らない、ヨーロッパの佇まい。',
      },
      {
        type: 'processStep',
        no: '{09}',
        heading: '資料化と*プレゼン*',
        body: [
          'ブランドの人格・世界観・ビジュアル方向性・展開可能性までを、短期間（約2日 ※要確認）で見える資料に。',
          '洋輔さんへ提案し、一発で方向性が確定した。',
          // ※要確認: 「この資料だけで100万円の価値」と評された、という逸話あり。誇張に見えないよう本文では触れていない。
        ],
        // TODO: replace → 09-deck/ （提案資料のページ・ブランドブックの抜粋）
        images: [
          { src: px('mq-09a', 1600, 1100), alt: '提案資料1（ダミー）' },
          { src: px('mq-09b', 1600, 1100), alt: '提案資料2（ダミー）' },
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

// トップに出す実績（注目3件 = BRUNCH / PIECE OF BAKE / FROMA）
export const FEATURED: Project[] = projects.filter((p) => !p.placeholder).slice(0, 3);

export const getProject = (slug: string): Project | undefined => projects.find((p) => p.slug === slug);
export const getAllSlugs = (): string[] => projects.map((p) => p.slug);

export function getAdjacent(slug: string): { prev: Project; next: Project } {
  const i = projects.findIndex((p) => p.slug === slug);
  const len = projects.length;
  const prev = projects[(i - 1 + len) % len];
  const next = projects[(i + 1) % len];
  return { prev, next };
}
