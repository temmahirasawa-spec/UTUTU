import Image from 'next/image';
import { HERO_IMAGE } from '@/lib/images';

// Hero（写真 + UTUTUマーク）。sticky 220vh。英主・日従。
export default function Hero() {
  return (
    <section className="hero-stage" id="heroStage">
      <div className="hero-sticky">
        <div className="hero-image" id="heroImage">
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="hero-content" id="heroContent">
          <div className="hero-content__left">
            <h1 className="hero-h1">
              We design it.
              <br />
              We make it <span className="v">work.</span>
            </h1>
            <p className="hero-jp">つくる。そして、機能させる。</p>
            <div className="hero-sub">Brand × AI Creative Studio</div>
          </div>
          <div className="hero-content__right">
            <p className="hero-locations">
              KOBE
              <br />
              OSAKA
              <br />
              NAGOYA
              <br />
              TOKYO
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
