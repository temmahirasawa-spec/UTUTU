'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import SmartImage from '../SmartImage';
import type { Img, Project } from '@/lib/projects';

// 概要セクション。大きめの画像を背面に敷き、スクロールで背景は視差、テキストは少し遅れて動く。
// 暗幕を必ず噛ませて可読性を最優先（prompt 3-2b）。
function MetaRow({ k, val, lines }: { k: string; val?: string; lines?: string[] }) {
  if (!val && (!lines || lines.length === 0)) return null; // 空の行は出さない（Date 省略など）
  return (
    <div className="pcase__meta-row">
      <span className="k">{k}</span>
      <span className="val">
        {lines ? lines.map((l, i) => <span className="vline" key={i}>{l}</span>) : val}
      </span>
    </div>
  );
}

export default function ProjectOverview({ project, image }: { project: Project; image: Img }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-9%', '9%']);
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [44, -44]);
  const o = project.overview;

  return (
    <section className="pcase__overview" ref={ref}>
      <motion.div className="pcase__overview-bg" style={{ y: bgY }}>
        <SmartImage src={image} alt="" fill sizes="100vw" style={{ objectFit: 'cover' }} />
      </motion.div>
      <div className="pcase__overview-scrim" />

      <motion.div className="pcase__overview-inner" style={{ y: textY }}>
        <p className="pcase__intro">{o.intro}</p>
        <div className="pcase__meta">
          <MetaRow k="Date" val={o.date} />
          <MetaRow k="Industry" val={o.industry} />
          <MetaRow k="Role" lines={o.role} />
          <MetaRow k="Deliverables" lines={o.deliverables} />
          <MetaRow k="Approach" val={o.approach} />
          <MetaRow k="Timeframe" val={o.timeframe} />
          {o.liveUrl && (
            <div className="pcase__meta-row">
              <span className="k">Live</span>
              <a className="val pcase__viewproject" href={o.liveUrl} target="_blank" rel="noopener noreferrer">
                VIEW PROJECT →
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
