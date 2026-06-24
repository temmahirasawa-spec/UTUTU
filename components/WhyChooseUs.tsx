import Image from 'next/image';
import Link from 'next/link';
import { WHY_HERO_IMAGE } from '@/lib/images';

// Why Choose Us — bento ×4。large card は人の手・温度を感じる商品ショット。
export default function WhyChooseUs() {
  return (
    <section className="why">
      <div className="why__head">
        <div className="left">
          <div className="eyebrow reveal">Why Choose Us</div>
          <div className="sublabel reveal">benefits</div>
        </div>
        <h2 className="reveal" style={{ transitionDelay: '.08s' }}>
          Partnership, not <span className="v">just projects.</span>
          <span className="jp">単発の制作ではなく、長く伴走するパートナーへ。</span>
        </h2>
      </div>

      <div className="bento">
        {/* hero card with image */}
        <div className="bcard bcard--hero reveal">
          <Image
            className="bcard--hero__img"
            src={WHY_HERO_IMAGE}
            alt="YORKYS Creperie のクレープを手にする様子"
            fill
            sizes="(max-width: 880px) 100vw, 50vw"
            placeholder="blur"
            style={{ objectFit: 'cover' }}
          />
          <div className="bcard--hero__overlay" />
          <div className="bcard--hero__body">
            <div className="bcard__no">○ 01 — Decorative × Functional</div>
            <h3 className="bcard__h">
              装飾の美しさと、
              <br />
              機能の<span className="v">美しさ</span>。
            </h3>
            <p className="bcard__p">
              グラフィック出自の&quot;装飾美&quot;と、UI/UX出自の&quot;機能美&quot;を、ひとつのブランドに織り込む。両方できることが、私たちの差別化。
            </p>
          </div>
        </div>

        {/* card 2 */}
        <div className="bcard bcard--2 reveal" style={{ transitionDelay: '.06s' }}>
          <div className="bcard__no">○ 02 — AI-augmented Craft</div>
          <h3 className="bcard__h">
            AIで、
            <br />
            速度 × 質。
          </h3>
          <p className="bcard__p">
            &quot;良い&quot;が量産される時代の、速度と質を両立。画像生成とプロンプト設計を制作フローに統合。
          </p>
        </div>

        {/* card 3 — big number */}
        <div className="bcard bcard--3 reveal" style={{ transitionDelay: '.12s' }}>
          <div className="bcard__no">○ 03 — F&amp;B Specialty</div>
          <h3 className="bcard__h">
            飲食・ライフスタイル
            <br />
            に強い。
          </h3>
          <div className="bcard__big" style={{ marginTop: 'auto' }}>
            <span data-to={8}>0</span>
            <span className="u">+</span>
          </div>
          <p className="bcard__p" style={{ fontSize: '12px' }}>
            プロデュース実績ブランド
          </p>
        </div>

        {/* card 4 — wide */}
        <div className="bcard bcard--4 reveal" style={{ transitionDelay: '.18s' }}>
          <div className="bcard__no">○ 04 — Direct, Senior Team</div>
          <h3 className="bcard__h">
            中間レイヤーなし。
            <br />
            シニアと、<span className="v">直接やりとり。</span>
          </h3>
          <p className="bcard__p">
            採用に悩まず、強いクリエイティブチームを手の届く距離に。意思決定から納品まで、最短経路で進めます。
          </p>
        </div>
      </div>

      <div className="why__cta">
        <span className="label">Ready to start?</span>
        <Link className="cta-btn" href="/projects">
          View our work →
        </Link>
        <a className="cta-btn" href="mailto:hello@ututu.studio">
          Get in touch →
        </a>
      </div>
    </section>
  );
}
