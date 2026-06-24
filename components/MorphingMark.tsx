import Logo from './Logo';

// 単一の morphing UTUTU マーク。bottom-huge → nav-center へ scale + translateY で実移動。
// 変形ロジックは ScrollChoreography（heroFrame）が #mark を駆動する（v0.7 を 1:1 移植）。
// 旧テキストワードマークを logo.svg ベースの <Logo/> に差し替え。
export default function MorphingMark() {
  return (
    <div className="mark" id="mark" aria-hidden="true">
      <Logo />
    </div>
  );
}
