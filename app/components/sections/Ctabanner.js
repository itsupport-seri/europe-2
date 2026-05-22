"use client";

import { useEffect, useRef } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Inter:wght@400;500;600;700&display=swap');

  .cb * { box-sizing: border-box; margin: 0; padding: 0; }

  .cb {
    font-family: 'Inter', sans-serif;
    width: 100%;
    padding: 52px 40px;
    background: #f8faff;
    -webkit-font-smoothing: antialiased;
  }

  .cb-wrap { max-width: 1200px; margin: 0 auto; }

  /* ── Card ── */
  .cb-card {
    position: relative;
    overflow: hidden;
    border-radius: 28px;
    background: #ffffff;
    border: 1px solid #dce8ff;
    padding: 72px 60px 68px;
    text-align: center;
    isolation: isolate;
    box-shadow:
      0 2px 0 #dce8ff,
      0 8px 40px rgba(30,106,251,0.07),
      0 24px 80px rgba(30,106,251,0.04);
  }

  /* Soft pastel mesh — light, airy */
  .cb-mesh {
    position: absolute; inset: 0;
    pointer-events: none; z-index: 0;
    background:
      radial-gradient(ellipse 55% 70% at 5% 20%,  rgba(30,106,251,0.07) 0%, transparent 65%),
      radial-gradient(ellipse 45% 60% at 95% 75%,  rgba(6,182,212,0.06) 0%, transparent 60%),
      radial-gradient(ellipse 35% 50% at 50% 110%, rgba(99,102,241,0.05) 0%, transparent 60%),
      radial-gradient(ellipse 55% 40% at 50% -15%, rgba(30,106,251,0.05) 0%, transparent 55%);
  }

  /* Dot-grid — dark dots on white */
  .cb-grid {
    position: absolute; inset: 0;
    pointer-events: none; z-index: 0;
    background-image: radial-gradient(circle, rgba(30,106,251,0.07) 1px, transparent 1px);
    background-size: 28px 28px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
    -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
  }

  /* Soft colour wash behind heading */
  .cb-glow {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 600px; height: 320px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(30,106,251,0.06) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
    animation: cb-pulse-glow 5s ease-in-out infinite;
  }
  @keyframes cb-pulse-glow {
    0%,100% { opacity: 0.7; transform: translate(-50%,-50%) scale(1); }
    50%      { opacity: 1;   transform: translate(-50%,-50%) scale(1.06); }
  }

  /* ── Geometric shapes — retuned for light bg ── */
  .cb-geo { position: absolute; pointer-events: none; z-index: 0; }

  .cb-geo-1 {
    top: -44px; left: -44px; width: 220px; height: 220px;
    border: 1.5px solid rgba(30,106,251,0.12); border-radius: 50%;
    animation: cb-float1 8s ease-in-out infinite;
  }
  .cb-geo-2 {
    top: -22px; left: -22px; width: 140px; height: 140px;
    border: 1px solid rgba(30,106,251,0.08); border-radius: 50%;
    animation: cb-float1 8s ease-in-out infinite 0.5s;
  }
  .cb-geo-3 {
    bottom: -54px; right: -54px; width: 250px; height: 250px;
    border: 1.5px solid rgba(6,182,212,0.12); border-radius: 50%;
    animation: cb-float2 9s ease-in-out infinite;
  }
  .cb-geo-4 {
    bottom: -24px; right: -24px; width: 160px; height: 160px;
    border: 1px solid rgba(6,182,212,0.07); border-radius: 50%;
    animation: cb-float2 9s ease-in-out infinite 0.8s;
  }
  /* Spinning cross — top right */
  .cb-geo-5 {
    top: 30px; right: 64px; width: 38px; height: 38px;
    opacity: 0.3; animation: cb-spin 22s linear infinite;
  }
  /* Small filled diamond — bottom left */
  .cb-geo-6 {
    bottom: 34px; left: 72px; width: 22px; height: 22px;
    background: rgba(30,106,251,0.12); transform: rotate(45deg);
    animation: cb-float1 6s ease-in-out infinite 1s;
  }
  /* Outlined diamond — mid right */
  .cb-geo-7 {
    top: 50%; right: 5%;
    transform: translateY(-50%) rotate(45deg);
    width: 52px; height: 52px;
    border: 1.5px solid rgba(99,102,241,0.15);
    animation: cb-float2 7s ease-in-out infinite 0.3s;
  }
  /* Small dot cluster — top left area */
  .cb-geo-8 {
    top: 44px; left: 5%;
    transform: translateY(0) rotate(45deg);
    width: 36px; height: 36px;
    border: 1.5px solid rgba(6,182,212,0.18);
    animation: cb-float1 7s ease-in-out infinite 0.6s;
  }

  @keyframes cb-float1 { 0%,100% { transform: translateY(0); }      50% { transform: translateY(-11px); } }
  @keyframes cb-float2 { 0%,100% { transform: translateY(0); }      50% { transform: translateY(9px); } }
  @keyframes cb-spin   { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

  /* Top accent stripe on card */
  .cb-stripe {
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #1e6afb 0%, #0891b2 50%, #6366f1 100%);
    z-index: 1;
  }

  /* ── Content ── */
  .cb-content { position: relative; z-index: 2; }

  /* Top label pill */
  .cb-label {
    display: inline-flex; align-items: center; gap: 8px;
    background: #e8f0ff;
    border: 1px solid #c5d8ff;
    border-radius: 100px; padding: 6px 18px; margin-bottom: 22px;
  }
  .cb-label-text {
    font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; color: #1e6afb;
  }
  .cb-label-dot {
    width: 6px; height: 6px; border-radius: 50%; background: #059669;
    flex-shrink: 0; box-shadow: 0 0 5px 1px rgba(5,150,105,0.4);
    animation: cb-dot-pulse 2s ease-in-out infinite;
  }
  @keyframes cb-dot-pulse {
    0%,100% { box-shadow: 0 0 5px 1px rgba(5,150,105,0.4); }
    50%      { box-shadow: 0 0 9px 3px rgba(5,150,105,0.65); }
  }

  /* Heading */
  .cb-heading {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: clamp(1.7rem, 3.8vw, 2.8rem);
    font-weight: 800; color: #0a0f1e;
    line-height: 1.15; margin-bottom: 12px; letter-spacing: -0.02em;
  }
  /* Gradient highlight on "They Deserve" */
  .cb-heading-em {
    background: linear-gradient(135deg, #1e6afb 0%, #0891b2 60%, #6366f1 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; position: relative; display: inline-block;
  }
  .cb-heading-em::after {
    content: ''; position: absolute; bottom: -3px; left: 0;
    width: 100%; height: 2.5px;
    background: linear-gradient(90deg, #1e6afb, #0891b2, #6366f1);
    border-radius: 2px; opacity: 0.35;
  }

  /* Sub */
  .cb-sub {
    font-size: 0.92rem; color: #5a6480;
    line-height: 1.7; margin-bottom: 28px;
    max-width: 500px; margin-left: auto; margin-right: auto;
  }

  /* Enrollment badge */
  .cb-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: #dcfce7; border: 1px solid #86efac;
    border-radius: 100px; padding: 7px 20px; margin-bottom: 32px;
  }
  .cb-badge-ping-wrap {
    position: relative; width: 9px; height: 9px; flex-shrink: 0;
  }
  .cb-badge-ping-wrap span {
    position: absolute; inset: 0; border-radius: 50%; background: #059669;
  }
  .cb-badge-ping-wrap span.ping {
    animation: cb-ping 1.5s cubic-bezier(0,0,.2,1) infinite;
    background: #34d399; opacity: 0.7;
  }
  @keyframes cb-ping { 75%,100% { transform: scale(2.2); opacity: 0; } }
  .cb-badge-text {
    font-size: 13px; font-weight: 700; color: #166534;
    white-space: nowrap; letter-spacing: 0.01em;
  }

  /* Button group */
  .cb-btns {
    display: flex; justify-content: center; align-items: center;
    gap: 14px; flex-wrap: wrap;
  }

  /* Primary button */
  .cb-btn-primary {
    display: inline-flex; align-items: center; gap: 9px;
    padding: 15px 38px; border-radius: 100px;
    background: linear-gradient(135deg, #1e6afb 0%, #0891b2 100%);
    color: #fff; font-family: 'Inter', sans-serif;
    font-size: 1rem; font-weight: 700; text-decoration: none; border: none;
    cursor: pointer; letter-spacing: 0.01em; position: relative; overflow: hidden;
    box-shadow: 0 4px 18px rgba(30,106,251,0.32), 0 1px 0 rgba(255,255,255,0.15) inset;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .cb-btn-primary::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 55%);
    border-radius: inherit;
  }
  .cb-btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(30,106,251,0.42), 0 1px 0 rgba(255,255,255,0.15) inset;
  }
  .cb-btn-primary:active { transform: translateY(0); }

  .cb-btn-arrow { display: inline-flex; transition: transform 0.2s; }
  .cb-btn-primary:hover .cb-btn-arrow { transform: translateX(3px); }

  /* Outline secondary button */
  .cb-btn-outline {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 15px 30px; border-radius: 100px;
    background: transparent; color: #1e6afb;
    font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 600;
    text-decoration: none; border: 1.5px solid #1e6afb; cursor: pointer;
    transition: transform 0.2s, background 0.2s, color 0.2s;
  }
  .cb-btn-outline:hover {
    background: #1e6afb; color: #fff; transform: translateY(-2px);
  }
  .cb-btn-outline:active { transform: translateY(0); }

  /* Trust row */
  .cb-trust {
    display: flex; justify-content: center; align-items: center;
    gap: 22px; margin-top: 28px; flex-wrap: wrap;
  }
  .cb-trust-item {
    display: flex; align-items: center; gap: 6px;
    font-size: 12px; font-weight: 500; color: #7a8ba8;
  }
  .cb-trust-icon { color: #059669; flex-shrink: 0; }
  .cb-trust-divider { width: 1px; height: 14px; background: #dce8ff; }

  /* Shine sweep on hover */
  .cb-card::after {
    content: ''; position: absolute;
    top: 0; left: -100%; width: 55%; height: 100%;
    background: linear-gradient(105deg, transparent 40%, rgba(30,106,251,0.025) 50%, transparent 60%);
    pointer-events: none; z-index: 1; transition: left 0.85s ease;
  }
  .cb-card:hover::after { left: 165%; }

  /* Scroll-in */
  .cb-card {
    opacity: 0; transform: translateY(22px);
    transition: opacity 0.65s ease, transform 0.65s cubic-bezier(0.34,1.1,0.64,1);
  }
  .cb-card.cb-in { opacity: 1; transform: translateY(0); }

  /* ── Mobile ── */
  @media (max-width: 768px) {
    .cb { padding: 32px 16px; }
    .cb-card { padding: 48px 22px 44px; border-radius: 22px; }
    .cb-heading { font-size: clamp(1.5rem, 7vw, 1.85rem); }
    .cb-sub { font-size: 0.84rem; }
    .cb-badge-text { font-size: 11px; }
    .cb-btn-primary, .cb-btn-outline { font-size: 0.9rem; padding: 13px 24px; }
    .cb-geo-5, .cb-geo-6, .cb-geo-7, .cb-geo-8 { display: none; }
    .cb-trust-divider { display: none; }
    .cb-btns { gap: 10px; }
    .cb-trust { gap: 14px; }
  }
`;

export default function CtaBanner() {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add("cb-in"); io.disconnect(); }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <section className="cb" aria-label="Call to action">
        <div className="cb-wrap">
          <div ref={cardRef} className="cb-card">

            {/* Background layers */}
            <div className="cb-stripe" aria-hidden="true" />
            <div className="cb-mesh"  aria-hidden="true" />
            <div className="cb-grid"  aria-hidden="true" />
            <div className="cb-glow"  aria-hidden="true" />

            {/* Geometric decorations */}
            <div className="cb-geo cb-geo-1" aria-hidden="true" />
            <div className="cb-geo cb-geo-2" aria-hidden="true" />
            <div className="cb-geo cb-geo-3" aria-hidden="true" />
            <div className="cb-geo cb-geo-4" aria-hidden="true" />
            <svg className="cb-geo cb-geo-5" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <line x1="19" y1="0" x2="19" y2="38" stroke="rgba(30,106,251,0.55)" strokeWidth="1.4"/>
              <line x1="0"  y1="19" x2="38" y2="19" stroke="rgba(30,106,251,0.55)" strokeWidth="1.4"/>
              <circle cx="19" cy="19" r="4" stroke="rgba(30,106,251,0.55)" strokeWidth="1.4" fill="none"/>
            </svg>
            <div className="cb-geo cb-geo-6" aria-hidden="true" />
            <div className="cb-geo cb-geo-7" aria-hidden="true" />
            <div className="cb-geo cb-geo-8" aria-hidden="true" />

            {/* Content */}
            <div className="cb-content">

              {/* Label */}
              <div>
                <span className="cb-label">
                  <span className="cb-label-dot" aria-hidden="true" />
                  <span className="cb-label-text">Internationally Accredited School</span>
                </span>
              </div>

              {/* Heading */}
              <h2 className="cb-heading">
                Give Your Child the Education{" "}
                <span className="cb-heading-em">They Deserve</span>
              </h2>

              {/* Sub */}
              <p className="cb-sub">
                Join 15,000+ students across 190+ countries in a world-class online learning experience designed for every child's unique journey.
              </p>

              {/* Enrollment badge */}
              <div>
                <span className="cb-badge">
                  <span className="cb-badge-ping-wrap">
                    <span className="ping" />
                    <span />
                  </span>
                  <span className="cb-badge-text">
                    Enrolment Open Now &nbsp;·&nbsp; Limited Seats Available
                  </span>
                </span>
              </div>

              {/* Buttons */}
              <div className="cb-btns">
                <a href="#demo-book" className="cb-btn-primary">
                  Book Free Demo Today
                  <span className="cb-btn-arrow" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </span>
                </a>
                {/* <a href="https://internationalschooling.org/enrollment" className="cb-btn-outline" target="_blank" rel="noopener noreferrer">
                  Start Enrollment
                </a> */}
              </div>

              {/* Trust signals */}
              <div className="cb-trust" aria-label="Trust indicators">
                {["NEASC · WASC · Cognia Accredited", "American Diploma — Global Recognition", "No Commitment Demo"].map((item, i, arr) => (
                  <span key={item} style={{ display: "contents" }}>
                    <div className="cb-trust-item">
                      <svg className="cb-trust-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {item}
                    </div>
                    {i < arr.length - 1 && <div className="cb-trust-divider" aria-hidden="true" />}
                  </span>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}