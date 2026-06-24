'use client';

import { useEffect } from 'react';

// v0.7 のカスタムカーソルを移植。
// desktop（hover: hover & pointer: fine）のみ。lerp 0.22 で追従、対話要素 hover で枠サークル化。
const HOVER_SELECTOR = 'a, button, .panel__cta, .hamb, .nav__left a, .cta-btn, input, [role="button"]';

export default function CustomCursor() {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    const cursor = document.getElementById('cursor');
    if (!cursor) return;

    let cx = 0, cy = 0, tx = 0, ty = 0;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!cursor.classList.contains('visible')) cursor.classList.add('visible');
    };

    // イベント委譲：後からマウントされる要素・ルート遷移にも対応
    const onOver = (e: Event) => {
      const t = e.target as Element | null;
      if (t && t.closest && t.closest(HOVER_SELECTOR)) cursor.classList.add('hover');
    };
    const onOut = (e: Event) => {
      const t = e.target as Element | null;
      if (t && t.closest && t.closest(HOVER_SELECTOR)) cursor.classList.remove('hover');
    };

    function loop() {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      cursor!.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(loop);
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, true);
    document.addEventListener('mouseout', onOut, true);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver, true);
      document.removeEventListener('mouseout', onOut, true);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div className="cursor" id="cursor" aria-hidden="true" />;
}
