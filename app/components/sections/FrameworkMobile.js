"use client";

import { useEffect, useRef, useState, memo, Fragment } from "react";
import {
  Users, Shield, Coins, Briefcase, FolderOpen,
  Award, Brain, GraduationCap, Wrench,
  Settings, Video, Lightbulb, ChevronDown,
} from "lucide-react";

/* ═══════════════════════════════════════════
   STATIC DATA
═══════════════════════════════════════════ */
const RING1 = [
  { label: "WASC Accredited",        icon: Users,         color: "#e53e3e", light: "#fff5f5", ring: "Outer" },
  { label: "NEASC Accredited",       icon: Shield,        color: "#dd6b20", light: "#fffaf0", ring: "Outer" },
  { label: "Cognia Accredited",      icon: Coins,         color: "#285e61", light: "#e6fffa", ring: "Outer" },
  { label: "University Pathways",    icon: Briefcase,     color: "#38a169", light: "#f0fff4", ring: "Outer" },
  { label: "Project-Based Learning", icon: FolderOpen,    color: "#3182ce", light: "#ebf8ff", ring: "Outer" },
];
const RING2 = [
  { label: "AP Courses",             icon: Award,         color: "#c53030", light: "#fff5f5", ring: "Middle" },
  { label: "Personalized Learning",  icon: Brain,         color: "#b7791f", light: "#fffff0", ring: "Middle" },
  { label: "American Curriculum",    icon: GraduationCap, color: "#276749", light: "#f0fff4", ring: "Middle" },
  { label: "Flexible Learning",      icon: Wrench,        color: "#2b6cb0", light: "#ebf8ff", ring: "Middle" },
];
const RING3 = [
  { label: "EdTech Tools",           icon: Settings,      color: "#3182ce", light: "#ebf8ff", ring: "Inner" },
  { label: "Live Online Classes",    icon: Video,         color: "#38a169", light: "#f0fff4", ring: "Inner" },
  { label: "Future-Ready Skills",    icon: Lightbulb,     color: "#d69e2e", light: "#fffff0", ring: "Inner" },
];
const STATS = [
  { num: "3.8",  label: "GPA" },
  { num: "100%", label: "University" },
  { num: "7%",   label: "Ivy League" },
  { num: "75%",  label: "Scholarships" },
];
const GROUPS = [
  { title: "Accreditation",  color: "#3182ce", bg: "#ebf8ff", items: RING1 },
  { title: "Curriculum",     color: "#276749", bg: "#f0fff4", items: RING2 },
  { title: "Learning Tools", color: "#b7791f", bg: "#fffff0", items: RING3 },
];

/* ═══════════════════════════════════════════
   MINI RING — decorative only, small centered SVG
   Shows three coloured arcs spinning — purely visual
═══════════════════════════════════════════ */
const CX = 60, CY = 60;
const R1o = 56, R1i = 44;
const R2o = 40, R2i = 30;
const R3o = 26, R3i = 18;
const GAP = 6;

function polar(r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}
function arc(ro, ri, s, e) {
  const p1 = polar(ro, s), p2 = polar(ro, e);
  const p3 = polar(ri, e), p4 = polar(ri, s);
  const la = e - s > 180 ? 1 : 0;
  return `M${p1.x} ${p1.y} A${ro} ${ro} 0 ${la} 1 ${p2.x} ${p2.y} L${p3.x} ${p3.y} A${ri} ${ri} 0 ${la} 0 ${p4.x} ${p4.y}Z`;
}

/* Pre-build the 3 rings as simple coloured segments */
const MINI_R1 = RING1.map((seg, i) => {
  const deg = 360 / RING1.length;
  return { path: arc(R1o, R1i, i * deg + GAP / 2, (i + 1) * deg - GAP / 2), color: seg.color };
});
const MINI_R2 = RING2.map((seg, i) => {
  const deg = 360 / RING2.length;
  return { path: arc(R2o, R2i, i * deg + GAP / 2, (i + 1) * deg - GAP / 2), color: seg.color };
});
const MINI_R3 = RING3.map((seg, i) => {
  const deg = 360 / RING3.length;
  return { path: arc(R3o, R3i, i * deg + GAP / 2, (i + 1) * deg - GAP / 2), color: seg.color };
});

/* ═══════════════════════════════════════════
   CSS
═══════════════════════════════════════════ */
const CSS = `
@keyframes mb-cw   { to { transform: rotate(360deg); } }
@keyframes mb-ccw  { to { transform: rotate(-360deg); } }
@keyframes mb-up   { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
@keyframes mb-dash { from { stroke-dashoffset:220; } to { stroke-dashoffset:0; } }
@keyframes mb-pulse{ 0%,100%{ transform:scale(1); opacity:1; } 50%{ transform:scale(1.6); opacity:.4; } }

.mb-page {
  position: relative; overflow: hidden;
  background: #f8fafc;
  font-family: system-ui, -apple-system, sans-serif;
  padding: 32px 0 26px;
  -webkit-font-smoothing: antialiased;
}
.mb-page::before {
  content: ''; position: absolute; inset: 0;
  background-image: radial-gradient(rgba(49,130,206,.065) 1px, transparent 1px);
  background-size: 20px 20px;
  pointer-events: none; z-index: 0;
}
.mb-blob { position: absolute; pointer-events: none; border-radius: 50%; }
.mb-inner { position: relative; z-index: 1; padding: 0 14px; max-width: 480px; margin: 0 auto; }

/* SCROLL REVEAL — class added by IntersectionObserver */
.mb-reveal {
  opacity: 0;
  animation-name: mb-up;
  animation-duration: .6s;
  animation-timing-function: cubic-bezier(.16,1,.3,1);
  animation-fill-mode: both;
}

/* ── Header ── */
.mb-head { text-align: center; margin-bottom: 22px; }
.mb-pill {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 9.5px; font-weight: 700; letter-spacing: .13em; text-transform: uppercase;
  color: #2b6cb0; background: #ebf8ff; border: 1px solid #bee3f8;
  padding: 5px 13px; border-radius: 100px; margin-bottom: 14px;
}
.mb-pill-dot {
  width: 5px; height: 5px; border-radius: 50%; background: #3182ce;
  animation-name: mb-pulse;
  animation-duration: 2.2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}
.mb-h1 {
  font-size: clamp(1.35rem, 6.5vw, 1.8rem);
  font-weight: 800; color: #1e293b; line-height: 1.22;
  margin: 0 0 10px; letter-spacing: -.022em;
}
.mb-h1-em { color: #1e52e1; position: relative; display: inline-block; }
.mb-desc { font-size: .82rem; color: #64748b; line-height: 1.72; margin: 0 auto; max-width: 320px; }

/* ── Stats ── */
.mb-stats {
  display: flex;
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 55%, #0369a1 100%);
  border-radius: 16px; padding: 14px 6px;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px rgba(30,64,175,.22);
}
.mb-stat { flex: 1; text-align: center; }
.mb-stat-n { font-size: 1.1rem; font-weight: 800; margin: 0 0 2px; color: #fff; line-height: 1; }
.mb-stat-l { font-size: 8px; color: rgba(255,255,255,.6); font-weight: 700; letter-spacing: .07em; text-transform: uppercase; }
.mb-stat-div { width: 1px; background: rgba(255,255,255,.14); align-self: stretch; margin: 3px 0; }

/* ── Hero visual strip (mini ring + label) ── */
.mb-hero {
  display: flex; align-items: center; gap: 16px;
  background: #fff;
  border: 1px solid rgba(49,130,206,.14);
  border-radius: 20px;
  padding: 16px 18px;
  margin-bottom: 20px;
  box-shadow: 0 2px 14px rgba(30,64,175,.08);
  overflow: hidden; position: relative;
}
.mb-hero::before {
  content: '';
  position: absolute; top: -40px; right: -40px;
  width: 130px; height: 130px; border-radius: 50%;
  background: radial-gradient(circle, rgba(191,219,254,.35) 0%, transparent 70%);
  pointer-events: none;
}
.mb-hero-svg-wrap { flex-shrink: 0; position: relative; width: 120px; height: 120px; }
.mb-hero-svg { width: 120px; height: 120px; overflow: visible; display: block; }
.mb-hero-core {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 28px; height: 28px; border-radius: 50%;
  background: linear-gradient(145deg, #1a365d, #1e40af);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 0 0 1.5px rgba(49,130,206,.4), 0 3px 12px rgba(30,64,175,.35);
  font-size: 12px;
}
.mb-mini-r1 {
  transform-origin: 60px 60px;
  animation-name: mb-cw;
  animation-duration: 22s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.mb-mini-r2 {
  transform-origin: 60px 60px;
  animation-name: mb-ccw;
  animation-duration: 16s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.mb-mini-r3 {
  transform-origin: 60px 60px;
  animation-name: mb-cw;
  animation-duration: 10s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.mb-hero-text { flex: 1; min-width: 0; }
.mb-hero-label {
  font-size: 9px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
  color: #3182ce; margin-bottom: 5px;
}
.mb-hero-title { font-size: 1rem; font-weight: 800; color: #1e293b; line-height: 1.25; margin-bottom: 6px; }
.mb-hero-chips { display: flex; flex-wrap: wrap; gap: 4px; }
.mb-hero-chip {
  font-size: 8.5px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase;
  padding: 3px 8px; border-radius: 99px;
}

/* ── Framework Groups — card grid ── */
.mb-groups { display: flex; flex-direction: column; gap: 14px; margin-bottom: 22px; }

.mb-group-card {
  background: #fff;
  border-radius: 18px;
  border: 1px solid rgba(0,0,0,.07);
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,.05);
}
.mb-group-header {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 14px 10px;
  border-bottom: 1px solid rgba(0,0,0,.05);
}
.mb-group-icon-wrap {
  width: 34px; height: 34px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.mb-group-meta { flex: 1; }
.mb-group-name { font-size: .78rem; font-weight: 800; color: #1e293b; line-height: 1; margin-bottom: 2px; }
.mb-group-sub  { font-size: 9px; font-weight: 600; color: #94a3b8; letter-spacing: .04em; }
.mb-group-badge {
  font-size: 9.5px; font-weight: 800; border-radius: 99px;
  padding: 3px 9px; flex-shrink: 0;
}

/* Item grid — 2 columns */
.mb-items-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: rgba(0,0,0,.05);
}
.mb-item-cell {
  background: #fff;
  padding: 10px 12px;
  display: flex; align-items: flex-start; gap: 8px;
  position: relative;
  transition: background .15s;
  min-height: 56px;
}
.mb-item-cell:active { background: #f8fafc; }
.mb-item-ico {
  width: 26px; height: 26px; border-radius: 7px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px;
}
.mb-item-body { flex: 1; min-width: 0; }
.mb-item-name {
  font-size: .68rem; font-weight: 700; color: #1e293b;
  line-height: 1.3; word-break: break-word;
}
.mb-item-ring {
  font-size: 7.5px; font-weight: 700; letter-spacing: .07em;
  text-transform: uppercase; margin-top: 2px;
}
/* Left border accent on each cell */
.mb-item-cell::before {
  content: ''; position: absolute; left: 0; top: 8px; bottom: 8px;
  width: 2.5px; border-radius: 2px;
}

/* ── Bottom ── */
.mb-bottom { text-align: center; padding-top: 2px; }
.mb-bottom-label { font-size: 9px; color: #94a3b8; font-weight: 700; letter-spacing: .11em; text-transform: uppercase; margin-bottom: 9px; }
.mb-bottom-dots { display: flex; justify-content: center; align-items: center; gap: 16px; flex-wrap: wrap; }
.mb-bottom-item { display: flex; align-items: center; gap: 5px; }
.mb-bottom-dot { width: 5px; height: 5px; border-radius: 50%; background: #93c5fd; }
.mb-bottom-text { font-size: 11px; font-weight: 700; color: #475569; }
`;

/* ═══════════════════════════════════════════
   Mini decorative ring SVG
═══════════════════════════════════════════ */
const MiniRing = memo(function MiniRing() {
  return (
    <svg className="mb-hero-svg" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g className="mb-mini-r1">
        {MINI_R1.map((s, i) => (
          <path key={i} d={s.path} fill={s.color} stroke="#fff" strokeWidth="1" opacity=".9" />
        ))}
      </g>
      <g className="mb-mini-r2">
        {MINI_R2.map((s, i) => (
          <path key={i} d={s.path} fill={s.color} stroke="#fff" strokeWidth="1" opacity=".85" />
        ))}
      </g>
      <g className="mb-mini-r3">
        {MINI_R3.map((s, i) => (
          <path key={i} d={s.path} fill={s.color} stroke="#fff" strokeWidth="1" opacity=".9" />
        ))}
      </g>
      <circle cx={CX} cy={CY} r={14} fill="#eff6ff" stroke="rgba(49,130,206,.2)" strokeWidth="1" />
    </svg>
  );
});

/* ═══════════════════════════════════════════
   Item cell
═══════════════════════════════════════════ */
const ItemCell = memo(function ItemCell({ item }) {
  const Icon = item.icon;
  return (
    <div
      className="mb-item-cell"
      style={{ "--accent": item.color }}
    >
      <style>{`.mb-item-cell::before { background: var(--accent, #3182ce); }`}</style>
      <div className="mb-item-ico" style={{ background: item.light }}>
        <Icon size={12} color={item.color} strokeWidth={2.3} />
      </div>
      <div className="mb-item-body">
        <div className="mb-item-name">{item.label}</div>
        <div className="mb-item-ring" style={{ color: item.color }}>{item.ring}</div>
      </div>
    </div>
  );
});

/* ═══════════════════════════════════════════
   Group card (with icon representative)
═══════════════════════════════════════════ */
function GroupCard({ group, groupRef, animDelay }) {
  // Pick a representative icon from first item
  const RepIcon = group.items[0].icon;
  return (
    <div
      className="mb-group-card"
      ref={groupRef}
      style={{ animationDelay: animDelay }}
    >
      <div className="mb-group-header">
        <div className="mb-group-icon-wrap" style={{ background: group.bg }}>
          <RepIcon size={16} color={group.color} strokeWidth={2.2} />
        </div>
        <div className="mb-group-meta">
          <div className="mb-group-name">{group.title}</div>
          <div className="mb-group-sub">{group.items.length} programmes</div>
        </div>
        <div
          className="mb-group-badge"
          style={{ background: group.bg, color: group.color }}
        >
          {group.items.length}
        </div>
      </div>
      <div className="mb-items-grid">
        {group.items.map(item => (
          <ItemCell key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Main component
═══════════════════════════════════════════ */
export default function FrameworkMobile() {
  const headRef   = useRef(null);
  const statsRef  = useRef(null);
  const heroRef   = useRef(null);
  const group0Ref = useRef(null);
  const group1Ref = useRef(null);
  const group2Ref = useRef(null);
  const bottomRef = useRef(null);

  const [mounted,  setMounted]  = useState(false);
  const [dashAnim, setDashAnim] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const els = [
      { el: headRef.current,   delay: 0,    onVis: () => setDashAnim(true) },
      { el: statsRef.current,  delay: 80  },
      { el: heroRef.current,   delay: 120 },
      { el: group0Ref.current, delay: 60  },
      { el: group1Ref.current, delay: 120 },
      { el: group2Ref.current, delay: 180 },
      { el: bottomRef.current, delay: 240 },
    ];
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const t = els.find(t => t.el === entry.target);
        setTimeout(() => {
          entry.target.classList.add("mb-reveal");
          t?.onVis?.();
        }, t?.delay ?? 0);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.07 });
    els.forEach(({ el }) => el && io.observe(el));
    return () => io.disconnect();
  }, [mounted]);

  return (
    <>
      <style>{CSS}</style>
      <div className="mb-page">
        {/* ambient blobs */}
        <div aria-hidden className="mb-blob" style={{
          top: -50, right: -60, width: 220, height: 220,
          background: "radial-gradient(circle, rgba(191,219,254,.26) 0%, transparent 70%)",
        }} />
        <div aria-hidden className="mb-blob" style={{
          bottom: -40, left: -50, width: 190, height: 190,
          background: "radial-gradient(circle, rgba(167,243,208,.18) 0%, transparent 70%)",
        }} />

        <div className="mb-inner">

          {/* ── HEADER ── */}
          <header ref={headRef} className="mb-head">
            <div className="mb-pill">
              <span className="mb-pill-dot" aria-hidden />
              Learning Framework
            </div>
            <h1 className="mb-h1">
              Traditional Schooling<br />
              Doesn&apos;t Fit{" "}
              <span className="mb-h1-em">
                Every Child
                <svg
                  style={{ position:"absolute", bottom:-3, left:0, width:"100%", pointerEvents:"none" }}
                  height="6" viewBox="0 0 200 6" preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg" aria-hidden
                >
                  <path
                    d="M0 5 Q50 0 100 4 Q150 8 200 3"
                    stroke="#1e52e1" strokeWidth="2.5" fill="none" strokeLinecap="round"
                    style={{
                      strokeDasharray: 220,
                      animationName: dashAnim ? "mb-dash" : "none",
                      animationDuration: "1.1s",
                      animationTimingFunction: "ease",
                      animationDelay: "0.3s",
                      animationFillMode: "both",
                    }}
                  />
                </svg>
              </span>
            </h1>
            <p className="mb-desc">
              Whether your family travels, relocates, or needs flexibility — education should
              adapt to your child&apos;s life, not the other way around.
            </p>
          </header>

          {/* ── STATS ── */}
          <div ref={statsRef} className="mb-stats">
            {STATS.map(({ num, label }, i) => (
              <Fragment key={label}>
                {i > 0 && <div className="mb-stat-div" />}
                <div className="mb-stat">
                  <p className="mb-stat-n">{num}</p>
                  <p className="mb-stat-l">{label}</p>
                </div>
              </Fragment>
            ))}
          </div>

          {/* ── HERO STRIP — mini ring + copy ── */}
          <div ref={heroRef} className="mb-hero">
            <div className="mb-hero-svg-wrap">
              {mounted && <MiniRing />}
              {mounted && (
                <div className="mb-hero-core" aria-hidden>💡</div>
              )}
            </div>
            <div className="mb-hero-text">
              <div className="mb-hero-label">Interactive Framework</div>
              <div className="mb-hero-title">3 Rings · 12 Pillars</div>
              <div className="mb-hero-chips">
                {["Accredited", "AP Ready", "Flexible", "EdTech"].map(c => (
                  <span key={c} className="mb-hero-chip"
                    style={{ background: "#ebf8ff", color: "#2b6cb0" }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── FRAMEWORK GROUPS ── */}
          <div className="mb-groups">
            <GroupCard group={GROUPS[0]} groupRef={group0Ref} animDelay="0s"    />
            <GroupCard group={GROUPS[1]} groupRef={group1Ref} animDelay="0.07s" />
            <GroupCard group={GROUPS[2]} groupRef={group2Ref} animDelay="0.14s" />
          </div>

          {/* ── BOTTOM ── */}
          <div ref={bottomRef} className="mb-bottom">
            <div className="mb-bottom-label">Recognized by</div>
            <div className="mb-bottom-dots">
              {["190+ Countries", "15,000+ Students", "Top Universities"].map(item => (
                <div key={item} className="mb-bottom-item">
                  <span className="mb-bottom-dot" aria-hidden />
                  <span className="mb-bottom-text">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}