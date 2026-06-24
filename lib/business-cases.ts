// 洋輔さんの戦略・KPIケース（数値はすべて仮 ※placeholder）。
// 記載順は常に 洋輔 → 天真 の思想を踏襲し、事業/営業視点を主に。
export type Kpi = { num: string; unit?: string; cap: string };

export type BusinessCase = {
  no: string;
  name: string;
  jp: string;
  desc: string;
  kpis: Kpi[];
};

export const BUSINESS_CASES: BusinessCase[] = [
  {
    no: '{01}',
    name: 'YORKYS BRUNCH — Launch & Operations',
    jp: '新業態の立ち上げと、回る現場づくり',
    desc: 'コンセプト設計から出店、オペレーション、モバイルオーダー導入まで。客単価とリピート率を軸に、現場が無理なく回る仕組みを設計しました。',
    kpis: [
      { num: '128', unit: '%', cap: 'YoY 売上成長 ※仮' },
      { num: '42', unit: '%', cap: 'リピート率 ※仮' },
      { num: '3', unit: '+', cap: '出店・支援店舗 ※仮' },
    ],
  },
  {
    no: '{02}',
    name: 'YORKYS Creperie — Franchise Growth',
    jp: 'FCで増やす、ブレないブランド',
    desc: 'フランチャイズ展開の設計。出店パッケージ・ブランドガイドライン・LP を整備し、加盟店が増えても一目で「らしさ」が伝わる状態を担保しました。',
    kpis: [
      { num: '8', unit: '+', cap: 'FC・関連店舗 ※仮' },
      { num: '2.1', unit: '×', cap: '問い合わせ増 ※仮' },
      { num: '36', unit: 'k', cap: 'SNS到達 ※仮' },
    ],
  },
  {
    no: '{03}',
    name: 'YORKYS Entertainment — Brand System',
    jp: '多業態を束ねる、グループ戦略',
    desc: '複数ブランドを束ねるアンブレラ構造の設計。各店の個性を保ちながら、グループとしての認知と送客を最大化する仕組みを作りました。',
    kpis: [
      { num: '12', unit: '+', cap: '運営・支援店舗 ※仮' },
      { num: '5', unit: '+', cap: '束ねたブランド ※仮' },
      { num: '118', unit: '%', cap: 'グループ送客 ※仮' },
    ],
  },
];
