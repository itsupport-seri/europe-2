"use client";
import { useEffect, useRef, useState, Fragment } from "react";
import { Check, ArrowRight, Users, BookOpen, Laptop } from "lucide-react";

/* ═══════════════════════════════════════
   STATIC DATA
═══════════════════════════════════════ */
const ACCENT = "#0e7490";

const plans = [
  {
    tag: "1 Teacher · 1 Student",
    title: "One-to-One",
    desc: "100% flexible schedule with personalized teacher support.",
    icon: Users,
    color: "#0e7490",
    light: "#ecfeff",
    border: "#a5f3fc",
    features: [
      "Your schedule, your timezone",
      "6 parent-teacher meetings",
      "Live 60-minute classes",
      "Enroll any time, year-round",
    ],
  },
  {
    tag: "10-15 Students Per Class",
    title: "Group Learning",
    desc: "Structured live classes with peer interaction and career guidance.",
    icon: BookOpen,
    color: "#1d4ed8",
    light: "#eff6ff",
    border: "#bfdbfe",
    features: [
      "Fixed schedule",
      "3 parent-teacher meetings",
      "Live 60-minute classes",
      "Career counselling",
    ],
  },
  {
    tag: "Best of Both Worlds",
    title: "Self-Learning Plus",
    desc: "Self-paced learning with dedicated teacher guidance and doubt-clearing sessions.",
    icon: Laptop,
    color: "#15803d",
    light: "#f0fdf4",
    border: "#bbf7d0",
    features: [
      "500+ self-paced courses",
      "Monday-Friday support",
      "1 live class per week",
      "No assignment deadlines",
    ],
  },
];

/* ═══════════════════════════════════════
   CSS — all longhand, no shorthand
═══════════════════════════════════════ */
const CSS = `
@keyframes ls-up   { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
@keyframes ls-dash { from { stroke-dashoffset:500; } to { stroke-dashoffset:0; } }
@keyframes ls-pulse{ 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:.45; transform:scale(1.55); } }

.ls-page {
  position: relative;
  overflow: hidden;
  background: #fff;
  font-family: var(--font-dm, system-ui, sans-serif);
  padding: 36px 0 52px;
  -webkit-font-smoothing: antialiased;
}
.ls-page::before, .ls-page::after {
  content: ''; position: absolute; left: 0; right: 0; height: 1px;
  background: linear-gradient(to right, transparent, #bfdbfe, transparent);
}
.ls-page::before { top: 0; }
.ls-page::after  { bottom: 0; }

.ls-inner {
  position: relative; z-index: 1;
  padding: 0 16px; max-width: 480px; margin: 0 auto;
}

/* scroll reveal */
.ls-reveal {
  opacity: 0;
  animation-name: ls-up;
  animation-duration: .6s;
  animation-timing-function: cubic-bezier(.16,1,.3,1);
  animation-fill-mode: both;
}

/* ── Header ── */
.ls-head { text-align: center; margin-bottom: 26px; }
.ls-pill {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 9.5px; font-weight: 700; letter-spacing: .13em; text-transform: uppercase;
  color: #0e7490; background: #ecfeff; border: 1px solid #a5f3fc;
  padding: 5px 13px; border-radius: 100px; margin-bottom: 14px;
}
.ls-pill-dot {
  width: 5px; height: 5px; border-radius: 50%; background: #0e7490;
  animation-name: ls-pulse;
  animation-duration: 2.2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}
.ls-h2 {
  font-size: clamp(1.5rem, 7vw, 1.9rem);
  font-weight: 800; color: #0f172a; line-height: 1.2;
  margin: 0 0 10px; letter-spacing: -.022em;
}
.ls-h2-em { color: #1e52e1; position: relative; display: inline-block; }
.ls-desc { font-size: .84rem; color: #475569; line-height: 1.7; margin: 0 auto; max-width: 300px; }

/* ── Plan cards ── */
.ls-cards { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }

.ls-card {
  background: #fff;
  border-radius: 18px;
  border-width: 1px;
  border-style: solid;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,.06);
  position: relative;
}
.ls-card-top-bar {
  height: 3px; width: 100%;
}
.ls-card-body { padding: 14px 16px 16px; }

.ls-card-header { display: flex; align-items: flex-start; gap: 11px; margin-bottom: 10px; }
.ls-card-icon {
  width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.ls-card-meta { flex: 1; min-width: 0; }
.ls-card-tag {
  font-size: 8.5px; font-weight: 700; letter-spacing: .1em;
  text-transform: uppercase; margin-bottom: 3px;
}
.ls-card-title {
  font-size: 1.05rem; font-weight: 800;
  color: #0f172a; line-height: 1.2; margin: 0;
}
.ls-card-desc {
  font-size: .78rem; color: #64748b; line-height: 1.65;
  margin-bottom: 12px; padding-bottom: 12px;
  border-bottom: 1px solid rgba(0,0,0,.06);
}
.ls-features { display: flex; flex-direction: column; gap: 8px; }
.ls-feature { display: flex; align-items: flex-start; gap: 8px; }
.ls-feature-check {
  width: 16px; height: 16px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; margin-top: 1px;
}
.ls-feature-text { font-size: .76rem; font-weight: 600; color: #334155; line-height: 1.4; }

/* ── Bottom CTA ── */
.ls-bottom { display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; }
.ls-meta { font-size: .78rem; color: #94a3b8; font-weight: 600; letter-spacing: .02em; }
.ls-cta {
  display: inline-flex; align-items: center; gap: 7px;
  border-radius: 100px; background: #2563eb;
  padding: 12px 26px;
  font-size: .82rem; font-weight: 700; color: #fff;
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(37,99,235,.3);
  transition: background .18s, box-shadow .18s, transform .18s;
  -webkit-tap-highlight-color: transparent;
  min-height: 44px;
}
.ls-cta:active { background: #1d4ed8; transform: scale(.98); box-shadow: 0 2px 8px rgba(37,99,235,.25); }
`;

/* ═══════════════════════════════════════
   useInView hook
═══════════════════════════════════════ */
function useInView(threshold) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: threshold || 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ═══════════════════════════════════════
   Plan card component
═══════════════════════════════════════ */
function PlanCard({ plan, animDelay, cardRef }) {
  const Icon = plan.icon;
  return (
    <div
      className="ls-card"
      ref={cardRef}
      style={{ borderColor: plan.border, animationDelay: animDelay }}
    >
      <div className="ls-card-top-bar" style={{ background: plan.color }} />
      <div className="ls-card-body">
        <div className="ls-card-header">
          <div className="ls-card-icon" style={{ background: plan.light }}>
            <Icon size={18} color={plan.color} strokeWidth={2.2} />
          </div>
          <div className="ls-card-meta">
            <div className="ls-card-tag" style={{ color: plan.color }}>{plan.tag}</div>
            <h3 className="ls-card-title">{plan.title}</h3>
          </div>
        </div>
        <p className="ls-card-desc">{plan.desc}</p>
        <ul className="ls-features">
          {plan.features.map(f => (
            <li key={f} className="ls-feature">
              <div className="ls-feature-check" style={{ background: plan.light }}>
                <Check size={9} color={plan.color} strokeWidth={3} />
              </div>
              <span className="ls-feature-text">{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   Main component
═══════════════════════════════════════ */
export default function LearningStyleMobile() {
  const headRef  = useRef(null);
  const card0Ref = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const bottomRef = useRef(null);

  const [dashAnim, setDashAnim] = useState(false);

  useEffect(() => {
    const targets = [
      { el: headRef.current,  delay: 0,   onVis: () => setDashAnim(true) },
      { el: card0Ref.current, delay: 40  },
      { el: card1Ref.current, delay: 100 },
      { el: card2Ref.current, delay: 160 },
      { el: bottomRef.current,delay: 80  },
    ];
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const t = targets.find(t => t.el === entry.target);
        setTimeout(() => {
          entry.target.classList.add("ls-reveal");
          t?.onVis?.();
        }, t?.delay ?? 0);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.07 });
    targets.forEach(({ el }) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const cardRefs = [card0Ref, card1Ref, card2Ref];
  const cardDelays = ["0s", "0.06s", "0.12s"];

  return (
    <>
      <style>{CSS}</style>
      <section
        id="learning-style"
        aria-labelledby="ls-title"
        className="ls-page"
      >
        <div className="ls-inner">

          {/* ── HEADER ── */}
          <header ref={headRef} className="ls-head">
            <div className="ls-pill">
              <span className="ls-pill-dot" aria-hidden="true" />
              Learning Plans
            </div>
            <h2 id="ls-title" className="ls-h2">
              One School.{" "}
              <span className="ls-h2-em">
                Multiple Paths.
                <svg
                  style={{ position:"absolute", bottom:-3, left:0, width:"100%", pointerEvents:"none" }}
                  height="6" viewBox="0 0 200 6" preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                >
                  <path
                    d="M0 5 Q50 0 100 4 Q150 8 200 3"
                    stroke="#1e52e1" strokeWidth="2.5" fill="none" strokeLinecap="round"
                    style={{
                      strokeDasharray: 220,
                      animationName: dashAnim ? "ls-dash" : "none",
                      animationDuration: "1.1s",
                      animationTimingFunction: "ease",
                      animationDelay: "0.3s",
                      animationFillMode: "both",
                    }}
                  />
                </svg>
              </span>
            </h2>
            <p className="ls-desc">
              Choose the plan that fits your child's goals, lifestyle, and learning style.
            </p>
          </header>

          {/* ── PLAN CARDS ── */}
          <div className="ls-cards">
            {plans.map((plan, i) => (
              <PlanCard
                key={plan.title}
                plan={plan}
                cardRef={cardRefs[i]}
                animDelay={cardDelays[i]}
              />
            ))}
          </div>

          {/* ── BOTTOM ── */}
          <div ref={bottomRef} className="ls-bottom">
            <p className="ls-meta">
              Grades KG–12&nbsp;&nbsp;·&nbsp;&nbsp;Ages 5–18&nbsp;&nbsp;·&nbsp;&nbsp;Fully Flexible
            </p>
            <a href="#demo-book" className="ls-cta">
              Book Free Demo
              <ArrowRight size={14} />
            </a>
          </div>

        </div>
      </section>
    </>
  );
}