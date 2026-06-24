// + グリッドオーバーレイ（v0.7 と同一の SVG pattern）。
// position: fixed; mix-blend-mode: difference で背景の明暗に関係なく見える。
export default function GridOverlay() {
  return (
    <svg
      className="grid"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <pattern id="cross" x="0" y="0" width="160" height="180" patternUnits="userSpaceOnUse">
          <path
            d="M80 84 L80 96 M74 90 L86 90"
            stroke="rgba(255,255,255,0.40)"
            strokeWidth="1.3"
            fill="none"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cross)" />
    </svg>
  );
}
