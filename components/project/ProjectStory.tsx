import SmartImage from '../SmartImage';
import { accentize } from './accentize';
import type { ProjectBlock } from '@/lib/projects';

// ストーリー本体。ProjectBlock の type ごとにレイアウトを変え、密度の緩急を作る。
// reveal は layout の RevealObserver が .reveal を駆動（server で完結）。動きは CSS ken-burns。
export default function ProjectStory({ story }: { story: ProjectBlock[] }) {
  return (
    <div className="pcase__story">
      {story.map((b, i) => (
        <StoryBlock key={i} b={b} />
      ))}
    </div>
  );
}

function StoryBlock({ b }: { b: ProjectBlock }) {
  switch (b.type) {
    case 'textBlock':
      return (
        <section className="story-text">
          {b.kicker && <div className="story-text__kicker reveal">{b.kicker}</div>}
          {b.heading && (
            <h2 className="story-text__h reveal" style={{ transitionDelay: '.05s' }}>
              {accentize(b.heading)}
            </h2>
          )}
          {b.lead && (
            <p className="story-text__lead reveal" style={{ transitionDelay: '.1s' }}>
              {b.lead}
            </p>
          )}
          {b.body && (
            <div className="story-text__body">
              {b.body.map((p, pi) => (
                <p key={pi} className="reveal" style={{ transitionDelay: `${0.12 + pi * 0.06}s` }}>
                  {p}
                </p>
              ))}
            </div>
          )}
        </section>
      );

    case 'fullImage':
      return (
        <figure className="story-full kenburns reveal">
          <div className="story-full__img">
            <SmartImage src={b.src} alt={b.alt} fill sizes="100vw" style={{ objectFit: 'cover' }} />
          </div>
          {b.caption && <figcaption className="story-full__cap">{b.caption}</figcaption>}
        </figure>
      );

    case 'splitImageText':
      return (
        <section className={`story-split story-split--${b.side}`}>
          <div className="story-split__media kenburns reveal">
            <SmartImage src={b.src} alt={b.alt} fill sizes="(max-width: 880px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
          </div>
          <div className="story-split__text">
            {b.heading && <h3 className="story-split__h reveal">{accentize(b.heading)}</h3>}
            <p className="story-split__body reveal" style={{ transitionDelay: '.08s' }}>
              {b.body}
            </p>
          </div>
        </section>
      );

    case 'imagePair':
      return (
        <section className="story-pair">
          <figure className="story-pair__a kenburns reveal">
            <SmartImage src={b.left.src} alt={b.left.alt} fill sizes="(max-width: 880px) 100vw, 55vw" style={{ objectFit: 'cover' }} />
          </figure>
          <figure className="story-pair__b kenburns reveal" style={{ transitionDelay: '.1s' }}>
            <SmartImage src={b.right.src} alt={b.right.alt} fill sizes="(max-width: 880px) 100vw, 35vw" style={{ objectFit: 'cover' }} />
          </figure>
        </section>
      );

    case 'quote':
      return (
        <section className="story-quote">
          <p className="reveal">{accentize(b.text)}</p>
        </section>
      );

    case 'toolList':
      return (
        <section className="story-tools">
          {b.kicker && <div className="story-text__kicker reveal">{b.kicker}</div>}
          {b.heading && (
            <h2 className="story-text__h reveal" style={{ transitionDelay: '.05s' }}>
              {accentize(b.heading)}
            </h2>
          )}
          {b.lead && (
            <p className="story-text__lead reveal" style={{ transitionDelay: '.1s' }}>
              {b.lead}
            </p>
          )}
          <div className="story-tools__list">
            {b.tools.map((t, i) => (
              <article className="tool reveal" key={t.name} style={{ transitionDelay: `${0.12 + i * 0.06}s` }}>
                <div className="tool__name">{t.name}</div>
                <p className="tool__role">{t.role}</p>
              </article>
            ))}
          </div>
          {b.note && <p className="story-tools__note reveal">{accentize(b.note)}</p>}
        </section>
      );

    case 'processStep': {
      const len = b.images?.length ?? 0;
      // variant 明示があれば優先、無ければ枚数で one/two/grid（climax は別扱い）
      const mediaVariant = b.variant ?? (b.climax ? 'climax' : len === 1 ? 'one' : len === 2 ? 'two' : 'grid');
      return (
        <section className={`story-step${b.climax ? ' story-step--climax' : ''}`}>
          <div className="story-step__head">
            <div className="story-step__no reveal">{b.no}</div>
            <div className="story-step__textwrap">
              <h3 className="story-step__h reveal" style={{ transitionDelay: '.05s' }}>
                {accentize(b.heading)}
              </h3>
              <div className="story-step__body">
                {b.body.map((p, i) => (
                  <p key={i} className="reveal" style={{ transitionDelay: `${0.1 + i * 0.06}s` }}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
          {b.images && b.images.length > 0 && (
            <div className={`story-step__media story-step__media--${mediaVariant}`}>
              {b.images.map((img, i) => (
                <figure key={i} className="kenburns reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                  {img.video ? (
                    <video src={img.video} autoPlay loop muted playsInline aria-label={img.alt} />
                  ) : img.src ? (
                    <SmartImage src={img.src} alt={img.alt} fill sizes="(max-width: 880px) 100vw, 40vw" style={{ objectFit: 'cover' }} />
                  ) : null}
                </figure>
              ))}
            </div>
          )}
        </section>
      );
    }

    case 'imageGrid':
      return (
        <section className="story-grid">
          <div className={`story-grid__inner story-grid__inner--${Math.min(b.images.length, 4)}`}>
            {b.images.map((img, i) => (
              <figure key={i} className="kenburns reveal" style={{ transitionDelay: `${i * 0.07}s` }}>
                <SmartImage src={img.src} alt={img.alt} fill sizes="(max-width: 880px) 50vw, 30vw" style={{ objectFit: 'cover' }} />
              </figure>
            ))}
          </div>
          {b.caption && <div className="story-grid__cap reveal">{b.caption}</div>}
        </section>
      );

    case 'frameSequence':
      return (
        <section className="story-frames">
          {b.kicker && <div className="story-text__kicker reveal">{b.kicker}</div>}
          {b.heading && (
            <h3 className="story-frames__h reveal" style={{ transitionDelay: '.05s' }}>
              {accentize(b.heading)}
            </h3>
          )}
          {b.body && (
            <div className="story-frames__body">
              {b.body.map((p, i) => (
                <p key={i} className="reveal" style={{ transitionDelay: `${0.1 + i * 0.06}s` }}>
                  {p}
                </p>
              ))}
            </div>
          )}
          {/* 横スクロールのフィルムストリップ（1コマずつ）。picked=丸印の有力候補は強調。 */}
          <div className="story-frames__strip reveal">
            {b.frames.map((f, i) => (
              <figure key={i} className={`story-frames__cell${f.picked ? ' is-picked' : ''}`}>
                {f.src ? (
                  <SmartImage src={f.src} alt={f.alt} fill sizes="(max-width: 880px) 40vw, 220px" style={{ objectFit: 'cover' }} />
                ) : null}
              </figure>
            ))}
          </div>
          {b.caption && <div className="story-frames__cap reveal">{b.caption}</div>}
        </section>
      );

    default:
      return null;
  }
}
