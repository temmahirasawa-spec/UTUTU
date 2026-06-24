'use client';

import { useEffect } from 'react';

// /projects 用の軽量パネルズーム駆動。
// トップは ScrollChoreography.panelsFrame が同じ仕事をするが、あちらは検証済みで書き換えない。
// /projects には ScrollChoreography が無いので、同じ係数（1.5 → 1.0, 可視期間 2*ih）の単機能ドライバを置く。
// reduced-motion で無効化、画面外は IntersectionObserver で停止。
export default function PanelsScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const stack = document.querySelector<HTMLElement>('.panels-stack');
    const panelEls = Array.from(document.querySelectorAll<HTMLElement>('.panels-stack .panel'));
    if (!stack || panelEls.length === 0) return;

    const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
    let ticking = false;
    let inView = true;

    function frame() {
      const ih = window.innerHeight;
      const rel = -stack!.getBoundingClientRect().top;
      panelEls.forEach((panel, i) => {
        const media = panel.querySelector<HTMLElement>('.panel__bg img, .panel__bg video');
        if (!media) return;
        const lp = clamp01((rel - (i - 1) * ih) / (2 * ih));
        media.style.transform = `scale(${1.5 - 0.5 * lp})`;
      });
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (inView) frame();
          ticking = false;
        });
        ticking = true;
      }
    }

    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => (inView = e.isIntersecting));
        if (inView) onScroll();
      },
      { threshold: 0 },
    );
    io.observe(stack);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    frame();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      io.disconnect();
    };
  }, []);

  return null;
}
