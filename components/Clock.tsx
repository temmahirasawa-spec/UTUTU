'use client';

import { useEffect, useState } from 'react';

// 東京（JST）の現在時刻。v0.7 の tickClock を移植。
export default function Clock() {
  const [time, setTime] = useState('--:--:--');

  useEffect(() => {
    const tick = () => {
      setTime(new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Tokyo' }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <span id="clock">{time}</span>;
}
