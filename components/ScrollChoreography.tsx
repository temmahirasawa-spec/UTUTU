'use client';

import { useEffect } from 'react';

// v0.7 の scroll choreography（heroFrame / worksFrame / transitionFrame）を 1:1 移植。
// 検証済みロジックなので書き換えない。DOM は id/class で参照する。
export default function ScrollChoreography() {
  useEffect(() => {
    const heroStage = document.getElementById('heroStage');
    const heroImage = document.getElementById('heroImage');
    const heroContent = document.getElementById('heroContent');
    const mark = document.getElementById('mark');
    const blurTop = document.getElementById('blurTop');
    const worksStage = document.getElementById('worksStage');
    const wsImgs = Array.from(document.querySelectorAll<HTMLElement>('.ws-img'));
    const transitionZone = document.getElementById('transition');
    const tpanel = document.getElementById('tpanel');
    const tline = document.getElementById('tline');
    const tflash = document.getElementById('tflash');
    const panelsStack = document.querySelector<HTMLElement>('.panels-stack');
    const panelEls = Array.from(document.querySelectorAll<HTMLElement>('.panels-stack .panel'));

    const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
    const easeInOut = (p: number) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
    const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3);

    // reduced-motion: モーションを止め、隠れている要素は最終状態で見せる
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      wsImgs.forEach((img) => {
        img.style.transform = 'translateY(0)';
        img.style.opacity = '1';
      });
      return;
    }

    function heroFrame() {
      if (!heroStage || !heroImage || !heroContent || !mark || !blurTop) return;
      const rect = heroStage.getBoundingClientRect();
      const total = heroStage.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const p = clamp01(-rect.top / total);
      const e = easeInOut(p);

      // MARK MORPH — bottom-huge → nav-center（単一要素を scale + translateY で実移動）
      // logo.svg を実高さ(offsetHeight)基準で縮小。transform のみ変更するためレイアウトは汚れない（reflow なし）。
      const markH = mark.offsetHeight || window.innerWidth * 0.128; // fallback ≈ 100vw / 7.79
      const endTargetPx = 20; // nav 着地時のロゴ高さ
      const endScale = endTargetPx / markH;
      const scale = 1 - e * (1 - endScale);

      // CSS bottom: 1.5vh → マーク下端は viewport 上端から (innerHeight - 1.5vh)
      const startBottomFromTop = window.innerHeight - window.innerHeight * 0.015;
      const endBottomFromTop = 22 + endTargetPx;
      const ty = -e * (startBottomFromTop - endBottomFromTop);
      mark.style.transform = `translate(-50%, ${ty}px) scale(${scale})`;

      // hero image: scale + blur
      heroImage.style.transform = `scale(${1 - 0.42 * e}) translateY(${-e * window.innerHeight * 0.14}px)`;
      heroImage.style.filter = `brightness(${0.58 - e * 0.18}) blur(${e * 1.6}px)`;

      // hero content: 下のロゴマークと同様に「縮小しながら上へ抜けて消える」
      const cScale = 1 - 0.22 * e; // 1 → 0.78
      heroContent.style.opacity = String(Math.max(0, 1 - e * 1.7));
      heroContent.style.transform = `translateY(${-e * window.innerHeight * 0.2}px) scale(${cScale})`;

      // top blur
      blurTop.style.opacity = String(e * 0.95);
    }

    function worksFrame() {
      if (!worksStage) return;
      const rect = worksStage.getBoundingClientRect();
      const total = worksStage.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const p = clamp01(-rect.top / total);
      wsImgs.forEach((img, i) => {
        const stagger = i * 0.07;
        const range = 0.55;
        const lp = clamp01((p - stagger) / range);
        const e = easeOutCubic(lp);
        img.style.transform = `translateY(${(1 - e) * 130}vh)`;
        img.style.opacity = lp > 0 ? '1' : '0';
      });
    }

    function panelsFrame() {
      // sticky stacking の各パネル背景を、表示中に 100% → 115% へズームイン。
      // rel = スタック上端が viewport 上端を通過した量。各パネル i は rel∈[i*ih,(i+1)*ih] で 1→1.15。
      if (!panelsStack || panelEls.length === 0) return;
      const ih = window.innerHeight;
      const rel = -panelsStack.getBoundingClientRect().top;
      panelEls.forEach((panel, i) => {
        // パネル i は rel=(i-1)*ih で画面に出現し、rel=(i+1)*ih で見えなくなる。
        // 出現タイミングで 1.5（150%）、見えなくなるまでに 1.0（100%）へズームアウト（可視期間 = 2*ih）。
        // 背景メディア（img でも video でも）をズーム。media を持たない CTA パネルはスキップ。
        const media = panel.querySelector<HTMLElement>('.panel__bg img, .panel__bg video');
        if (!media) return;
        const lp = clamp01((rel - (i - 1) * ih) / (2 * ih));
        media.style.transform = `scale(${1.5 - 0.5 * lp})`;
      });
    }

    function transitionFrame() {
      if (!transitionZone || !tpanel || !tline || !tflash) return;
      const rect = transitionZone.getBoundingClientRect();
      const total = transitionZone.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const p = clamp01(-rect.top / total);
      const e = easeInOut(p);
      // 1) 画面全体が一瞬バーミリオンに切り替わる（fast snap, パネルが上に被さって隠す）
      const flash = clamp01(p / 0.22);
      tflash.style.opacity = String(flash);

      // 2) 白いハーフモーダルが赤の上を下から駆け上がり "Make brands work." へ
      tpanel.style.transform = `translateY(${(1 - e) * 100}%)`;
      const r = (1 - e) * 52;
      tpanel.style.borderTopLeftRadius = r + 'px';
      tpanel.style.borderTopRightRadius = r + 'px';

      // 3) 導入の一文は早めにフェード＆上へ抜ける
      tline.style.opacity = String(Math.max(0, 1 - p * 2.2));
      tline.style.transform = `translateY(${-p * 70}px)`;
    }

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          heroFrame();
          worksFrame();
          panelsFrame();
          transitionFrame();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return null;
}
