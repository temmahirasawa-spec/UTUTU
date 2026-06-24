// グローバルナビ（v0.7 と同一構成）。中央は morphing mark が着地する空欄。
export default function Nav() {
  return (
    <header className="nav">
      <nav className="nav__left" aria-label="Social and contact">
        <a href="#" aria-label="WhatsApp">WA</a>
        <a href="#" aria-label="X (Twitter)">X</a>
        <a href="#" aria-label="Instagram">IG</a>
        <a href="#" aria-label="LinkedIn">LI</a>
        <a href="mailto:hello@ututu.studio" aria-label="Email">EMAIL</a>
      </nav>
      <div className="nav__center" aria-hidden="true" />
      <div className="nav__right">
        <button type="button" className="hamb" aria-label="Open menu">
          <i /><i />
        </button>
      </div>
    </header>
  );
}
