// UTUTU ワードマーク（public/images/logo.svg をインライン化）。
// fill=currentColor にして、色は親要素の color（= vermilion var(--v)）で制御する。
// viewBox 0 0 1160 149（アスペクト比 ≈ 7.79:1）。
export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1160 149"
      fill="currentColor"
      fillRule="evenodd"
      role="img"
      aria-label="UTUTU"
    >
      <g transform="translate(8 8)">
        <path
          fillRule="evenodd"
          d="M0 0V57.0A76.0 76.0 0 0 0 152 57.0V0H130V57.0A54.0 54.0 0 0 1 22 57.0V0Z M248 0H400V22H335.0V133H313.0V22H248Z M496 0V57.0A76.0 76.0 0 0 0 648 57.0V0H626V57.0A54.0 54.0 0 0 1 518 57.0V0Z M744 0H896V22H831.0V133H809.0V22H744Z M992 0V57.0A76.0 76.0 0 0 0 1144 57.0V0H1122V57.0A54.0 54.0 0 0 1 1014 57.0V0Z"
        />
      </g>
    </svg>
  );
}
