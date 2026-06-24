import Link from 'next/link';

// Achievement — KPI 4指標パネル（数値はすべて仮）。count-up は RevealObserver が [data-to] を駆動。
const SNAPSHOT = [
  { cap: 'Brands Launched', to: 8, unit: '+', sub: '飲食・サービス領域でローンチ／リブランド' },
  { cap: 'YoY Growth', to: 128, unit: '%', sub: '主要ブランドの前年比 売上成長 ※仮' },
  { cap: 'Stores Opened', to: 12, unit: '+', sub: '出店・運営支援した店舗数' },
  { cap: 'Reach', to: 36, unit: 'k', sub: 'クリエイティブのSNS到達' },
];

export default function Achievement() {
  return (
    <section className="ach">
      <div className="ach__head">
        <div>
          <div className="eyebrow reveal">Our Achievement</div>
          <div className="sublabel reveal">metrics &amp; milestones</div>
          <h2 className="ach__h2 reveal" style={{ transitionDelay: '.08s' }}>
            Behind every <span className="v">number,</span>
            <br />a brand we shaped.
            <span className="jp">数字の裏側にも、必ず一つのブランドがある。</span>
          </h2>
        </div>
        <p className="ach__lead reveal" style={{ transitionDelay: '.16s' }}>
          Every statistic is the trace of a brand at work — store visits, revenue, openings, reach.
          <span className="jp">
            ブランドが&quot;動いた&quot;ことを、数字で示します。来店数・売上成長・出店数・SNS到達——どれも、誰かの一日を変えた跡。
          </span>
        </p>
      </div>

      <div className="snapshot reveal">
        {SNAPSHOT.map((s) => (
          <div className="snap__item" key={s.cap}>
            <div className="snap__cap">{s.cap}</div>
            <div className="snap__num">
              <span data-to={s.to}>0</span>
              <span className="u">{s.unit}</span>
            </div>
            <div className="snap__sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <Link className="ach__link reveal" href="/business">
        View business cases →
      </Link>
    </section>
  );
}
