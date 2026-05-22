"use client";

import { useRef, useEffect, useState } from "react";

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */
const FEATURES = [
  "Live Teacher-Led Classes",
  "Flexible Scheduling",
  "Personalized Learning",
  "Globally Recognized American Curriculum",
  "Real Academic Support",
  "Modern Digital Learning Tools",
];

/* ─────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────── */
function useIntersection(ref, options = {}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.15, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return visible;
}

/* subtle floating dots canvas — no grid, no squares */
function initCanvas(canvas) {
  if (!canvas) return () => {};
  const ctx = canvas.getContext("2d");
  let pts = [], raf;

  function resize() {
    const p = canvas.parentElement;
    canvas.width  = p?.offsetWidth  || window.innerWidth;
    canvas.height = p?.offsetHeight || window.innerHeight;
    const count = Math.max(14, Math.floor((canvas.width * canvas.height) / 28000));
    pts = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 1 + Math.random() * 1.6,
      vx: (Math.random() - .5) * .14,
      vy: (Math.random() - .5) * .14,
      a: .02 + Math.random() * .05,
      phase: Math.random() * Math.PI * 2,
      spd: .001 + Math.random() * .002,
    }));
  }

  function tick() {
    const { width: W, height: H } = canvas;
    ctx.clearRect(0, 0, W, H);
    const now = performance.now();
    pts.forEach(p => {
      p.x = (p.x + p.vx + W) % W;
      p.y = (p.y + p.vy + H) % H;
      const a = p.a * (.4 + .6 * Math.sin(now * p.spd + p.phase));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(37,99,235,${a.toFixed(3)})`;
      ctx.fill();
    });
    raf = requestAnimationFrame(tick);
  }

  resize();
  window.addEventListener("resize", resize);
  raf = requestAnimationFrame(tick);
  return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
}

/* ─────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────── */
export default function BetterWaySimple() {
  const canvasRef = useRef(null);
  const secRef    = useRef(null);
  const visible   = useIntersection(secRef, { threshold: 0.12 });

  useEffect(() => initCanvas(canvasRef.current), []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700&family=Outfit:wght@400;500;600;700&display=swap');

        .bws-s {
          position: relative;
          width: 100%;
          background: #f0f4f9;
          padding: 88px 24px 100px;
          overflow: hidden;
          font-family: 'Outfit', sans-serif;
        }

        /* very subtle canvas — dots only, no grid lines, no squares */
        .bws-s-canvas {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        /* two soft concentric rings top-right only */
        .bws-s-ring {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }
        .bws-s-ring-1 { width: 380px; height: 380px; top: -140px; right: -110px; border: 1px solid rgba(37,99,235,.07); }
        .bws-s-ring-2 { width: 200px; height: 200px; top: -70px;  right: -50px;  border: 1px solid rgba(37,99,235,.09); }
        .bws-s-ring-3 { width: 280px; height: 280px; bottom: -90px; left: -90px;  border: 1px solid rgba(37,99,235,.06); }

        .bws-s-inner {
          position: relative;
          z-index: 1;
          max-width: 860px;
          margin: 0 auto;
          text-align: center;
        }

        /* ── TITLE (big, Fraunces, blue like screenshot) ── */
        .bws-s-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: clamp(2rem, 5vw, 3.6rem);
          font-weight: 700;
          color: #2563eb;
          line-height: 1.08;
          margin: 0 0 12px;
          font-style: italic;
        }

        /* ── SUBTITLE (small gray, like "International Schooling combines:") ── */
        .bws-s-sub {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(.9rem, 1.4vw, 1rem);
          font-weight: 400;
          color: #6b7280;
          margin: 0 0 40px;
          letter-spacing: .01em;
        }

        /* ── PILLS GRID — 3 columns matching screenshot ── */
        .bws-s-pills {
          display: grid;
          grid-template-columns: repeat(3, auto);
          gap: 12px 14px;
          justify-content: center;
          margin-bottom: 40px;
        }

        .bws-s-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1.5px solid #5eead4;
          border-radius: 99px;
          padding: 10px 22px;
          font-family: 'Outfit', sans-serif;
          font-size: .9rem;
          font-weight: 600;
          color: #0d766e;
          white-space: nowrap;
          cursor: default;
          transition: background .2s ease, border-color .2s ease, transform .2s ease;
        }
        .bws-s-pill:hover {
          background: rgba(94,234,212,.08);
          border-color: #2dd4bf;
          transform: translateY(-2px);
        }

        /* ── BODY TEXT ── */
        .bws-s-body {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(.95rem, 1.5vw, 1.08rem);
          font-weight: 600;
          color: #1e293b;
          line-height: 1.6;
          margin: 0 0 40px;
          max-width: 680px;
          margin-left: auto;
          margin-right: auto;
        }

        /* ── CTA BUTTON ── */
        .bws-s-btn-wrap {
          display: flex;
          justify-content: center;
        }
        .bws-s-btn {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 15px 40px;
          border-radius: 99px;
          background: #2563eb;
          color: #fff;
          font-family: 'Outfit', sans-serif;
          font-size: 13.5px;
          font-weight: 700;
          letter-spacing: .08em;
          text-decoration: none;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: background .2s ease, transform .2s ease, box-shadow .2s ease;
          box-shadow: 0 5px 24px rgba(37,99,235,.32);
        }
        .bws-s-btn:hover {
          background: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(37,99,235,.4);
        }
        .bws-s-btn:active { transform: translateY(0); }
        .bws-s-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.15), transparent);
          transform: translateX(-120%);
          transition: transform .6s ease;
        }
        .bws-s-btn:hover::after { transform: translateX(120%); }

        /* ── RESPONSIVE ── */
        @media (max-width: 700px) {
          .bws-s-pills { grid-template-columns: repeat(2, auto); }
        }
        @media (max-width: 480px) {
          .bws-s { padding: 64px 16px 72px; }
          .bws-s-pills { grid-template-columns: 1fr; }
          .bws-s-pill  { justify-content: center; }
        }
      `}</style>

      <section className="bws-s" aria-labelledby="bws-s-heading" ref={secRef}>
        <canvas ref={canvasRef} className="bws-s-canvas" aria-hidden="true" />
        <div className="bws-s-ring bws-s-ring-1" aria-hidden="true" />
        <div className="bws-s-ring bws-s-ring-2" aria-hidden="true" />
        <div className="bws-s-ring bws-s-ring-3" aria-hidden="true" />

        <div className="bws-s-inner">

          {/* Title */}
          <h2
            id="bws-s-heading"
            className="bws-s-title"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity .7s ease, transform .7s ease",
            }}
          >
            A Better Way to Learn
          </h2>

          {/* Subtitle */}
          <p
            className="bws-s-sub"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity .65s .1s ease, transform .65s .1s ease",
            }}
          >
            International Schooling combines:
          </p>

          {/* Pills */}
          <div
            className="bws-s-pills"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity .7s .18s ease, transform .7s .18s ease",
            }}
          >
            {FEATURES.map((f, i) => (
              <span
                key={f}
                className="bws-s-pill"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(12px)",
                  transition: `opacity .5s ${180 + i * 60}ms ease, transform .5s ${180 + i * 60}ms ease`,
                }}
              >
                {f}
              </span>
            ))}
          </div>

          {/* Body text */}
          <p
            className="bws-s-body"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(14px)",
              transition: "opacity .65s .55s ease, transform .65s .55s ease",
            }}
          >
            Students can study from home, while traveling, or from anywhere in Europe
            with complete academic continuity.
          </p>

          {/* CTA */}
          <div
            className="bws-s-btn-wrap"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0) scale(1)" : "translateY(14px) scale(.95)",
              transition: "opacity .65s .68s ease, transform .65s .68s cubic-bezier(.34,1.46,.64,1)",
            }}
          >
            <a
              href="#demo-book"
              className="bws-s-btn"
            >
              Book Free Demo
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

        </div>
      </section>
    </>
  );
}