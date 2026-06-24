'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// v0.7 の reveal + count-up を移植。
// .reveal → in、[data-to] → カウントアップ。ルート遷移ごとに再バインド。
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
      document.querySelectorAll<HTMLElement>('[data-to]').forEach((num) => {
        num.textContent = String(num.dataset.to ?? '');
      });
      return;
    }

    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18 },
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    // 数字エフェクト：カウントアップではなく「パラパラ」と桁が切り替わり最終値に着地する
    const scramble = (num: HTMLElement) => {
      const to = +(num.dataset.to ?? '0');
      const digits = String(to).length;
      const cap = Math.pow(10, digits) - 1; // 桁数を保って横揺れを防ぐ
      const lo = digits > 1 ? Math.pow(10, digits - 1) : 0;
      const dur = 1300;
      const flipEvery = 55; // ms — 連続ブラーではなく離散的な切り替わりに
      const start = performance.now();
      let lastFlip = -Infinity;
      const frame = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        if (t >= 1) {
          num.textContent = String(to);
          return;
        }
        if (now - lastFlip >= flipEvery) {
          lastFlip = now;
          let val: number;
          if (t < 0.72) {
            // 前半：桁数を保ったまま高速ランダムにパラパラ切り替え
            val = lo + Math.floor(Math.random() * (cap - lo + 1));
          } else {
            // 後半：最終値の周りで振れ幅を縮めながら着地
            const k = (t - 0.72) / 0.28;
            const range = Math.max(1, Math.round((1 - k) * Math.max(2, to * 0.4)));
            val = to + (Math.floor(Math.random() * (2 * range + 1)) - range);
            if (val < 0) val = 0;
            if (val > cap) val = cap;
          }
          num.textContent = String(val);
        }
        requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    };

    const cio = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.querySelectorAll<HTMLElement>('[data-to]').forEach(scramble);
          cio.unobserve(e.target);
        });
      },
      { threshold: 0.4 },
    );
    document.querySelectorAll('.snapshot, .bcard, .bizcase__kpis').forEach((el) => cio.observe(el));

    return () => {
      io.disconnect();
      cio.disconnect();
    };
  }, [pathname]);

  return null;
}
