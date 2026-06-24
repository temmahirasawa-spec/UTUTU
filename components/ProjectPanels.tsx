import Link from 'next/link';
import SmartImage from './SmartImage';
import CoverVideo from './CoverVideo';
import type { Project } from '@/lib/projects';

// 実績パネル（sticky stacking）。トップと /projects で共通使用（実装を二重化しない）。
// パネル全体が /projects/[slug] へのリンク。ズーム演出はトップ=ScrollChoreography、
// /projects=PanelsScroll が .panel__bg img を駆動する（このコンポーネントは markup のみ）。
export default function ProjectPanels({
  projects,
  showAllCTA = false,
}: {
  projects: Project[];
  showAllCTA?: boolean;
}) {
  return (
    <section className="panels-stack" aria-label="Selected work">
      {projects.map((p) => (
        <Link
          className="panel"
          key={p.slug}
          href={`/projects/${p.slug}`}
          aria-label={`${p.title} — View case`}
        >
          <div className="panel__bg">
            {p.hero.video ? (
              <CoverVideo src={p.hero.video} className="panel__bg-video" />
            ) : p.hero.src ? (
              <SmartImage src={p.hero.src} alt="" fill sizes="100vw" style={{ objectFit: 'cover' }} />
            ) : null}
          </div>
          <div className="panel__overlay" />
          <div className="panel__no">
            {p.no} — {p.category}
          </div>
          <div className="panel__inner">
            <div>
              <h3 className="panel__title">
                {p.nameLines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < p.nameLines.length - 1 && <br />}
                  </span>
                ))}
              </h3>
              <div className="panel__sub">{p.tagline}</div>
              <p className="panel__jp">{p.jp}</p>
              <p className="panel__desc">{p.caption}</p>
              <div className="panel__meta">{p.panelMeta}</div>
            </div>
            <span className="panel__cta">View Case →</span>
          </div>
        </Link>
      ))}

      {showAllCTA && (
        <Link className="panel panel--all" href="/projects" aria-label="すべての実績を見る">
          {/* 背景は後送 / TODO: 実画像へ差し替え */}
          <div className="panel__bg" aria-hidden="true" />
          <div className="panel__no">{'{ + }'} — ALL PROJECTS</div>
          <div className="panel__inner">
            <div>
              <h3 className="panel__title">
                See all
                <br />
                our work.
              </h3>
              <div className="panel__sub">すべての実績を見る</div>
              <p className="panel__jp">ブランドの数だけ、立ち上げの物語がある。</p>
            </div>
            <span className="panel__cta">View all projects →</span>
          </div>
        </Link>
      )}
    </section>
  );
}
