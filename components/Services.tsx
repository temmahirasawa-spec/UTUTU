// What We Do — {01}{02}{03}。light act。
const SERVICES = [
  {
    no: '{01}',
    name: 'Branding',
    jp: 'ブランディング',
    desc: '戦略・アイデンティティ・ガイドライン。意味のあるブランド体験を設計し、長く愛される関係をつくる。',
    tags: ['Brand Strategy', 'Identity', 'Visual System', 'Art Direction', 'Naming', 'Guidelines'],
  },
  {
    no: '{02}',
    name: 'Digital & Web',
    jp: 'デジタル・ウェブ',
    desc: '体験としてのWeb・LP。設計から実装まで一貫して、ビジネスのKPIに効く導線をつくる。',
    tags: ['UX/UI', 'Website', 'LP', 'Motion', 'CMS', 'Analytics'],
  },
  {
    no: '{03}',
    name: 'AI Creative',
    jp: 'AIクリエイティブ',
    desc: '画像生成とプロンプト設計を制作フローへ。"良い"が量産される時代に、速度と質を両立させる。',
    tags: ['Image Generation', 'Prompt Design', 'Workflow Integration', 'Asset Pipeline'],
  },
];

export default function Services() {
  return (
    <section className="services">
      <div className="services__head">
        <div className="left">
          <div className="eyebrow reveal">What We Do</div>
          <div className="sublabel reveal">services &amp; value</div>
        </div>
        <h2 className="reveal" style={{ transitionDelay: '.08s' }}>
          The beauty of decoration,
          <br />
          and the beauty of <span className="v">function.</span>
          <span className="jp">装飾の美しさと、機能の美しさ。</span>
        </h2>
      </div>

      {SERVICES.map((s) => (
        <article className="svc reveal" key={s.no}>
          <div className="svc__no">{s.no}</div>
          <div>
            <h3 className="svc__name">{s.name}</h3>
            <p className="svc__jp">{s.jp}</p>
            <p className="svc__desc">{s.desc}</p>
          </div>
          <div className="svc__right">
            <div className="svc__tags">
              {s.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
