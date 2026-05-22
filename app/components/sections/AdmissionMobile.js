"use client";

import { useEffect, useRef, useState } from "react";
import { ClipboardList, MessageCircle, MonitorPlay, BadgeCheck, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    num: "01",
    title: "Inquiry Form",
    desc: "Fill out a quick form with your child's details — personal info, academic history, and learning goals. Takes just 2 minutes.",
    color: "#1e6afb",
    light: "#e8f0ff",
  },
  {
    icon: MessageCircle,
    num: "02",
    title: "Counselling Session",
    desc: "Our expert admissions team connects with you personally to understand your goals and walk you through the best-fit program.",
    color: "#6c63ff",
    light: "#ede9ff",
  },
  {
    icon: MonitorPlay,
    num: "03",
    title: "Demo Class",
    desc: "Experience a live interactive demo class. See our teachers, technology, and teaching style in action — no commitment needed.",
    color: "#0891b2",
    light: "#e0f2fe",
  },
  {
    icon: BadgeCheck,
    num: "04",
    title: "Enrollment",
    desc: "Complete a simple documentation process and secure your child's seat. Our team assists every step of the way.",
    color: "#059669",
    light: "#dcfce7",
  },
];

const stats = [
  { num: "15K+", label: "Students" },
  { num: "190+", label: "Countries" },
  { num: "98%",  label: "Satisfaction" },
  { num: "600+", label: "Teachers" },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Inter:wght@400;500;600&display=swap');

  .adm-m * { box-sizing: border-box; margin: 0; padding: 0; }

  .adm-m {
    font-family: 'Inter', sans-serif;
    background: #f8faff;
    position: relative;
    overflow: hidden;
    padding: 36px 16px 52px;
    -webkit-font-smoothing: antialiased;
  }

  /* ── Scroll-reveal base ── */
  .adm-m-fade {
    opacity: 0;
    transform: translateY(14px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }
  .adm-m-fade.adm-m-in { opacity: 1; transform: translateY(0); }

  /* ── Eyebrow pill ── */
  .adm-m-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: #1e6afb;
    background: #e8f0ff;
    border: 1px solid #c5d8ff;
    padding: 5px 14px;
    border-radius: 100px;
    margin-bottom: 14px;
  }
  .adm-m-pill-dot {
    width: 5px; height: 5px; border-radius: 50%; background: #3b82f6;
    animation: adm-m-pulse 2.2s ease-in-out infinite;
  }
  @keyframes adm-m-pulse {
    0%,100% { transform: scale(1); opacity: 1; }
    50%      { transform: scale(1.6); opacity: .4; }
  }

  /* ── Header ── */
  .adm-m-head {
    text-align: center;
    margin-bottom: 22px;
    position: relative;
    z-index: 2;
  }
  .adm-m-h2 {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: clamp(1.5rem, 7vw, 1.9rem);
    font-weight: 800;
    color: #5b5b5b;
    line-height: 1.2;
    margin-bottom: 10px;
    letter-spacing: -0.02em;
  }
  .adm-m-h2-em {
    color: #1e6afb;
    position: relative;
    display: inline-block;
    font-style: normal;
  }
  .adm-m-sub {
    font-size: 0.82rem;
    color: #5a6480;
    line-height: 1.65;
    max-width: 300px;
    margin: 0 auto;
  }

  /* ── Stats bar ── */
  .adm-m-stats {
    display: flex;
    gap: 0;
    margin-bottom: 26px;
    background: #fff;
    border: 1px solid #e3e9f7;
    border-radius: 14px;
    overflow: hidden;
    position: relative;
    z-index: 2;
  }
  .adm-m-stat {
    flex: 1;
    padding: 11px 6px;
    text-align: center;
    border-right: 1px solid #e3e9f7;
  }
  .adm-m-stat:last-child { border-right: none; }
  .adm-m-stat-n {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 1.1rem;
    font-weight: 800;
    color: #1e6afb;
    line-height: 1;
  }
  .adm-m-stat-l {
    font-size: 8px;
    font-weight: 600;
    color: #8090b0;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    margin-top: 3px;
  }

  /* ── Timeline track + cards row ── */
  .adm-m-track-wrap {
    display: flex;
    align-items: stretch;
    gap: 0;
    position: relative;
    z-index: 2;
  }

  /* Gradient spine */
  .adm-m-spine {
    width: 3px;
    flex-shrink: 0;
    border-radius: 3px;
    background: linear-gradient(180deg, #1e6afb 0%, #6c63ff 35%, #0891b2 68%, #059669 100%);
    margin: 6px 0 6px;
    position: relative;
    opacity: 0;
    transition: opacity 0.6s ease 0.3s;
  }
  .adm-m-spine.adm-m-in { opacity: 1; }
  /* End dot on spine */
  .adm-m-spine::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 9px; height: 9px;
    border-radius: 50%;
    background: #059669;
    border: 2px solid #f8faff;
  }

  /* Cards column */
  .adm-m-cards {
    flex: 1;
    padding-left: 14px;
    display: flex;
    flex-direction: column;
    gap: 13px;
  }

  /* Individual step card */
  .adm-m-card {
    background: #fff;
    border-radius: 16px;
    border: 1.5px solid #e3e9f7;
    overflow: hidden;
    position: relative;
    opacity: 0;
    transform: translateX(22px);
    transition: opacity 0.5s ease, transform 0.55s cubic-bezier(0.34,1.1,0.64,1), box-shadow 0.25s ease;
  }
  .adm-m-card.adm-m-in {
    opacity: 1;
    transform: translateX(0);
  }
  .adm-m-card:active {
    box-shadow: 0 8px 28px rgba(30,106,251,0.13);
  }

  /* Coloured accent bar at top of card */
  .adm-m-card-bar { height: 3px; width: 100%; }

  /* Card inner padding */
  .adm-m-card-body { padding: 13px 14px 12px; position: relative; }

  /* Top row: icon + step label */
  .adm-m-card-top {
    display: flex;
    align-items: center;
    gap: 9px;
    margin-bottom: 7px;
  }
  .adm-m-icon-wrap {
    width: 32px; height: 32px;
    border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .adm-m-step-label {
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 0.13em;
    text-transform: uppercase;
  }

  /* Big ghost step number watermark */
  .adm-m-ghost {
    position: absolute;
    right: 10px;
    bottom: 4px;
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 2.6rem;
    font-weight: 800;
    opacity: 0.07;
    line-height: 1;
    letter-spacing: -0.04em;
    pointer-events: none;
    user-select: none;
  }

  .adm-m-card-title {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 0.97rem;
    font-weight: 700;
    color: #0a0f1e;
    margin-bottom: 5px;
    line-height: 1.25;
  }
  .adm-m-card-desc {
    font-size: 0.78rem;
    color: #5a6480;
    line-height: 1.6;
  }
  .adm-m-learn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.74rem;
    font-weight: 600;
    text-decoration: none;
    margin-top: 8px;
  }

  /* ── Connector dots on spine ── */
  .adm-m-dot {
    position: absolute;
    left: -4px;
    width: 11px; height: 11px;
    border-radius: 50%;
    border: 2px solid #f8faff;
    opacity: 0;
    transform: scale(0.4);
    transition: opacity 0.35s ease, transform 0.45s cubic-bezier(0.34,1.56,0.64,1);
  }
  .adm-m-dot.adm-m-in { opacity: 1; transform: scale(1); }

  /* ── CTAs ── */
  .adm-m-cta {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 26px;
    position: relative;
    z-index: 2;
  }
  .adm-m-btn-primary {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    background: #1e6afb;
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    padding: 14px 24px;
    border-radius: 100px;
    text-decoration: none;
    box-shadow: 0 4px 18px rgba(30,106,251,0.28);
    transition: transform 0.2s, box-shadow 0.2s;
    min-height: 48px;
    -webkit-tap-highlight-color: transparent;
  }
  .adm-m-btn-primary:active {
    transform: scale(0.98);
    box-shadow: 0 2px 10px rgba(30,106,251,0.2);
  }
  .adm-m-btn-outline {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    background: transparent;
    color: #1e6afb;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    padding: 14px 24px;
    border-radius: 100px;
    text-decoration: none;
    border: 1.5px solid #1e6afb;
    min-height: 48px;
    transition: transform 0.2s;
    -webkit-tap-highlight-color: transparent;
  }
  .adm-m-btn-outline:active { transform: scale(0.98); }
`;

/* Dot vertical positions — percentage down the spine for each step */
const DOT_POSITIONS = ["8%", "33%", "59%", "84%"];

export default function AdmissionMobile() {
  const headRef   = useRef(null);
  const statsRef  = useRef(null);
  const spineRef  = useRef(null);
  const ctaRef    = useRef(null);
  const cardRefs  = useRef([]);
  const dotRefs   = useRef([]);
  const [titleAnimated, setTitleAnimated] = useState(false);

  useEffect(() => {
    const targets = [
      { el: headRef.current,  onVis: () => setTitleAnimated(true) },
      { el: statsRef.current  },
      { el: spineRef.current  },
      { el: ctaRef.current    },
      ...cardRefs.current.map(el => ({ el })),
      ...dotRefs.current.map(el => ({ el })),
    ].filter(t => t.el);

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("adm-m-in");
        const t = targets.find(t => t.el === entry.target);
        t?.onVis?.();
        io.unobserve(entry.target);
      });
    }, { threshold: 0.08 });

    targets.forEach(({ el }) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <section className="adm-m">

        {/* ── Same background SVG as desktop — identical, untouched ── */}
        <svg
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            overflow: "hidden",
          }}
          viewBox="0 0 400 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="adm-mb1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1e6afb" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#1e6afb" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="adm-mb2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#6c63ff" stopOpacity="0.09" />
              <stop offset="100%" stopColor="#6c63ff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="adm-mb3" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0891b2" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="adm-mb4" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.07" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Blobs */}
          <ellipse cx="340" cy="60"  rx="200" ry="160" fill="url(#adm-mb1)" />
          <ellipse cx="40"  cy="820" rx="180" ry="140" fill="url(#adm-mb2)" />
          <ellipse cx="370" cy="460" rx="150" ry="130" fill="url(#adm-mb3)" />
          <ellipse cx="80"  cy="180" rx="130" ry="100" fill="url(#adm-mb1)" />
          <ellipse cx="220" cy="880" rx="170" ry="100" fill="url(#adm-mb4)" />

          {/* Top-left hexagon cluster */}
          <polygon points="0,0 80,-14 130,50 114,130 34,144 -16,80"
            fill="none" stroke="#1e6afb" strokeWidth="1.2" opacity="0.15" />
          <polygon points="10,10 66,0 104,52 90,118 28,128 -4,76"
            fill="none" stroke="#1e6afb" strokeWidth="0.8" opacity="0.09" />
          <polygon points="0,0 60,-10 96,44 82,110 24,120 -10,66"
            fill="#1e6afb" opacity="0.03" />

          {/* Top-right diamond */}
          <polygon points="370,8 406,52 370,96 334,52"
            fill="none" stroke="#6c63ff" strokeWidth="1.4" opacity="0.16" />
          <polygon points="370,26 394,52 370,78 346,52"
            fill="none" stroke="#6c63ff" strokeWidth="0.8" opacity="0.10" />
          <polygon points="370,42 382,52 370,62 358,52"
            fill="#6c63ff" opacity="0.05" />
          <line x1="370" y1="8"  x2="406" y2="2"  stroke="#6c63ff" strokeWidth="0.8" opacity="0.13" />
          <line x1="406" y1="52" x2="400" y2="52" stroke="#6c63ff" strokeWidth="0.8" opacity="0.13" />

          {/* Left edge vertical rule */}
          <line x1="10" y1="80" x2="10" y2="820" stroke="#1e6afb" strokeWidth="0.8" opacity="0.10" />
          {[120,200,280,360,440,520,600,680,760].map((y,i) => (
            <line key={i} x1="5" y1={y} x2={i%2===0?16:13} y2={y}
              stroke="#1e6afb" strokeWidth="0.8" opacity="0.14" />
          ))}

          {/* Right edge vertical rule */}
          <line x1="392" y1="80" x2="392" y2="820" stroke="#6c63ff" strokeWidth="0.8" opacity="0.10" />
          {[150,240,330,420,510,600,690,780].map((y,i) => (
            <line key={i} x1="386" y1={y} x2={i%2===0?398:395} y2={y}
              stroke="#6c63ff" strokeWidth="0.8" opacity="0.14" />
          ))}

          {/* Mid-left L-bracket */}
          <path d="M 4 360 L 4 440 L 52 440"
            fill="none" stroke="#0891b2" strokeWidth="1.5" strokeLinecap="round" opacity="0.18" />
          <path d="M 14 372 L 14 428 L 52 428"
            fill="none" stroke="#0891b2" strokeWidth="0.8" strokeLinecap="round" opacity="0.10" />

          {/* Mid-left crosshair grid */}
          {[0,1,2,3].map(row =>
            [0,1,2].map(col => {
              const cx = 28 + col*28, cy = 490 + row*28;
              return (
                <g key={`${row}-${col}`} opacity="0.16">
                  <line x1={cx-5} y1={cy} x2={cx+5} y2={cy} stroke="#1e6afb" strokeWidth="1" />
                  <line x1={cx} y1={cy-5} x2={cx} y2={cy+5} stroke="#1e6afb" strokeWidth="1" />
                </g>
              );
            })
          )}

          {/* Mid-right nested diamonds */}
          <rect x="340" y="320" width="70" height="70"
            fill="none" stroke="#6c63ff" strokeWidth="1.4" opacity="0.16"
            transform="rotate(45 375 355)" />
          <rect x="352" y="332" width="46" height="46"
            fill="none" stroke="#6c63ff" strokeWidth="0.8" opacity="0.10"
            transform="rotate(45 375 355)" />
          <rect x="362" y="342" width="26" height="26"
            fill="#6c63ff" opacity="0.04"
            transform="rotate(45 375 355)" />
          {[0,45,90,135,180,225,270,315].map((angle,i) => {
            const rad = (angle*Math.PI)/180;
            return (
              <line key={i} x1="375" y1="355"
                x2={375+Math.cos(rad)*60} y2={355+Math.sin(rad)*60}
                stroke="#6c63ff" strokeWidth="0.6" opacity="0.07" strokeDasharray="2 5" />
            );
          })}

          {/* Bottom-left arc waves */}
          <path d="M -20 900 Q 100 700 220 900"
            fill="none" stroke="#1e6afb" strokeWidth="1.5" opacity="0.14" />
          <path d="M -20 900 Q 120 740 260 900"
            fill="none" stroke="#1e6afb" strokeWidth="1" opacity="0.09" />
          <path d="M -20 900 Q 140 780 300 900"
            fill="none" stroke="#6c63ff" strokeWidth="0.8" opacity="0.07" />
          <path d="M -20 900 Q 100 720 220 900 Q 100 800 -20 900 Z"
            fill="#1e6afb" opacity="0.03" />

          {/* Bottom-right triangle */}
          <polygon points="330,720 400,860 260,860"
            fill="none" stroke="#059669" strokeWidth="1.5" opacity="0.16" />
          <polygon points="330,748 380,860 280,860"
            fill="none" stroke="#059669" strokeWidth="1" opacity="0.10" />
          <polygon points="330,776 356,860 304,860"
            fill="#059669" opacity="0.04" />
          <line x1="248" y1="844" x2="342" y2="844" stroke="#059669" strokeWidth="0.8" opacity="0.14" />
          <line x1="256" y1="856" x2="330" y2="856" stroke="#059669" strokeWidth="0.6" opacity="0.09" />

          {/* Bottom dash band */}
          {[0,1,2,3,4,5,6,7].map(i => (
            <line key={i}
              x1={120+i*30} y1="892"
              x2={136+i*30} y2="892"
              stroke="#1e6afb" strokeWidth="1.2" strokeLinecap="round" opacity="0.12" />
          ))}

          {/* Top-left mortarboard lines */}
          <line x1="18" y1="200" x2="100" y2="200" stroke="#0891b2" strokeWidth="1.2" opacity="0.18" />
          <line x1="59" y1="200" x2="59"  y2="252" stroke="#0891b2" strokeWidth="1.2" opacity="0.18" />
          <line x1="38" y1="252" x2="80"  y2="252" stroke="#0891b2" strokeWidth="1.6" strokeLinecap="round" opacity="0.18" />
          <path d="M 80 200 Q 96 226 84 252"
            fill="none" stroke="#0891b2" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.14" />

          {/* Centre hex watermark */}
          <polygon
            points="200,40 290,90 290,190 200,240 110,190 110,90"
            fill="none" stroke="#1e6afb" strokeWidth="0.8" opacity="0.04" />

          {/* Top bracket frame */}
          <path d="M 80 -2 L 60 -2 L 60 22 L 80 22"
            fill="none" stroke="#1e6afb" strokeWidth="1.2" strokeLinecap="round" opacity="0.18" />
          <path d="M 320 -2 L 340 -2 L 340 22 L 320 22"
            fill="none" stroke="#1e6afb" strokeWidth="1.2" strokeLinecap="round" opacity="0.18" />
          {[88,112,136,160,184,208,232,256,280,304].map((x,i) => (
            <line key={i} x1={x} y1="2" x2={x+14} y2="2"
              stroke="#1e6afb" strokeWidth="0.8" strokeDasharray="3 6" opacity="0.09" />
          ))}
        </svg>

        {/* ── Header ── */}
        <header
          ref={headRef}
          className="adm-m-head adm-m-fade"
        >
          <div className="adm-m-pill">
            <span className="adm-m-pill-dot" aria-hidden="true" />
            ✦ Simple 4-Step Process
          </div>
          <h2 className="adm-m-h2">
            Complete Enrollment{" "}
            <em className="adm-m-h2-em">
              Process
              <svg
                style={{ position:"absolute", bottom:-3, left:0, width:"100%", pointerEvents:"none" }}
                height="6" viewBox="0 0 200 6" preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
              >
                <path
                  d="M0 5 Q50 0 100 4 Q150 8 200 3"
                  stroke="#1e6afb" strokeWidth="2.5" fill="none" strokeLinecap="round"
                  style={{
                    strokeDasharray: 220,
                    strokeDashoffset: titleAnimated ? 0 : 220,
                    transition: "stroke-dashoffset 1.1s ease 0.4s",
                  }}
                />
              </svg>
            </em>
          </h2>
          <p className="adm-m-sub">
            Thoughtfully designed to give you a full tour of our learning environment
            and help you find the perfect program for your child.
          </p>
        </header>

        {/* ── Stats ── */}
        <div
          ref={statsRef}
          className="adm-m-stats adm-m-fade"
          style={{ transitionDelay: "0.1s" }}
        >
          {stats.map(({ num, label }) => (
            <div key={label} className="adm-m-stat">
              <div className="adm-m-stat-n">{num}</div>
              <div className="adm-m-stat-l">{label}</div>
            </div>
          ))}
        </div>

        {/* ── Timeline: spine + cards ── */}
        <div className="adm-m-track-wrap">

          {/* Gradient spine with connector dots */}
          <div
            ref={spineRef}
            className="adm-m-spine"
            style={{ position: "relative" }}
          >
            {steps.map((step, i) => (
              <div
                key={i}
                ref={el => (dotRefs.current[i] = el)}
                className="adm-m-dot"
                style={{
                  top: DOT_POSITIONS[i],
                  background: step.color,
                  transitionDelay: `${0.32 + i * 0.08}s`,
                }}
              />
            ))}
          </div>

          {/* Cards column */}
          <div className="adm-m-cards">
            {steps.map((step, i) => (
              <div
                key={i}
                ref={el => (cardRefs.current[i] = el)}
                className="adm-m-card"
                style={{ transitionDelay: `${0.28 + i * 0.08}s`, borderColor: `${step.color}30` }}
              >
                {/* Accent bar */}
                <div className="adm-m-card-bar" style={{ background: step.color }} />

                <div className="adm-m-card-body">
                  {/* Top row */}
                  <div className="adm-m-card-top">
                    <div className="adm-m-icon-wrap" style={{ background: step.light }}>
                      <step.icon size={17} color={step.color} strokeWidth={1.75} />
                    </div>
                    <span className="adm-m-step-label" style={{ color: step.color }}>
                      Step {step.num}
                    </span>
                  </div>

                  {/* Title + description */}
                  <div className="adm-m-card-title">{step.title}</div>
                  <p className="adm-m-card-desc">{step.desc}</p>

                  {/* Learn more */}
                  
                   <a href="/enrollment-process"
                    className="adm-m-learn"
                    style={{ color: step.color }}
                  >
                    Learn more <ArrowRight size={12} strokeWidth={2.5} />
                  </a>

                  {/* Ghost number watermark */}
                  <div className="adm-m-ghost" style={{ color: step.color }}>
                    {step.num}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTAs ── */}
        <div
          ref={ctaRef}
          className="adm-m-cta adm-m-fade"
          style={{ transitionDelay: "0.55s" }}
        >
          
          <a  href="https://internationalschooling.org/enrollment"
            className="adm-m-btn-primary"
            target="_blank"
          >
            Start Enrollment <ArrowRight size={14} strokeWidth={2.5} />
          </a>
          <a href="#demo-book" className="adm-m-btn-outline">
            Book Free Demo
          </a>
        </div>

      </section>
    </>
  );
}