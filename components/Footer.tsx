import Link from 'next/link';
import Clock from './Clock';
import Logo from './Logo';
import CurrentYear from './CurrentYear';
import FooterNoise from './FooterNoise';

// Footer（dark）— 4カラム + コピーライト。記載順は 洋輔 × 天真。
export default function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <FooterNoise />
      <div className="footer__mark"><Logo /></div>
      <div className="footer__grid">
        <div className="footer__lead">
          <div className="footer__col-title">Where we are</div>
          <p>We are based in Tokyo, working with brands across Japan and beyond.</p>
          <p className="jp">東京を拠点に、日本と海外のブランドと働いています。</p>
          <div className="footer__time">
            <span className="dot-pulse" />
            <Clock /> JST · GMT+9
          </div>
        </div>

        <div className="footer__col">
          <div className="footer__col-title">Sitemap</div>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/projects">Work</Link></li>
            <li><Link href="/business">Business</Link></li>
            <li><a href="mailto:hello@ututu.studio">Contact</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <div className="footer__col-title">Social</div>
          <ul>
            <li><a href="#">Twitter / X →</a></li>
            <li><a href="#">Instagram →</a></li>
            <li><a href="#">LinkedIn →</a></li>
            <li><a href="#">WhatsApp →</a></li>
          </ul>
          <div className="footer__col-title" style={{ marginTop: '36px' }}>Contact</div>
          <div className="footer__contact">
            <p><a href="mailto:hello@ututu.studio">hello@ututu.studio</a></p>
          </div>
        </div>

        <div className="footer__col">
          <div className="footer__col-title">Stay in the loop</div>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'var(--mid)', lineHeight: 1.65 }}>
            No spam, just occasional updates from the studio.
          </p>
          <form
            className="footer__newsletter"
            action="mailto:hello@ututu.studio"
            method="post"
            encType="text/plain"
          >
            <label htmlFor="newsletter-email" className="sr-only" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
              Email address
            </label>
            <input id="newsletter-email" name="email" type="email" placeholder="your email" aria-label="Email address" />
            <button type="submit" aria-label="Subscribe">→</button>
          </form>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© <CurrentYear initialYear={new Date().getFullYear()} /> UTUTU — All rights reserved.</span>
        <span>YOSUKE × TEMMA</span>
        <span>
          <a href="#">Privacy</a> · <a href="#">Terms</a>
        </span>
      </div>
    </footer>
  );
}
