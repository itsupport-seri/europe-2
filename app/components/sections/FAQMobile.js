"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";

const faqs = [
  { question: "Is the school internationally accredited?", answer: "Yes, International Schooling is fully accredited by the three most prestigious school accreditors - NEASC, WASC and Cognia, USA" },
  { question: "Is the diploma recognized across Europe and worldwide?", answer: "Yes, International Schooling offers the American Diploma which is recognized across Europe and worldwide." },
  { question: "Which curriculum does the school follow?", answer: "International Schooling follows KG – Grade 12 American Curriculum." },
  { question: "Are AP or Advanced Academic Courses available?", answer: "Yes, AP or Advanced Academic Courses are available." },
  { question: "Can students transfer to European universities easily?", answer: "Yes, student can easily apply to top universities across Europe with our globally accepted American High School Diploma." },
  { question: "Are classes live, recorded, or self-paced?", answer: "All the classes are live both in One-to-One Learning Plan and Group Learning Plan. Besides we also offer Self-Study Learning Plan that allows students to learn at their own pace." },
  { question: "Is the learning schedule flexible for different European time zones?", answer: "Yes, learning schedules are flexible according to different European time zones." },
  { question: "Can students study while traveling across Europe?", answer: "Yes, International Schooling offers flexible schedules which allows students to study while traveling." },
  { question: "Are teachers internationally certified and experienced?", answer: "Yes, all our teachers are internationally trained and certified." },
  { question: "How do students interact with teachers and classmates online?", answer: "International schooling has a multicultural classroom where students and teachers interact through face to face live online classes." },
  { question: "Is multilingual support available for international families?", answer: "Yes, International Schooling offers multilingual support with 600+ teachers speaking 40+ languages, besides translation tools on the Learning Management System." },
  { question: "What technology or devices are required for online learning?", answer: "A tablet/ laptop with internet access and an active camera." },
  { question: "Are books and study materials included?", answer: "Yes, the fee includes all the learning material with interactive audio-video curriculum all over an interactive and intuitive learning management system." },
  { question: "How are assignments, exams, and grading managed?", answer: "Assignments, exams and grading are done manually by certified teachers over recorded calls." },
  { question: "Can parents track attendance and academic progress?", answer: "Yes, parents can track attendance and academic progress through the official school application. Our teachers share daily, weekly and monthly academic progress with parents for effective academics." },
  { question: "Is one-to-one academic support available?", answer: "Yes, one-to-one academic support is available for students, including administrative support as well." },
  { question: "Does the school provide university counselling and career guidance?", answer: "Yes, International Schooling offers career counselling sessions with internationally certified career counselors, supporting students for university success globally." },
  { question: "Are extracurricular activities and student clubs available?", answer: "Yes, International Schooling offers a plethora of extracurricular activities and student clubs including music, dance, theatres, arts, chess, fashion, book club etc." },
  { question: "Is the school suitable for homeschooling and flexible learning families?", answer: "The school is perfect for students who want the benefits of a fully accredited flexible school, without compromising on the quality of education." },
  { question: "Why should parents choose this school over traditional schools?", answer: "This school is a perfect blend of high-quality international curriculum, internationally qualified and certified teachers, with customized and personalized learning plans – all accredited and recognized over 190+ countries thus being a perfect fit for any student globally." },
];

/* Inline critical CSS — no render-blocking font import at top level.
   Font loaded lazily via <link> injected in useEffect.               */
const CSS = `
  .faq-m * { box-sizing: border-box; margin: 0; padding: 0; }

  .faq-m {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background: #f8faff;
    padding: 36px 16px 52px;
    position: relative;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
  }

  /* Decorative blobs — CSS only, no SVG overhead */
  .faq-m::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 220px; height: 220px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(30,106,251,0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  .faq-m::after {
    content: '';
    position: absolute;
    bottom: -40px; left: -40px;
    width: 180px; height: 180px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%);
    pointer-events: none;
  }

  /* ── Scroll reveal ── */
  .faq-m-fade {
    opacity: 0;
    transform: translateY(14px);
    transition: opacity 0.5s ease, transform 0.5s ease;
    will-change: transform, opacity;
  }
  .faq-m-fade.faq-m-in { opacity: 1; transform: translateY(0); }

  /* ── Eyebrow pill ── */
  .faq-m-pill {
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
  .faq-m-pill-dot {
    width: 5px; height: 5px; border-radius: 50%; background: #3b82f6;
    animation: faq-m-pulse 2.2s ease-in-out infinite;
  }
  @keyframes faq-m-pulse {
    0%,100% { transform: scale(1); opacity: 1; }
    50%      { transform: scale(1.6); opacity: .4; }
  }

  /* ── Header ── */
  .faq-m-head {
    text-align: center;
    margin-bottom: 24px;
    position: relative;
    z-index: 2;
  }
  .faq-m-h2 {
    font-family: 'Bricolage Grotesque', system-ui, sans-serif;
    font-size: clamp(1.5rem, 7vw, 1.9rem);
    font-weight: 800;
    color: #5b5b5b;
    line-height: 1.2;
    margin-bottom: 10px;
    letter-spacing: -0.02em;
  }
  .faq-m-h2 em {
    color: #1e6afb;
    font-style: normal;
    position: relative;
    display: inline-block;
  }
  .faq-m-sub {
    font-size: 0.82rem;
    color: #5a6480;
    line-height: 1.65;
    max-width: 300px;
    margin: 0 auto;
  }

  /* ── FAQ list ── */
  .faq-m-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    z-index: 2;
  }

  /* Individual item */
  .faq-m-item {
    background: #fff;
    border: 1.5px solid #e3e9f7;
    border-radius: 16px;
    overflow: hidden;
    opacity: 0;
    transform: translateY(12px);
    transition:
      opacity 0.45s ease,
      transform 0.45s ease,
      border-color 0.25s ease,
      box-shadow 0.25s ease;
    will-change: transform, opacity;
    contain: layout style;
  }
  .faq-m-item.faq-m-in { opacity: 1; transform: translateY(0); }
  .faq-m-item.faq-m-open {
    border-color: rgba(30,106,251,0.3);
    box-shadow: 0 4px 18px rgba(30,106,251,0.1);
  }

  /* Left accent bar */
  .faq-m-item-bar {
    height: 0;
    transition: height 0.3s ease;
  }
  .faq-m-item.faq-m-open .faq-m-item-bar {
    height: 3px;
  }

  /* Question button */
  .faq-m-btn {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 12px;
    padding: 16px 16px;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    -webkit-tap-highlight-color: transparent;
    min-height: 56px;
  }

  .faq-m-num {
    width: 26px; height: 26px;
    border-radius: 7px;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 700;
    flex-shrink: 0;
    transition: background 0.25s, color 0.25s;
  }
  .faq-m-num-closed { background: #f0f4ff; color: #1e6afb; }
  .faq-m-num-open   { background: #1e6afb; color: #fff; }

  .faq-m-q {
    flex: 1;
    font-size: 0.84rem;
    font-weight: 600;
    line-height: 1.45;
    transition: color 0.2s;
  }
  .faq-m-q-closed { color: #1e293b; }
  .faq-m-q-open   { color: #0a0f1e; }

  .faq-m-chevron {
    width: 28px; height: 28px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: background 0.25s;
  }
  .faq-m-chevron-closed { background: #f0f4ff; }
  .faq-m-chevron-open   { background: #1e6afb; }

  /* Answer expand — grid trick avoids max-height jank */
  .faq-m-body {
    display: grid;
    transition: grid-template-rows 0.32s cubic-bezier(.4,0,.2,1);
  }
  .faq-m-body-inner { overflow: hidden; }
  .faq-m-ans {
    padding: 0 16px 16px 54px;
    font-size: 0.8rem;
    color: #5a6480;
    line-height: 1.7;
    transition: opacity 0.28s ease 0.05s, transform 0.28s ease 0.05s;
  }

  /* Bottom gradient line */
  .faq-m-accent {
    height: 2px;
    background: linear-gradient(90deg, #1e6afb, #06b6d4);
    transition: opacity 0.3s ease;
  }

  /* ── CTA ── */
  .faq-m-cta {
    margin-top: 26px;
    position: relative;
    z-index: 2;
  }
  .faq-m-ctabtn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    background: #1e6afb;
    color: #fff;
    font-family: inherit;
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
  .faq-m-ctabtn:active {
    transform: scale(0.98);
    box-shadow: 0 2px 10px rgba(30,106,251,0.2);
  }
`;

export default function FAQMobile() {
  const [activeIndex, setActiveIndex] = useState(null);
  const headRef = useRef(null);
  const ctaRef = useRef(null);
  const itemRefs = useRef([]);
  const [titleAnimated, setTitleAnimated] = useState(false);

  /* Lazy-load fonts — avoids render-blocking on mobile */
  useEffect(() => {
    if (document.getElementById("faq-m-fonts")) return;
    const link = document.createElement("link");
    link.id = "faq-m-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Inter:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);

  /* IntersectionObserver with generous threshold for mobile scroll */
  useEffect(() => {
    const targets = [
      { el: headRef.current, onVis: () => setTitleAnimated(true) },
      { el: ctaRef.current },
      ...itemRefs.current.map((el) => ({ el })),
    ].filter((t) => t.el);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("faq-m-in");
          const t = targets.find((t) => t.el === entry.target);
          t?.onVis?.();
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.06 }
    );

    targets.forEach(({ el }) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const toggle = (i) =>
    setActiveIndex((prev) => (prev === i ? null : i));

  return (
    <>
      <style>{CSS}</style>
      <section className="faq-m">

        {/* Header */}
        <header
          ref={headRef}
          className="faq-m-head faq-m-fade"
        >
          <div className="faq-m-pill">
            <span className="faq-m-pill-dot" aria-hidden="true" />
            ✦ Common Questions
          </div>
          <h2 className="faq-m-h2">
            Frequently{" "}
            <em>
              Ask Questions
              <svg
                style={{ position: "absolute", bottom: -3, left: 0, width: "100%", pointerEvents: "none" }}
                height="6"
                viewBox="0 0 200 6"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M0 5 Q50 0 100 4 Q150 8 200 3"
                  stroke="#1e6afb"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 220,
                    strokeDashoffset: titleAnimated ? 0 : 220,
                    transition: "stroke-dashoffset 1.1s ease 0.4s",
                  }}
                />
              </svg>
            </em>
          </h2>
          <p className="faq-m-sub">
            Clear answers about our online schooling experience,
            accreditation, and student journey.
          </p>
        </header>

        {/* FAQ list */}
        <div className="faq-m-list">
          {faqs.map((faq, i) => {
            const isOpen = activeIndex === i;
            /* Stagger only first 8 items to avoid long delay chains */
            const delay = i < 8 ? `${0.06 + i * 0.04}s` : "0s";
            return (
              <div
                key={i}
                ref={(el) => (itemRefs.current[i] = el)}
                className={`faq-m-item${isOpen ? " faq-m-open" : ""}`}
                style={{ transitionDelay: delay }}
              >
                {/* Accent top bar */}
                <div
                  className="faq-m-item-bar"
                  style={{
                    background: "linear-gradient(90deg, #1e6afb, #06b6d4)",
                  }}
                />

                <button className="faq-m-btn" onClick={() => toggle(i)}>
                  <span className={`faq-m-num ${isOpen ? "faq-m-num-open" : "faq-m-num-closed"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`faq-m-q ${isOpen ? "faq-m-q-open" : "faq-m-q-closed"}`}>
                    {faq.question}
                  </span>
                  <span className={`faq-m-chevron ${isOpen ? "faq-m-chevron-open" : "faq-m-chevron-closed"}`}>
                    <ChevronDown
                      size={15}
                      strokeWidth={2.2}
                      color={isOpen ? "#fff" : "#1e6afb"}
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.32s cubic-bezier(.34,1.56,.64,1)",
                      }}
                    />
                  </span>
                </button>

                <div
                  className="faq-m-body"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="faq-m-body-inner">
                    <div
                      className="faq-m-ans"
                      style={{
                        opacity: isOpen ? 1 : 0,
                        transform: isOpen ? "translateY(0)" : "translateY(-5px)",
                      }}
                    >
                      {faq.answer}
                    </div>
                  </div>
                </div>

                <div
                  className="faq-m-accent"
                  style={{ opacity: isOpen ? 0.6 : 0 }}
                />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="faq-m-cta faq-m-fade"
          style={{ transitionDelay: "0.45s" }}
        >
          <a href="#demo-book" className="faq-m-ctabtn">
            Book Free Demo
            <ArrowRight size={14} strokeWidth={2.5} />
          </a>
        </div>
      </section>
    </>
  );
}