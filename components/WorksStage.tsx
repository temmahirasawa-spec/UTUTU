import Image from 'next/image';
import { WORKS_GALLERY } from '@/lib/images';
import CurrentYear from './CurrentYear';

// Works Stage — 6画像の非対称 rise。sticky 240vh。各画像は stagger 0.07 で translateY(130vh → 0)。
export default function WorksStage() {
  return (
    <section className="works-stage" id="worksStage">
      <div className="works-sticky">
        <div className="works-stage__head">
          <div className="eyebrow">Selected Brands</div>
          <div className="sublabel">brands we built · 2014–<CurrentYear initialYear={new Date().getFullYear()} /></div>
        </div>

        <h2 className="works-stage__title">
          <span className="en">
            The brands
            <br />
            we <span className="v">built.</span>
          </span>
          <span className="jp">私たちが育てた、ブランドたち。</span>
        </h2>

        {WORKS_GALLERY.map((img, i) => (
          <div key={i} className={`ws-img ws-img--${i + 1}`}>
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="30vw"
              placeholder="blur"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
