'use client';

import { motion, useScroll } from 'framer-motion';

// 章インジケータ（控えめなスクロール進捗バー）。長尺の詳細ページで「今どこか」を示す。
// スクロール位置に連動する transform のみ（自走アニメではない）なので reduced-motion でも問題なし。
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="pcase__progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />;
}
