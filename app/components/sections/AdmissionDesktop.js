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
    side: "left",
  },
  {
    icon: MessageCircle,
    num: "02",
    title: "Counselling Session",
    desc: "Our expert admissions team connects with you personally to understand your goals and walk you through the best-fit program.",
    color: "#6c63ff",
    light: "#ede9ff",
    side: "right",
  },
  {
    icon: MonitorPlay,
    num: "03",
    title: "Demo Class",
    desc: "Experience a live interactive demo class. See our teachers, technology, and teaching style in action — no commitment needed.",
    color: "#0891b2",
    light: "#e0f2fe",
    side: "left",
  },
  {
    icon: BadgeCheck,
    num: "04",
    title: "Enrollment",
    desc: "Complete a simple documentation process and secure your child's seat. Our team assists every step of the way.",
    color: "#059669",
    light: "#dcfce7",
    side: "right",
  },
];

const stats = [
  { num: "15K+", label: "Students" },
  { num: "190+", label: "Countries" },
  { num: "98%",  label: "Satisfaction" },
  { num: "600+", label: "Teachers" },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600&display=swap');

  .adm * { box-sizing: border-box; margin: 0; padding: 0; }

  .adm {
    font-family: 'Inter', sans-serif;
    background: #f8faff;
    position: relative;
    overflow: hidden;
    padding: 52px 20px 56px;
  }

  .adm::before {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(14,120,252,0.07) 0%, transparent 70%);
    top: -200px;
    right: -100px;
    border-radius: 50%;
    pointer-events: none;
  }

  .adm-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
  }

  .adm-head {
    text-align: center;
    max-width: 600px;
    margin: 0 auto 36px;
  }

  .adm-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #1e6afb;
    background: #e8f0ff;
    border: 1px solid #c5d8ff;
    padding: 5px 14px;
    border-radius: 100px;
    margin-bottom: 14px;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .adm-eyebrow.adm-in { opacity: 1; transform: translateY(0); }

  .adm-h2 {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: clamp(1.75rem, 3.5vw, 2.6rem);
    font-weight: 800;
    color: #0a0f1e;
    line-height: 1.15;
    margin-bottom: 10px;
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.55s ease 0.07s, transform 0.55s ease 0.07s;
  }
  .adm-h2.adm-in { opacity: 1; transform: translateY(0); }
  .adm-h2 em { color: #1e6afb; font-style: normal; }

  .adm-sub {
    font-size: 0.88rem;
    color: #5a6480;
    line-height: 1.65;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.5s ease 0.13s, transform 0.5s ease 0.13s;
  }
  .adm-sub.adm-in { opacity: 1; transform: translateY(0); }

  .adm-stats {
    display: flex;
    justify-content: center;
    gap: 0;
    max-width: 620px;
    margin: 0 auto 40px;
    background: #fff;
    border: 1px solid #e3e9f7;
    border-radius: 14px;
    overflow: hidden;
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.55s ease 0.2s, transform 0.55s ease 0.2s;
  }
  .adm-stats.adm-in { opacity: 1; transform: translateY(0); }

  .adm-stat {
    flex: 1;
    padding: 14px 8px;
    text-align: center;
    border-right: 1px solid #e3e9f7;
  }
  .adm-stat:last-child { border-right: none; }

  .adm-stat-n {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 1.35rem;
    font-weight: 800;
    color: #1e6afb;
    line-height: 1;
  }
  .adm-stat-l {
    font-size: 0.68rem;
    color: #8090b0;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-top: 3px;
    font-weight: 500;
  }

  .adm-timeline {
    max-width: 860px;
    margin: 0 auto;
    position: relative;
  }

  .adm-spine {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 24px;
    bottom: 24px;
    width: 2px;
    background: linear-gradient(180deg, #1e6afb, #6c63ff, #059669);
    opacity: 0;
    transition: opacity 0.6s ease 0.3s;
  }
  .adm-spine.adm-in { opacity: 1; }

  .adm-row {
    display: grid;
    grid-template-columns: 1fr 52px 1fr;
    align-items: start;
    margin-bottom: 20px;
  }
  .adm-row:last-child { margin-bottom: 0; }

  .adm-dot {
    width: 52px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 20px;
    position: relative;
    z-index: 2;
  }

  .adm-dot-inner {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 12px;
    font-weight: 800;
    color: #fff;
    border: 3px solid #f8faff;
    opacity: 0;
    transform: scale(0.5);
    transition: opacity 0.4s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .adm-dot-inner.adm-in { opacity: 1; transform: scale(1); }

  .adm-card {
    background: #fff;
    border-radius: 14px;
    border: 1px solid #e3e9f7;
    padding: 18px 20px;
    opacity: 0;
    transition: opacity 0.5s ease, transform 0.55s cubic-bezier(0.34, 1.1, 0.64, 1), box-shadow 0.25s ease;
    cursor: default;
  }
  .adm-card:hover {
    box-shadow: 0 8px 28px rgba(30, 106, 251, 0.1);
    transform: translateY(-3px) !important;
  }
  .adm-card.adm-left {
    transform: translateX(-24px);
    text-align: right;
  }
  .adm-card.adm-right {
    transform: translateX(24px);
  }
  .adm-card.adm-in {
    opacity: 1;
    transform: translateX(0) !important;
  }

  .adm-card-top {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }
  .adm-card.adm-left .adm-card-top {
    justify-content: flex-end;
    flex-direction: row-reverse;
  }

  .adm-icon-wrap {
    width: 34px;
    height: 34px;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }

  .adm-step-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .adm-card-title {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: #0a0f1e;
    margin-bottom: 5px;
  }

  .adm-card-body {
    font-size: 0.8rem;
    color: #5a6480;
    line-height: 1.6;
  }

  .adm-learn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.75rem;
    font-weight: 600;
    text-decoration: none;
    margin-top: 8px;
  }

  .adm-spacer {}

  .adm-cta-wrap {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 36px;
    flex-wrap: wrap;
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.5s ease 0.5s, transform 0.5s ease 0.5s;
  }
  .adm-cta-wrap.adm-in { opacity: 1; transform: translateY(0); }

  .adm-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #1e6afb;
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    padding: 15px 35px;
    border-radius: 100px;
    text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .adm-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(30, 106, 251, 0.35);
  }

  .adm-btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: transparent;
    color: #1e6afb;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    padding: 15px 35px;
    border-radius: 100px;
    text-decoration: none;
    border: 1.5px solid #1e6afb;
    transition: transform 0.2s, background 0.2s, color 0.2s;
  }
  .adm-btn-outline:hover {
    background: #1e6afb;
    color: #fff;
    transform: translateY(-2px);
  }
`;

export default function AdmissionDesktop() {
  const eyebrowRef  = useRef(null);
  const titleRef    = useRef(null);
  const subRef      = useRef(null);
  const statsRef    = useRef(null);
  const spineRef    = useRef(null);
  const ctaRef      = useRef(null);
  const cardRefs    = useRef([]);
  const dotRefs     = useRef([]);
  const [titleAnimated, setTitleAnimated] = useState(false);

  useEffect(() => {
    const targets = [
      eyebrowRef.current,
      titleRef.current,
      subRef.current,
      statsRef.current,
      spineRef.current,
      ctaRef.current,
      ...cardRefs.current,
      ...dotRefs.current,
    ].filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("adm-in");
            if (entry.target === titleRef.current) setTitleAnimated(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{css}</style>
      <section className="adm">

        {/* ── Background SVG Graphics ── */}
        <svg
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            overflow: "visible",
          }}
          viewBox="0 0 1200 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="blob1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1e6afb" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#1e6afb" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="blob2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#6c63ff" stopOpacity="0.09" />
              <stop offset="100%" stopColor="#6c63ff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="blob3" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0891b2" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="blob4" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.07" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="950" cy="100" rx="420" ry="320" fill="url(#blob1)" />
          <ellipse cx="180" cy="780" rx="380" ry="280" fill="url(#blob2)" />
          <ellipse cx="1100" cy="520" rx="300" ry="260" fill="url(#blob3)" />
          <ellipse cx="300" cy="200" rx="260" ry="200" fill="url(#blob1)" />
          <ellipse cx="700" cy="850" rx="340" ry="200" fill="url(#blob4)" />
          <polygon points="0,0 110,-20 180,60 160,160 50,180 -30,100" fill="none" stroke="#1e6afb" strokeWidth="1.5" opacity="0.18" />
          <polygon points="20,20 95,4 148,68 132,148 57,164 4,100" fill="none" stroke="#1e6afb" strokeWidth="1" opacity="0.12" />
          <polygon points="0,0 80,-14 130,50 114,130 34,144 -16,80" fill="#1e6afb" opacity="0.04" />
          <polygon points="1140,10 1210,90 1140,170 1070,90" fill="none" stroke="#6c63ff" strokeWidth="1.8" opacity="0.18" />
          <polygon points="1140,34 1186,90 1140,146 1094,90" fill="none" stroke="#6c63ff" strokeWidth="1" opacity="0.12" />
          <polygon points="1140,56 1164,90 1140,124 1116,90" fill="#6c63ff" opacity="0.06" />
          <line x1="1140" y1="10" x2="1200" y2="0" stroke="#6c63ff" strokeWidth="1" opacity="0.15" />
          <line x1="1210" y1="90" x2="1200" y2="90" stroke="#6c63ff" strokeWidth="1" opacity="0.15" />
          <path d="M 310 -4 L 280 -4 L 280 36 L 310 36" fill="none" stroke="#1e6afb" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
          <path d="M 890 -4 L 920 -4 L 920 36 L 890 36" fill="none" stroke="#1e6afb" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
          {[320,380,440,500,560,620,680,740,800,860].map((x,i)=>(
            <line key={i} x1={x} y1="2" x2={x+28} y2="2" stroke="#1e6afb" strokeWidth="1" strokeDasharray="4 8" opacity="0.1"/>
          ))}
          <line x1="22" y1="80" x2="22" y2="820" stroke="#1e6afb" strokeWidth="1" opacity="0.12" />
          {[120,200,280,360,440,520,600,680,760].map((y,i)=>(
            <line key={i} x1="14" y1={y} x2={i%2===0?32:28} y2={y} stroke="#1e6afb" strokeWidth="1" opacity="0.16"/>
          ))}
          <line x1="1178" y1="80" x2="1178" y2="820" stroke="#6c63ff" strokeWidth="1" opacity="0.12" />
          {[150,240,330,420,510,600,690,780].map((y,i)=>(
            <line key={i} x1="1170" y1={y} x2={i%2===0?1186:1182} y2={y} stroke="#6c63ff" strokeWidth="1" opacity="0.16"/>
          ))}
          <path d="M 10 380 L 10 490 L 90 490" fill="none" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" opacity="0.2" />
          <path d="M 26 396 L 26 474 L 90 474" fill="none" stroke="#0891b2" strokeWidth="1" strokeLinecap="round" opacity="0.12" />
          {[0,1,2,3,4].map(row=>
            [0,1,2,3].map(col=>{
              const cx=52+col*36, cy=530+row*36;
              return(
                <g key={`${row}-${col}`} opacity="0.18">
                  <line x1={cx-7} y1={cy} x2={cx+7} y2={cy} stroke="#1e6afb" strokeWidth="1.2"/>
                  <line x1={cx} y1={cy-7} x2={cx} y2={cy+7} stroke="#1e6afb" strokeWidth="1.2"/>
                </g>
              );
            })
          )}
          <rect x="1080" y="340" width="100" height="100" fill="none" stroke="#6c63ff" strokeWidth="1.8" opacity="0.18" transform="rotate(45 1130 390)"/>
          <rect x="1096" y="356" width="68" height="68" fill="none" stroke="#6c63ff" strokeWidth="1" opacity="0.12" transform="rotate(45 1130 390)"/>
          <rect x="1110" y="370" width="40" height="40" fill="#6c63ff" opacity="0.05" transform="rotate(45 1130 390)"/>
          {[0,45,90,135,180,225,270,315].map((angle,i)=>{
            const rad=(angle*Math.PI)/180;
            const x2=1130+Math.cos(rad)*90, y2=390+Math.sin(rad)*90;
            return <line key={i} x1="1130" y1="390" x2={x2} y2={y2} stroke="#6c63ff" strokeWidth="0.8" opacity="0.08" strokeDasharray="3 6"/>;
          })}
          <path d="M -40 900 Q 160 640 360 900" fill="none" stroke="#1e6afb" strokeWidth="2" opacity="0.16"/>
          <path d="M -40 900 Q 200 700 440 900" fill="none" stroke="#1e6afb" strokeWidth="1.4" opacity="0.11"/>
          <path d="M -40 900 Q 240 760 520 900" fill="none" stroke="#6c63ff" strokeWidth="1" opacity="0.08"/>
          <path d="M -40 900 Q 160 700 360 900 Q 200 780 -40 900 Z" fill="#1e6afb" opacity="0.04"/>
          <polygon points="1100,680 1220,880 980,880" fill="none" stroke="#059669" strokeWidth="2" opacity="0.18"/>
          <polygon points="1100,716 1184,880 1016,880" fill="none" stroke="#059669" strokeWidth="1.2" opacity="0.12"/>
          <polygon points="1100,752 1148,880 1052,880" fill="#059669" opacity="0.05"/>
          <line x1="960" y1="860" x2="1120" y2="860" stroke="#059669" strokeWidth="1" opacity="0.16"/>
          <line x1="980" y1="876" x2="1100" y2="876" stroke="#059669" strokeWidth="0.8" opacity="0.1"/>
          {[0,1,2,3,4,5,6,7,8,9,10].map(i=>(
            <line key={i} x1={400+i*40} y1="895" x2={420+i*40} y2="895" stroke="#1e6afb" strokeWidth="1.5" strokeLinecap="round" opacity="0.13"/>
          ))}
          <line x1="40" y1="220" x2="180" y2="220" stroke="#0891b2" strokeWidth="1.5" opacity="0.2"/>
          <line x1="110" y1="220" x2="110" y2="290" stroke="#0891b2" strokeWidth="1.5" opacity="0.2"/>
          <line x1="80" y1="290" x2="140" y2="290" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" opacity="0.2"/>
          <path d="M 140 220 Q 165 252 148 290" fill="none" stroke="#0891b2" strokeWidth="1" strokeDasharray="3 4" opacity="0.16"/>
          <polygon points="600,60 810,175 810,405 600,520 390,405 390,175" fill="none" stroke="#1e6afb" strokeWidth="1" opacity="0.05"/>
        </svg>

        {/* ── Header ── */}
        <div className="adm-head">
          <div ref={eyebrowRef} className="adm-eyebrow">✦ Simple 4-Step Process</div>
          <h2 ref={titleRef} className="adm-h2" style={{ color: "#5b5b5b" }}>
            Complete Enrollment
            <em className="relative inline-block" style={{ fontStyle: "normal", paddingLeft: 6 }}>
               Process
              <svg style={{ position:"absolute", bottom:-4, left:0, width:"100%" }} height="6" viewBox="0 0 200 6" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0 5 Q50 0 100 4 Q150 8 200 3"
                  stroke="#1e6afb" strokeWidth="3" fill="none" strokeLinecap="round"
                  style={{
                    strokeDasharray: 220,
                    strokeDashoffset: titleAnimated ? 0 : 220,
                    transition: "stroke-dashoffset 1.1s ease 0.5s",
                  }}
                />
              </svg>
            </em>
          </h2>
          <p ref={subRef} className="adm-sub">
            Thoughtfully designed to give you a full tour of our learning environment
            and help you find the perfect program for your child.
          </p>
        </div>

        {/* ── Stats ── */}
        <div ref={statsRef} className="adm-stats">
          {stats.map(({ num, label }) => (
            <div key={label} className="adm-stat">
              <div className="adm-stat-n">{num}</div>
              <div className="adm-stat-l">{label}</div>
            </div>
          ))}
        </div>

        {/* ── Timeline ── */}
        <div className="adm-timeline">
          <div ref={spineRef} className="adm-spine" />
          {steps.map((step, i) => {
            const isLeft = step.side === "left";
            return (
              <div key={i} className="adm-row">
                {isLeft ? (
                  <div ref={(el)=>(cardRefs.current[i]=el)} className="adm-card adm-left" style={{ transitionDelay:`${0.25+i*0.07}s` }}>
                    <div className="adm-card-top">
                      <div className="adm-icon-wrap" style={{ background: step.light }}>
                        <step.icon size={18} color={step.color} strokeWidth={1.75} />
                      </div>
                      <span className="adm-step-label" style={{ color: step.color }}>Step {step.num}</span>
                    </div>
                    <div className="adm-card-title">{step.title}</div>
                    <p className="adm-card-body">{step.desc}</p>
                    <a href="/enrollment-process" className="adm-learn" style={{ color: step.color }}>
                      Learn more <ArrowRight size={12} strokeWidth={2.5} />
                    </a>
                  </div>
                ) : (
                  <div className="adm-spacer" />
                )}
                <div className="adm-dot">
                  <div ref={(el)=>(dotRefs.current[i]=el)} className="adm-dot-inner" style={{ background:step.color, transitionDelay:`${0.3+i*0.07}s` }}>
                    {step.num}
                  </div>
                </div>
                {!isLeft ? (
                  <div ref={(el)=>(cardRefs.current[i]=el)} className="adm-card adm-right" style={{ transitionDelay:`${0.25+i*0.07}s` }}>
                    <div className="adm-card-top">
                      <div className="adm-icon-wrap" style={{ background: step.light }}>
                        <step.icon size={18} color={step.color} strokeWidth={1.75} />
                      </div>
                      <span className="adm-step-label" style={{ color: step.color }}>Step {step.num}</span>
                    </div>
                    <div className="adm-card-title">{step.title}</div>
                    <p className="adm-card-body">{step.desc}</p>
                    <a href="/enrollment-process" className="adm-learn" style={{ color: step.color }}>
                      Learn more <ArrowRight size={12} strokeWidth={2.5} />
                    </a>
                  </div>
                ) : (
                  <div className="adm-spacer" />
                )}
              </div>
            );
          })}
        </div>

        {/* ── CTAs ── */}
        <div ref={ctaRef} className="adm-cta-wrap">
          <a href="https://internationalschooling.org/enrollment" className="adm-btn-primary" target="_blank">
            Start Enrollment <ArrowRight size={14} strokeWidth={2.5} />
          </a>
          <a href="#demo-book" className="adm-btn-outline">
            Book Free Demo
          </a>
        </div>

      </section>
    </>
  );
}