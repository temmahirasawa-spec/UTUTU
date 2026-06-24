'use client';

import { useEffect, useState } from 'react';

// 現在の年を表示。年号が変わったら自動で最新年になる。
// SSG ビルド時の年（initialYear）を初期表示にしてハイドレーション不整合を防ぎ、
// マウント後に閲覧者の実際の現在年へ更新する。
export default function CurrentYear({ initialYear }: { initialYear: number }) {
  const [year, setYear] = useState(initialYear);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return <>{year}</>;
}
