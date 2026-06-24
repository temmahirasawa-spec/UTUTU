import type { Metadata } from 'next';
import Link from 'next/link';
import ProjectPanels from '@/components/ProjectPanels';
import PanelsScroll from '@/components/PanelsScroll';
import Footer from '@/components/Footer';
import { projects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Projects — UTUTU',
  description:
    'UTUTU が手がけたブランドの実績一覧。スクロールで1枚ずつ、トップと同じ見せ方で実績をご覧いただけます。',
};

export default function ProjectsPage() {
  return (
    <>
      <Link className="backlink" href="/">
        ← UTUTU
      </Link>

      <main className="projects">
        <header className="projects__head">
          <div className="eyebrow">Selected Work</div>
          <div className="sublabel">
            {projects.length} projects · brands we built
          </div>
          <h1 className="projects__title">
            Every brand,
            <br />a <span className="v">case</span> in point.
          </h1>
          <p className="projects__lead">
            スクロールで、1枚ずつ。私たちが手がけたブランドの実績を、ひとつずつご覧ください。
          </p>
        </header>

        <ProjectPanels projects={projects} />
      </main>

      <PanelsScroll />
      <Footer />
    </>
  );
}
