

import { useEffect, useRef, useState, useCallback, useMemo, memo } from "react";
import {
  Users, Shield, Coins, Briefcase, FolderOpen,
  Award, Brain, GraduationCap, Wrench,
  Settings, Video, Lightbulb,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   STATIC DATA — module-level, zero re-allocation
══════════════════════════════════════════════════════════════ */
const RING1 = [
  { label: "WASC Accredited",        icon: Users,          color: "#e53e3e", light: "#fff5f5" },
  { label: "NEASC Accredited",       icon: Shield,         color: "#dd6b20", light: "#fffaf0" },
  { label: "Cognia Accredited",      icon: Coins,          color: "#285e61", light: "#e6fffa" },
  { label: "University Pathways",    icon: Briefcase,      color: "#38a169", light: "#f0fff4" },
  { label: "Project-Based Learning", icon: FolderOpen,     color: "#3182ce", light: "#ebf8ff" },
];
const RING2 = [
  { label: "AP Courses",             icon: Award,          color: "#c53030", light: "#fff5f5" },
  { label: "Personalized Learning",  icon: Brain,          color: "#b7791f", light: "#fffff0" },
  { label: "American Curriculum",    icon: GraduationCap,  color: "#276749", light: "#f0fff4" },
  { label: "Flexible Learning",      icon: Wrench,         color: "#2b6cb0", light: "#ebf8ff" },
];
const RING3 = [
  { label: "EdTech Tools",           icon: Settings,       color: "#3182ce", light: "#ebf8ff" },
  { label: "Live Online Classes",    icon: Video,          color: "#38a169", light: "#f0fff4" },
  { label: "Future-Ready Skills",    icon: Lightbulb,      color: "#d69e2e", light: "#fffff0" },
];
const STATS = [
  { num: "3.8",  label: "Student Achievement"       },
  { num: "100%", label: "University Acceptance"      },
  { num: "7%",   label: "Ivy League Acceptance"      },
  { num: "75%",  label: "International Scholarships" },
];
const LEFT_CARDS  = [...RING1, RING2[0]];
const RIGHT_CARDS = [...RING2.slice(1), ...RING3];

/* ══════════════════════════════════════════════════════════════
   SVG GEOMETRY — pure, module-level, computed once
══════════════════════════════════════════════════════════════ */
const CX = 300, CY = 300;
const R1o = 290, R1i = 220;
const R2o = 216, R2i = 156;
const R3o = 152, R3i = 98;
const GAP = 1.8;

function polar(r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}
function annularPath(ro, ri, s, e) {
  const p1 = polar(ro, s), p2 = polar(ro, e);
  const p3 = polar(ri, e), p4 = polar(ri, s);
  const la = e - s > 180 ? 1 : 0;
  return `M${p1.x} ${p1.y} A${ro} ${ro} 0 ${la} 1 ${p2.x} ${p2.y} L${p3.x} ${p3.y} A${ri} ${ri} 0 ${la} 0 ${p4.x} ${p4.y}Z`;
}
function arcDef(r, s, e, id) {
  const mid = (s + e) / 2, span = (e - s) * 0.9;
  const a = mid - span / 2, b = mid + span / 2;
  const bottom = mid > 90 && mid < 270;
  const pa = polar(r, a), pb = polar(r, b);
  const la = b - a > 180 ? 1 : 0;
  return bottom
    ? `<path id="${id}" d="M${pb.x} ${pb.y} A${r} ${r} 0 ${la} 0 ${pa.x} ${pa.y}"/>`
    : `<path id="${id}" d="M${pa.x} ${pa.y} A${r} ${r} 0 ${la} 1 ${pb.x} ${pb.y}"/>`;
}
function buildRing(segs, ro, ri, textR, dark, cls) {
  const n = segs.length, deg = 360 / n;
  return segs.map((seg, i) => {
    const s = i * deg + GAP / 2, e = (i + 1) * deg - GAP / 2;
    return { seg, s, e, id: `dt-${cls}-${i}`, ro, ri, textR, dark };
  });
}
const RING1_GEO = buildRing(RING1, R1o, R1i, (R1o + R1i) / 2 - 4, false, "r1");
const RING2_GEO = buildRing(RING2, R2o, R2i, (R2o + R2i) / 2 - 3, true,  "r2");
const RING3_GEO = buildRing(RING3, R3o, R3i, (R3o + R3i) / 2 - 2, false, "r3");

/* Pre-build all arc defs string — never changes */
const DEFS_MARKUP = [...RING1_GEO, ...RING2_GEO, ...RING3_GEO]
  .map(({ s, e, id, textR }) => arcDef(textR, s, e, id))
  .join("");

/* ══════════════════════════════════════════════════════════════
   CSS — single injected string
══════════════════════════════════════════════════════════════ */
const CSS = `
@keyframes dt-cw   { to { transform:rotate(360deg);  } }
@keyframes dt-ccw  { to { transform:rotate(-360deg); } }
@keyframes dt-up   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
@keyframes dt-lx   { from{opacity:0;transform:translateX(-32px)} to{opacity:1;transform:translateX(0)} }
@keyframes dt-rx   { from{opacity:0;transform:translateX(32px)} to{opacity:1;transform:translateX(0)} }
@keyframes dt-sc   { from{opacity:0;transform:scale(.9) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }
@keyframes dt-dash { from{stroke-dashoffset:220} to{stroke-dashoffset:0} }
@keyframes dt-pulse{ 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.6);opacity:.5} }

.dt-page{position:relative;overflow-x:hidden;background:#f8fafc;font-family:var(--font-sans,system-ui,sans-serif)}
.dt-page::before{content:'';position:absolute;inset:0;background-image:radial-gradient(rgba(49,130,206,.09) 1px,transparent 1px);background-size:24px 24px;pointer-events:none;z-index:0}
.dt-inner{position:relative;z-index:1;max-width:1200px;margin:0 auto;padding:52px 20px 64px}

.dt-head{text-align:center;margin-bottom:44px;opacity:0}
.dt-head.vis{animation:dt-up .72s cubic-bezier(.16,1,.3,1) both}
.dt-pill{display:inline-flex;align-items:center;gap:6px;font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#2b6cb0;background:#ebf8ff;border:1px solid #bee3f8;padding:5px 14px;border-radius:100px;margin-bottom:16px}
.dt-pill-dot{width:6px;height:6px;border-radius:50%;background:#3182ce;display:inline-block;animation:dt-pulse 2s ease-in-out infinite}
.dt-h1{font-size:clamp(1.7rem,3vw,2.2rem);font-weight:800;color:#1e293b;line-height:1.2;margin:0 0 12px;letter-spacing:-.025em;font-family:var(--font-display,Georgia,serif)}
.dt-h1 em{color:#1e52e1;font-style:normal;position:relative;display:inline-block}
.dt-desc{font-size:1rem;color:#64748b;max-width:580px;margin:0 auto;line-height:1.75}

.dt-body{display:grid;grid-template-columns:220px 1fr 220px;gap:20px;align-items:center}
.dt-col{display:flex;flex-direction:column;gap:7px;opacity:0}
.dt-col.left.vis {animation:dt-lx .72s cubic-bezier(.16,1,.3,1) .1s  both}
.dt-col.right.vis{animation:dt-rx .72s cubic-bezier(.16,1,.3,1) .2s  both}

.dt-card{background:#fff;border-radius:12px;padding:9px 11px 9px 13px;border:1px solid rgba(0,0,0,.07);display:flex;align-items:center;gap:9px;position:relative;overflow:hidden;cursor:default;transition:transform .18s ease,box-shadow .18s ease;will-change:transform}
.dt-card:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.08)}
.dt-card-bar{position:absolute;left:0;top:0;bottom:0;width:3px;border-radius:3px 0 0 3px}
.dt-card-ico{width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.dt-card-ring{font-size:8.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:1px}
.dt-card-name{font-size:.72rem;font-weight:600;color:#1e293b;line-height:1.3}
.dt-dot{position:absolute;right:-3px;top:50%;transform:translateY(-50%);width:6px;height:6px;border-radius:50%;border:1.5px solid #fff}
.dt-col.right .dt-dot{right:auto;left:-3px}

.dt-diag{display:flex;align-items:center;justify-content:center;opacity:0}
.dt-diag.vis{animation:dt-sc .9s cubic-bezier(.16,1,.3,1) .05s both}
.dt-tilt{perspective:1400px;position:relative;width:100%;max-width:540px}
.dt-tilt-inner{transition:transform .1s ease-out;transform-style:preserve-3d}
.dt-svg{width:100%;aspect-ratio:1;overflow:visible}

.r1d{animation:dt-cw  38s linear infinite;transform-origin:300px 300px}
.r2d{animation:dt-ccw 28s linear infinite;transform-origin:300px 300px}
.r3d{animation:dt-cw  18s linear infinite;transform-origin:300px 300px}
.dt-seg{cursor:pointer}
.dt-seg path{transition:opacity .15s}
.dt-seg:hover path:first-child{opacity:.82}

.dt-core{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:20;pointer-events:none}
.dt-core-circle{width:108px;height:108px;border-radius:50%;background:linear-gradient(145deg,#1a365d 0%,#1e40af 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:12px;box-shadow:0 0 0 1px rgba(49,130,206,.35),0 8px 32px rgba(30,64,175,.3)}
.dt-core-icon{font-size:20px;margin-bottom:4px}
.dt-core-title{font-size:10.5px;font-weight:700;color:#fff;letter-spacing:.04em}
.dt-core-sub{font-size:7.5px;color:rgba(255,255,255,.5);letter-spacing:.12em;text-transform:uppercase;margin-top:2px;font-weight:600}
.dt-hint{position:absolute;bottom:-20px;left:50%;transform:translateX(-50%);font-size:9px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#a0aec0;white-space:nowrap}

.dt-stats{display:flex;justify-content:center;max-width:580px;margin:36px auto 0;background:#fff;border:1px solid rgba(0,0,0,.07);border-radius:14px;overflow:hidden;opacity:0;box-shadow:0 2px 16px rgba(0,0,0,.05)}
.dt-stats.vis{animation:dt-up .72s cubic-bezier(.16,1,.3,1) .35s both}
.dt-stat{flex:1;padding:18px 10px;text-align:center;border-right:1px solid rgba(0,0,0,.06);transition:background .2s}
.dt-stat:last-child{border-right:none}
.dt-stat:hover{background:#f8faff}
.dt-stat-n{font-size:1.55rem;font-weight:800;line-height:1;color:#1e40af;margin-bottom:4px;font-family:var(--font-display,Georgia,serif)}
.dt-stat-l{font-size:.6rem;color:#94a3b8;font-weight:700;letter-spacing:.08em;text-transform:uppercase}

.dt-tip{position:fixed;background:#1e293b;color:#f1f5f9;padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;pointer-events:none;z-index:9999;white-space:nowrap;transform:translate(-50%,0);opacity:0;transition:opacity .12s,transform .12s}
.dt-tip.on{opacity:1;transform:translate(-50%,-4px)}
.dt-tip::after{content:'';position:absolute;top:100%;left:50%;transform:translateX(-50%);border:5px solid transparent;border-top-color:#1e293b}
`;

/* ══════════════════════════════════════════════════════════════
   SUB-COMPONENTS — memo to prevent unnecessary re-renders
══════════════════════════════════════════════════════════════ */
const RingSegment = memo(function RingSegment({ geo, onEnter, onMove, onLeave }) {
  const { seg, s, e, ro, ri, dark } = geo;
  const fontSize = ro > 200 ? 16 : ro > 150 ? 14 : 13;
  return (
    <g className="dt-seg" onMouseEnter={onEnter} onMouseMove={onMove} onMouseLeave={onLeave}>
      <path d={annularPath(ro, ri, s, e)}
        fill={dark ? seg.light : seg.color}
        stroke={dark ? seg.color : "#fff"}
        strokeWidth={dark ? "1.2" : "2"} />
      <path d={annularPath(ro, ri, s, e)}
        fill={dark ? seg.color : "url(#dt-shimmer)"}
        opacity={dark ? "0.07" : "0.14"} stroke="none" />
      <text fontSize={fontSize} fontWeight="600" fontFamily="system-ui,sans-serif"
        fill={dark ? seg.color : "#fff"} letterSpacing="0.02em">
        <textPath href={`#${geo.id}`} startOffset="50%" textAnchor="middle">
          {seg.label.toUpperCase()}
        </textPath>
      </text>
    </g>
  );
});

const Card = memo(function Card({ seg, ring }) {
  const Icon = seg.icon;
  return (
    <div className="dt-card" style={{ borderColor: seg.color + "2a" }}>
      <div className="dt-card-bar" style={{ background: seg.color }} />
      <div className="dt-card-ico" style={{ background: seg.light }}>
        <Icon size={13} color={seg.color} strokeWidth={2.2} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="dt-card-ring" style={{ color: seg.color }}>{ring}</div>
        <div className="dt-card-name">{seg.label}</div>
      </div>
      <div className="dt-dot" style={{ background: seg.color }} />
    </div>
  );
});

/* ══════════════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════════════ */
export default function FrameworkDesktop() {
  const headRef  = useRef(null);
  const leftRef  = useRef(null);
  const rightRef = useRef(null);
  const diagRef  = useRef(null);
  const statsRef = useRef(null);
  const tiltRef  = useRef(null);

  const [mounted,   setMounted]   = useState(false);
  const [paused,    setPaused]    = useState(false);
  const [dashAnim,  setDashAnim]  = useState(false);
  const [tip, setTip] = useState({ text: "", x: 0, y: 0, on: false });

  useEffect(() => { setMounted(true); }, []);

  /* Single IntersectionObserver for all scroll reveals */
  useEffect(() => {
    const targets = [
      { el: headRef.current,  delay: 0,   onVis: () => setDashAnim(true) },
      { el: leftRef.current,  delay: 100  },
      { el: diagRef.current,  delay: 50   },
      { el: rightRef.current, delay: 200  },
      { el: statsRef.current, delay: 350  },
    ];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const t = targets.find(t => t.el === entry.target);
        setTimeout(() => {
          entry.target.classList.add("vis");
          t?.onVis?.();
        }, t?.delay ?? 0);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    targets.forEach(({ el }) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  /* RAF-throttled tilt — no layout thrash */
  useEffect(() => {
    const wrap = tiltRef.current;
    if (!wrap) return;
    const inner = wrap.querySelector(".dt-tilt-inner");
    let raf = null;
    const onMove = (e) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = wrap.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
        const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
        inner.style.transform = `rotateY(${dx * 5}deg) rotateX(${-dy * 5}deg)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      inner.style.transform = "rotateY(0) rotateX(0)";
    };
    wrap.addEventListener("mousemove", onMove, { passive: true });
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* Stable tooltip handlers */
  const showTip = useCallback((label) => (e) =>
    setTip({ text: label, x: e.clientX, y: e.clientY - 46, on: true }), []);
  const moveTip = useCallback((e) =>
    setTip(t => t.on ? { ...t, x: e.clientX, y: e.clientY - 46 } : t), []);
  const hideTip = useCallback(() =>
    setTip(t => ({ ...t, on: false })), []);

  const pauseStyle = useMemo(() => ({
    animationPlayState: paused ? "paused" : "running",
  }), [paused]);

  return (
    <>
      <style>{CSS}</style>

      <div className={`dt-tip${tip.on ? " on" : ""}`}
        style={{ top: tip.y, left: tip.x }} aria-hidden="true">
        {tip.text}
      </div>

      <div className="dt-page">
        <svg aria-hidden="true" style={{ position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0,overflow:"hidden" }}
          viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="1200" cy="80"  rx="480" ry="360" fill="rgba(49,130,206,.04)"  />
          <ellipse cx="100"  cy="820" rx="400" ry="300" fill="rgba(229,62,62,.03)"   />
          <ellipse cx="700"  cy="900" rx="340" ry="220" fill="rgba(56,161,105,.03)"  />
        </svg>

        <div className="dt-inner">

          {/* HEADER */}
          <div ref={headRef} className="dt-head">
            <div className="dt-pill">
              <span className="dt-pill-dot" />
              Learning Framework
            </div>
            <h1 className="dt-h1">
              Traditional Schooling Doesn&apos;t Fit{" "}
              <em>
                Every Child Anymore
                <svg style={{ position:"absolute",bottom:-3,left:0,width:"100%" }}
                  height="6" viewBox="0 0 200 6" preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M0 5 Q50 0 100 4 Q150 8 200 3"
                    stroke="#1e52e1" strokeWidth="2.8" fill="none" strokeLinecap="round"
                    style={{
                      strokeDasharray: 220,
                      animationName: dashAnim ? "dt-dash" : "none",
                      animationDuration: "1.1s",
                      animationTimingFunction: "ease",
                      animationDelay: "0.4s",
                      animationFillMode: "both",
                    }} />
                </svg>
              </em>
            </h1>
            <p className="dt-desc">
              Whether your family travels, relocates, or needs flexibility — education should adapt
              to your child&apos;s life, not the other way around.
            </p>
          </div>

          {/* BODY */}
          <div className="dt-body">

            {/* LEFT */}
            <div ref={leftRef} className="dt-col left">
              {LEFT_CARDS.map((s, i) => (
                <Card key={s.label} seg={s}
                  ring={i < RING1.length ? `Outer · ${i + 1}` : "Middle · 1"} />
              ))}
            </div>

            {/* DIAGRAM */}
            <div ref={diagRef} className="dt-diag">
              <div className="dt-tilt" ref={tiltRef}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}>
                <div className="dt-tilt-inner">
                  <svg className="dt-svg" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="dt-shimmer" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%"   stopColor="#fff" stopOpacity=".4" />
                        <stop offset="50%"  stopColor="#fff" stopOpacity="0"  />
                        <stop offset="100%" stopColor="#fff" stopOpacity=".2" />
                      </linearGradient>
                      {mounted && <g dangerouslySetInnerHTML={{ __html: DEFS_MARKUP }} />}
                    </defs>

                    <circle cx={CX} cy={CY} r={R1o+9}  fill="none" stroke="#3182ce" strokeWidth=".7" strokeDasharray="5 9"  opacity=".14" />
                    <circle cx={CX} cy={CY} r={R1o+20} fill="none" stroke="#3182ce" strokeWidth=".4" strokeDasharray="2 14" opacity=".08" />

                    {mounted && <>
                      <g className="r1d" style={pauseStyle}>
                        {RING1_GEO.map(geo => (
                          <RingSegment key={geo.id} geo={geo}
                            onEnter={showTip(geo.seg.label)} onMove={moveTip} onLeave={hideTip} />
                        ))}
                        <circle cx={CX} cy={CY} r={R1o} fill="none" stroke="rgba(255,255,255,.45)" strokeWidth="1.8" />
                        <circle cx={CX} cy={CY} r={R1i} fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1.2" />
                      </g>
                      <g className="r2d" style={pauseStyle}>
                        {RING2_GEO.map(geo => (
                          <RingSegment key={geo.id} geo={geo}
                            onEnter={showTip(geo.seg.label)} onMove={moveTip} onLeave={hideTip} />
                        ))}
                        <circle cx={CX} cy={CY} r={R2o} fill="none" stroke="rgba(255,255,255,.40)" strokeWidth="1.5" />
                        <circle cx={CX} cy={CY} r={R2i} fill="none" stroke="rgba(255,255,255,.30)" strokeWidth="1"   />
                      </g>
                      <g className="r3d" style={pauseStyle}>
                        {RING3_GEO.map(geo => (
                          <RingSegment key={geo.id} geo={geo}
                            onEnter={showTip(geo.seg.label)} onMove={moveTip} onLeave={hideTip} />
                        ))}
                        <circle cx={CX} cy={CY} r={R3o} fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1.2" />
                        <circle cx={CX} cy={CY} r={R3i} fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="1"   />
                      </g>
                    </>}

                    <circle cx={CX} cy={CY} r={R3i-2}  fill="#eff6ff" stroke="rgba(49,130,206,.25)" strokeWidth="1.2" />
                    <circle cx={CX} cy={CY} r={R3i-14} fill="none"    stroke="rgba(49,130,206,.08)"  strokeWidth="9"   />
                  </svg>
                </div>

                {mounted && (
                  <div className="dt-core">
                    <div className="dt-core-circle">
                      <div className="dt-core-icon">💡</div>
                      <div className="dt-core-title">Framework</div>
                      <div className="dt-core-sub">Interactive</div>
                    </div>
                  </div>
                )}
                <div className="dt-hint">
                  {paused ? "▶ Paused — move away to resume" : "Hover to pause · tilt to explore"}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div ref={rightRef} className="dt-col right">
              {RIGHT_CARDS.map((s, i) => (
                <Card key={s.label} seg={s}
                  ring={i < RING2.length - 1
                    ? `Middle · ${i + 2}`
                    : `Inner · ${i - (RING2.length - 2) + 1}`} />
              ))}
            </div>
          </div>

          {/* STATS */}
          <div ref={statsRef} className="dt-stats">
            {STATS.map(({ num, label }) => (
              <div className="dt-stat" key={label}>
                <div className="dt-stat-n">{num}</div>
                <div className="dt-stat-l">{label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
