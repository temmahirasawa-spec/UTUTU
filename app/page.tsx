import Nav from '@/components/Nav';
import MorphingMark from '@/components/MorphingMark';
import ScrollChoreography from '@/components/ScrollChoreography';
import Hero from '@/components/Hero';
import WorksStage from '@/components/WorksStage';
import ProjectPanels from '@/components/ProjectPanels';
import Achievement from '@/components/Achievement';
import { FEATURED } from '@/lib/projects';
import ActTransition from '@/components/ActTransition';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import BigCTA from '@/components/BigCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      {/* single morphing wordmark — bottom-huge → nav-position */}
      <MorphingMark />
      {/* scroll-driven choreography (hero / works / transition) — v0.7 1:1 */}
      <ScrollChoreography />

      {/* ── ACT 1 — DARK ── */}
      <main className="act1">
        <Hero />
        <WorksStage />
        <ProjectPanels projects={FEATURED} showAllCTA />
        <Achievement />
      </main>

      {/* ── TRANSITION dark → light ── */}
      <ActTransition />

      {/* ── ACT 2 — LIGHT ── */}
      <section className="act2">
        <Services />
        <WhyChooseUs />
        <BigCTA />
      </section>

      <Footer />
    </>
  );
}
