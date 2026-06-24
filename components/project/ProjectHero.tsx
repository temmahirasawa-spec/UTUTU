'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import SmartImage from '../SmartImage';
import CoverVideo from '../CoverVideo';
import type { Project } from '@/lib/projects';

// 詳細ヒーロー。KV をフルブリードで sticky 固定し、タイトル/説明はスクロールで
// opacity↓ + わずかに上へ抜けて消える（既存トップ heroContent のフェード作法と同じ係数感）。
export default function ProjectHero({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.32], reduce ? [1, 1] : [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.32], reduce ? [0, 0] : [0, -90]);

  return (
    <section className="pcase__hero" ref={ref}>
      <div className="pcase__hero-sticky">
        <div className="pcase__hero-img">
          {project.hero.video ? (
            <CoverVideo src={project.hero.video} className="pcase__hero-video" />
          ) : project.hero.src ? (
            <SmartImage src={project.hero.src} alt={project.hero.alt} fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
          ) : null}
        </div>
        <div className="pcase__hero-scrim" />
        <motion.div className="pcase__hero-body" style={{ opacity, y }}>
          <div className="pcase__no">
            {project.no} — {project.category}
          </div>
          <h1 className="pcase__title">
            {project.nameLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < project.nameLines.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="pcase__desc">{project.tagline}</p>
          <p className="pcase__jp">{project.jp}</p>
          <div className="pcase__scroll-ind" aria-hidden="true">
            Scroll
          </div>
        </motion.div>
      </div>
    </section>
  );
}
