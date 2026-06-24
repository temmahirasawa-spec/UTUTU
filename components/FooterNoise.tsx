'use client';

import { useEffect, useRef, useState } from 'react';

// アナログTVの砂嵐ノイズ（canvas 2Dで生成・画像なし）。
// 低解像度バッファ(SCALE=2)に毎フレーム乱数グレースケールを書き込み、CSSで拡大表示。
// 20fpsスロットル / screen合成・opacity0.20 / 画面内のみ描画 / reduced-motion停止 / 非対応時CSS fallback。
// フッター背景専用。ヒーロー等には付けないこと。
export default function FooterNoise() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; // 完全停止
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) {
      setFallback(true); // canvas非対応 → CSSドットパターンへ
      return;
    }

    const SCALE = 2;
    const FPS = 20;
    let img!: ImageData;
    let buf32!: Uint32Array;
    let running = true;
    let last = 0;
    let rafId = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const w = Math.max(2, Math.floor(r.width / SCALE));
      const h = Math.max(2, Math.floor(r.height / SCALE));
      canvas.width = w;
      canvas.height = h;
      img = ctx.createImageData(w, h);
      buf32 = new Uint32Array(img.data.buffer);
    };
    resize();
    window.addEventListener('resize', resize);

    const io = new IntersectionObserver(
      (es) => es.forEach((e) => (running = e.isIntersecting)),
      { threshold: 0.01 },
    );
    io.observe(canvas);

    const frame = (t: number) => {
      if (running && t - last >= 1000 / FPS) {
        last = t;
        for (let i = 0; i < buf32.length; i++) {
          const v = (Math.random() * 255) | 0;
          buf32[i] = (255 << 24) | (v << 16) | (v << 8) | v; // ABGR: グレースケール不透明
        }
        ctx.putImageData(img, 0, 0);
      }
      rafId = requestAnimationFrame(frame);
    };
    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      io.disconnect();
    };
  }, []);

  if (fallback) {
    return <div className="footer-noise footer-noise--fallback" aria-hidden="true" />;
  }
  return <canvas ref={canvasRef} className="footer-noise" aria-hidden="true" />;
}
