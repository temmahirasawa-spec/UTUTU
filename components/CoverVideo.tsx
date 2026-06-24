'use client';

import { useEffect, useRef } from 'react';

// 背景動画（パネル / 詳細ヒーローの KV）。muted + loop + playsInline で自動再生。
// reduced-motion では再生せず1フレーム静止（モーション無効化の方針に合わせる）。
export default function CoverVideo({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.pause();
      return;
    }
    // 一部ブラウザは autoplay 属性だけだと再生しないことがあるため明示的に play。
    v.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
