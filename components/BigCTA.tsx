// Big CTA — "We transform brands. Your story is next."
export default function BigCTA() {
  return (
    <section className="big-cta">
      <div className="big-cta__inner">
        <div className="eyebrow reveal">Let&apos;s work together</div>
        <h2 className="reveal" style={{ transitionDelay: '.08s' }}>
          We transform
          <br />
          brands. Your
          <br />
          story is <span className="v">next.</span>
          <span className="jp">あなたの次の章を、ともにつくりましょう。一度話してみませんか。</span>
        </h2>
      </div>
      <div className="big-cta__buttons reveal" style={{ transitionDelay: '.16s' }}>
        <a className="cta-btn cta-btn--primary" href="mailto:hello@ututu.studio?subject=Book%20a%20call">
          Book a call →
        </a>
        <a className="cta-btn" href="mailto:hello@ututu.studio">
          Contact us →
        </a>
      </div>
    </section>
  );
}
