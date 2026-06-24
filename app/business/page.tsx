import type { Metadata } from 'next';
import Link from 'next/link';
import { BUSINESS_CASES } from '@/lib/business-cases';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Business Cases — UTUTU',
  description:
    '洋輔の戦略・KPIケース。立ち上げ、フランチャイズ成長、グループブランドシステム。数値はすべて仮。',
};

export default function BusinessPage() {
  return (
    <>
      <Link className="backlink" href="/">← UTUTU</Link>

      <main className="biz">
        <div className="biz__head">
          <h1 className="biz__title">
            Numbers, and the <span className="v">brands</span> behind them.
            <span className="jp">事業の手ざわりを、数字と言葉で。</span>
          </h1>
          <p className="biz__lead">
            洋輔がリードした事業・営業の視点から、ブランドが&quot;動いた&quot;ケースをまとめています。コンセプト設計から出店・FC展開・グループ戦略まで。
            <br />
            ※掲載の数値はすべて仮（placeholder）です。
          </p>
        </div>

        <div className="biz__cases">
          {BUSINESS_CASES.map((c) => (
            <article className="bizcase" key={c.no}>
              <div className="bizcase__no">{c.no}</div>
              <div>
                <h2 className="bizcase__name">{c.name}</h2>
                <p className="bizcase__jp">{c.jp}</p>
                <p className="bizcase__desc">{c.desc}</p>
                <div className="bizcase__kpis">
                  {c.kpis.map((k) => (
                    <div className="bizcase__kpi" key={k.cap}>
                      <div className="num">
                        {k.num}
                        {k.unit && <span className="u">{k.unit}</span>}
                      </div>
                      <div className="cap">{k.cap}</div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
