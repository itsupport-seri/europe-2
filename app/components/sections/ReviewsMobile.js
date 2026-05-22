"use client";
import { useEffect, useRef, useState } from "react";
import { Play, Globe, Quote, ChevronRight } from "lucide-react";

const reviews = [
  { id: "EfHor0B7Nbg", label: "Student From Sri Lanka", sublabel: "Living in UAE",       flag: "🇱🇰", accent: "blue"    },
  { id: "yc8Wyw2wFB0", label: "Student From Oman",      sublabel: "Middle East",          flag: "🇴🇲", accent: "emerald" },
  { id: "nhGtomI2nVU", label: "Student From UAE",       sublabel: "United Arab Emirates", flag: "🇦🇪", accent: "violet"  },
];

const accentColors = {
  blue:    { top: "#3b82f6", border: "#bfdbfe" },
  emerald: { top: "#10b981", border: "#a7f3d0" },
  violet:  { top: "#8b5cf6", border: "#ddd6fe" },
};

const trustStats = [
  { value: "4.9/5", label: "Rating"   },
  { value: "15K+",  label: "Families" },
  { value: "190+",  label: "Countries"},
];

const CSS = `
@keyframes rv-up   { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
@keyframes rv-dash { from { stroke-dashoffset:220; } to { stroke-dashoffset:0; } }
@keyframes rv-pulse{ 0%,100%{ transform:scale(1); opacity:1; } 50%{ transform:scale(1.6); opacity:.4; } }
@keyframes rv-ping { 0%{ transform:scale(1); opacity:.7; } 75%,100%{ transform:scale(2); opacity:0; } }

.rv-page {
  position: relative; overflow: hidden;
  border-top: 1px solid #bfdbfe; border-bottom: 1px solid #bfdbfe;
  background: linear-gradient(160deg, #f8faff 0%, #eff6ff 55%, #f0f9ff 100%);
  font-family: system-ui, -apple-system, sans-serif;
  padding: 36px 0 52px; -webkit-font-smoothing: antialiased;
}
.rv-blob { position: absolute; pointer-events: none; border-radius: 50%; }
.rv-dots-svg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.rv-inner { position: relative; z-index: 1; padding: 0 16px; max-width: 480px; margin: 0 auto; }
.rv-reveal {
  opacity: 0; animation-name: rv-up; animation-duration: .6s;
  animation-timing-function: cubic-bezier(.16,1,.3,1); animation-fill-mode: both;
}
.rv-head { text-align: center; margin-bottom: 22px; }
.rv-pill {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 9.5px; font-weight: 700; letter-spacing: .13em; text-transform: uppercase;
  color: #1d4ed8; background: #eff6ff; border: 1px solid #bfdbfe;
  padding: 5px 13px; border-radius: 100px; margin-bottom: 14px;
}
.rv-pill-dot {
  width: 5px; height: 5px; border-radius: 50%; background: #3b82f6;
  animation: rv-pulse 2.2s ease-in-out infinite;
}
.rv-h2 {
  font-size: clamp(1.45rem, 7vw, 1.9rem); font-weight: 800; color: #374151;
  line-height: 1.2; margin: 0 0 10px; letter-spacing: -.02em;
}
.rv-h2-em { color: #1d4ed8; position: relative; display: inline-block; }
.rv-desc { font-size: .82rem; color: #64748b; line-height: 1.7; margin: 0 auto; max-width: 300px; }
.rv-stats { display: flex; gap: 8px; margin-bottom: 22px; }
.rv-stat {
  flex: 1; display: flex; flex-direction: column; align-items: center;
  background: #fff; border: 1px solid rgba(0,0,0,.07);
  border-radius: 14px; padding: 10px 6px; box-shadow: 0 1px 6px rgba(0,0,0,.05);
}
.rv-stat-n { font-size: 1.05rem; font-weight: 800; color: #1e293b; line-height: 1; margin-bottom: 3px; }
.rv-stat-l { font-size: 8px; font-weight: 700; color: #94a3b8; letter-spacing: .07em; text-transform: uppercase; }
.rv-cards { display: flex; flex-direction: column; gap: 14px; margin-bottom: 22px; }
.rv-card {
  background: #fff; border-radius: 18px; overflow: hidden;
  border: 1px solid rgba(0,0,0,.07); box-shadow: 0 2px 14px rgba(0,0,0,.07);
}
.rv-card-bar { height: 4px; width: 100%; }

/* Video wrapper — fixed aspect ratio container */
.rv-card-video {
  position: relative; width: 100%; aspect-ratio: 16/9;
  background: #0f172a; overflow: hidden;
}
/* iframe fills container absolutely, no pointer interference from parent */
.rv-card-video iframe {
  position: absolute; inset: 0; width: 100%; height: 100%;
  border: 0; display: block;
}
/* Thumbnail button only shown pre-play */
.rv-thumb-btn {
  position: absolute; inset: 0; display: block;
  cursor: pointer; border: 0; padding: 0; background: none;
  -webkit-tap-highlight-color: transparent;
}
.rv-thumb-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.rv-thumb-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(15,23,42,.72) 0%, rgba(15,23,42,.18) 50%, transparent 100%);
}
.rv-thumb-quote { position: absolute; top: 10px; left: 10px; opacity: .4; }
.rv-thumb-watch {
  position: absolute; bottom: 10px; right: 10px;
  background: rgba(0,0,0,.7); color: #fff; font-size: 10px; font-weight: 700;
  padding: 3px 8px; border-radius: 6px; backdrop-filter: blur(4px);
}
.rv-play-wrap { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
.rv-play-btn {
  position: relative; width: 54px; height: 54px; border-radius: 50%; background: #fff;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 8px 28px rgba(0,0,0,.3);
}
.rv-play-ping {
  position: absolute; inset: 0; border-radius: 50%; background: rgba(255,255,255,.35);
  animation: rv-ping 1.6s ease-out infinite;
}
.rv-play-icon { fill: #dc2626; color: #dc2626; margin-left: 3px; }
.rv-subhead {
  text-align: center; font-size: 1.3rem; font-weight: 800;
  color: #1d4ed8; line-height: 1.25; margin-bottom: 16px;
}
.rv-subhead span { font-size: 1.5rem; display: block; }
.rv-cta-strip {
  display: flex; flex-direction: column; gap: 12px; background: #fff;
  border: 1px solid #bfdbfe; border-radius: 18px; padding: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,.06);
}
.rv-cta-top { display: flex; align-items: center; gap: 11px; }
.rv-cta-icon {
  width: 40px; height: 40px; flex-shrink: 0; border-radius: 11px; background: #eff6ff;
  display: flex; align-items: center; justify-content: center;
}
.rv-cta-title { font-size: .78rem; font-weight: 800; color: #0f172a; margin-bottom: 2px; }
.rv-cta-sub   { font-size: .7rem; color: #94a3b8; }
.rv-cta-btn {
  display: flex; align-items: center; justify-content: center; gap: 6px;
  width: 100%; border-radius: 100px; background: #2563eb; color: #fff;
  font-size: .82rem; font-weight: 700; padding: 13px 20px; text-decoration: none;
  box-shadow: 0 4px 16px rgba(37,99,235,.28);
  transition: background .15s, transform .15s;
  -webkit-tap-highlight-color: transparent; min-height: 44px;
}
.rv-cta-btn:active { background: #1d4ed8; transform: scale(.98); }
`;

function VideoCard({ review, cardRef, animDelay }) {
  const [playing, setPlaying] = useState(false);
  const a = accentColors[review.accent];
  const thumb = `https://i.ytimg.com/vi/${review.id}/hqdefault.jpg`;

  return (
    <article
      className="rv-card"
      ref={cardRef}
      style={{ animationDelay: animDelay, borderColor: a.border }}
    >
      <div className="rv-card-bar" style={{ background: a.top }} />

      <div className="rv-card-video">
        {/* iframe always rendered once playing — NEVER unmounted */}
        {playing && (
          <iframe
            src={`https://www.youtube.com/embed/${review.id}?autoplay=1&rel=0&playsinline=1`}
            title={`Review from ${review.label}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}

        {/* Thumbnail overlay — only shown when NOT playing */}
        {!playing && (
          <button
            type="button"
            className="rv-thumb-btn"
            onClick={() => setPlaying(true)}
            aria-label={`Play review from ${review.label}`}
          >
            <img src={thumb} alt="" loading="lazy" decoding="async" className="rv-thumb-img" />
            <div className="rv-thumb-overlay" />
            <div className="rv-thumb-quote" aria-hidden="true">
              <Quote size={18} color="#fff" fill="#fff" />
            </div>
            <div className="rv-play-wrap" aria-hidden="true">
              <div className="rv-play-btn">
                <div className="rv-play-ping" />
                <Play size={20} className="rv-play-icon" />
              </div>
            </div>
            <div className="rv-thumb-watch" aria-hidden="true">▶ Watch</div>
          </button>
        )}
      </div>
    </article>
  );
}

export default function ReviewsMobile() {
  const headRef  = useRef(null);
  const statsRef = useRef(null);
  const card0Ref = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const ctaRef   = useRef(null);
  const [dashAnim, setDashAnim] = useState(false);

  useEffect(() => {
    const targets = [
      { el: headRef.current,  delay: 0,   onVis: () => setDashAnim(true) },
      { el: statsRef.current, delay: 60  },
      { el: card0Ref.current, delay: 40  },
      { el: card1Ref.current, delay: 100 },
      { el: card2Ref.current, delay: 160 },
      { el: ctaRef.current,   delay: 80  },
    ];
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const t = targets.find(t => t.el === entry.target);
        setTimeout(() => {
          entry.target.classList.add("rv-reveal");
          t?.onVis?.();
        }, t?.delay ?? 0);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.07 });
    targets.forEach(({ el }) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const cardRefs   = [card0Ref, card1Ref, card2Ref];
  const cardDelays = ["0s", "0.05s", "0.1s"];

  return (
    <>
      <style>{CSS}</style>
      <section id="reviews" aria-labelledby="rv-title" className="rv-page">

        <div aria-hidden="true" className="rv-blob" style={{
          top: -60, right: -70, width: 240, height: 240,
          background: "radial-gradient(circle, rgba(191,219,254,.32) 0%, transparent 70%)",
        }} />
        <div aria-hidden="true" className="rv-blob" style={{
          bottom: -50, left: -60, width: 200, height: 200,
          background: "radial-gradient(circle, rgba(191,219,254,.22) 0%, transparent 70%)",
        }} />

        <svg className="rv-dots-svg" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="rv-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.1" fill="#93c5fd" fillOpacity="0.28" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#rv-dots)" />
        </svg>

        <div className="rv-inner">
          <header ref={headRef} className="rv-head">
            <div className="rv-pill">
              <span className="rv-pill-dot" aria-hidden="true" />
              Student Reviews
            </div>
            <h2 id="rv-title" className="rv-h2">
              Designed for Every{" "}
              <span className="rv-h2-em">
                Kind of Learner
                <svg
                  style={{ position:"absolute", bottom:-3, left:0, width:"100%", pointerEvents:"none" }}
                  height="6" viewBox="0 0 200 6" preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                >
                  <path
                    d="M0 5 Q50 0 100 4 Q150 8 200 3"
                    stroke="#1d4ed8" strokeWidth="2.5" fill="none" strokeLinecap="round"
                    style={{
                      strokeDasharray: 220,
                      animationName: dashAnim ? "rv-dash" : "none",
                      animationDuration: "1.1s",
                      animationTimingFunction: "ease",
                      animationDelay: "0.3s",
                      animationFillMode: "both",
                    }}
                  />
                </svg>
              </span>
            </h2>
            <p className="rv-desc">
              Perfect for athletes, traveling families, gifted learners, and students who need flexible, personalized education.
            </p>
          </header>

          <div ref={statsRef} className="rv-stats">
            {trustStats.map(({ value, label }) => (
              <div key={label} className="rv-stat">
                <span className="rv-stat-n">{value}</span>
                <span className="rv-stat-l">{label}</span>
              </div>
            ))}
          </div>

          <div className="rv-cards">
            {reviews.map((review, i) => (
              <VideoCard
                key={review.id}
                review={review}
                cardRef={cardRefs[i]}
                animDelay={cardDelays[i]}
              />
            ))}
          </div>

          <p className="rv-subhead">
            Learn Anywhere.
            <span>Grow Everywhere.</span>
          </p>

          <div ref={ctaRef} className="rv-cta-strip">
            <div className="rv-cta-top">
              <div className="rv-cta-icon">
                <Globe size={18} color="#2563eb" />
              </div>
              <div>
                <div className="rv-cta-title">Join Families From 190+ Countries</div>
                <div className="rv-cta-sub">World-class education from home</div>
              </div>
            </div>
            <a href="#demo-book" className="rv-cta-btn">
              Book Free Demo
              <ChevronRight size={15} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}