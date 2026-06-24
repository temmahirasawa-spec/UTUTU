// Act Transition — 黒→白の幕間。sticky 220vh。白パネルが下から rise + border-radius、中央線が抜ける。
// 駆動は ScrollChoreography（transitionFrame）。
export default function ActTransition() {
  return (
    <section className="transition" id="transition">
      <div className="transition__sticky">
        <div className="transition__line" id="tline">
          From <span className="v">form,</span> to function.
          <span className="jp">ここから、機能の話を。</span>
        </div>
        <div className="transition__flash" id="tflash" aria-hidden="true" />
        <div className="transition__panel" id="tpanel">
          <div className="eyebrow">What We Do</div>
          <h2>
            Make brands <span className="v">work.</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
