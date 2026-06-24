import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import ProjectHero from '@/components/project/ProjectHero';
import ProjectOverview from '@/components/project/ProjectOverview';
import ProjectStory from '@/components/project/ProjectStory';
import ScrollProgress from '@/components/project/ScrollProgress';
import { getProject, getAllSlugs, getAdjacent, type Img, type ProjectBlock } from '@/lib/projects';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProject(params.slug);
  if (!p) return { title: 'Project — UTUTU' };
  return {
    title: `${p.title} — UTUTU`,
    description: `${p.tagline} ${p.caption}`,
  };
}

const isFullImage = (b: ProjectBlock): b is Extract<ProjectBlock, { type: 'fullImage' }> => b.type === 'fullImage';

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const { prev, next } = getAdjacent(project.slug);
  // 概要の背景は story 最初のフルイメージ（無ければ hero）。
  const firstFull = project.story.find(isFullImage);
  const overviewImage: Img = firstFull ? firstFull.src : project.hero.src!;

  return (
    <>
      <Link className="backlink" href="/projects">
        ← ALL PROJECTS
      </Link>
      <ScrollProgress />

      <main className="pcase">
        <ProjectHero project={project} />
        <ProjectOverview project={project} image={overviewImage} />
        <ProjectStory story={project.story} />

        {/* クロージング CTA（1ブロック / トップ BigCTA と冗長にしない） */}
        <section className="pcase__cta">
          <div className="eyebrow reveal">Let&apos;s work together</div>
          <h2 className="reveal" style={{ transitionDelay: '.06s' }}>
            Your brand could be <span className="v">next.</span>
            <span className="jp">次の一社は、あなたかもしれません。一度、話してみませんか。</span>
          </h2>
          <div className="reveal" style={{ transitionDelay: '.12s' }}>
            <a className="pcase__btn pcase__btn--primary" href="mailto:hello@ututu.studio?subject=Book%20a%20call">
              Book a call →
            </a>
          </div>
        </section>

        {/* Prev / Next + All Projects */}
        <nav className="pcase__nav" aria-label="More projects">
          <Link className="prev" href={`/projects/${prev.slug}`}>
            <span className="lbl">← Prev</span>
            <span className="pname">{prev.title}</span>
            <span className="pclient">{prev.client}</span>
          </Link>
          <Link className="all" href="/projects">
            ALL PROJECTS
          </Link>
          <Link className="next" href={`/projects/${next.slug}`}>
            <span className="lbl">Next →</span>
            <span className="pname">{next.title}</span>
            <span className="pclient">{next.client}</span>
          </Link>
        </nav>
      </main>

      <Footer />
    </>
  );
}
