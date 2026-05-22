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

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Inter:wght@400;500;600&display=swap');

  .faq-d * { box-sizing: border-box; margin: 0; padding: 0; }

  .faq-d {
    font-family: 'Inter', sans-serif;
    background: #ffffff;
    padding: 72px 40px 80px;
    position: relative;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
  }

  /* Accent bar top */
  .faq-d-topbar {
    position: absolute;
    top: 0; left: 50%;
    transform: translateX(-50%);
    width: 120px; height: 3px;
    border-radius: 0 0 4px 4px;
    background: linear-gradient(90deg, #1e6afb, #06b6d4);
  }

  /* Decorative circles */
  .faq-d-ring1 {
    position: absolute; top: -80px; left: -80px;
    width: 340px; height: 340px;
    border-radius: 50%;
    border: 1px solid rgba(30,106,251,0.07);
    pointer-events: none;
  }
  .faq-d-ring2 {
    position: absolute; bottom: -60px; right: -60px;
    width: 260px; height: 260px;
    border-radius: 50%;
    border: 1px solid rgba(6,182,212,0.08);
    pointer-events: none;
  }

  /* ── Scroll reveal ── */
  .faq-d-fade {
    opacity: 0;
    transform: translateY(18px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }
  .faq-d-fade.faq-d-in { opacity: 1; transform: translateY(0); }

  /* ── Header ── */
  .faq-d-head {
    text-align: center;
    max-width: 680px;
    margin: 0 auto 52px;
  }
  .faq-d-h2 {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: clamp(1.85rem, 3.6vw, 2.75rem);
    font-weight: 800;
    color: #5b5b5b;
    line-height: 1.15;
    margin-bottom: 12px;
    letter-spacing: -0.02em;
  }
  .faq-d-h2 em {
    color: #1e6afb;
    font-style: normal;
    position: relative;
    display: inline-block;
  }
  .faq-d-sub {
    font-size: 0.9rem;
    color: #64748b;
    max-width: 460px;
    margin: 0 auto;
    line-height: 1.75;
  }

  /* ── Two-column grid ── */
  .faq-d-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    max-width: 1100px;
    margin: 0 auto;
  }

  /* ── Item ── */
  .faq-d-item {
    background: #fff;
    border: 1px solid #e8edf5;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    transition: border-color 0.25s ease, box-shadow 0.25s ease,
                opacity 0.5s ease, transform 0.5s ease;
    opacity: 0;
    transform: translateY(16px);
    will-change: transform, opacity;
  }
  .faq-d-item.faq-d-in { opacity: 1; transform: translateY(0); }
  .faq-d-item.faq-d-open {
    border-color: rgba(30,106,251,0.25);
    box-shadow: 0 4px 20px rgba(30,106,251,0.08);
  }
  .faq-d-item:hover { box-shadow: 0 6px 24px rgba(30,106,251,0.09); }

  /* Question button */
  .faq-d-btn {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    padding: 18px 22px;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
  }

  .faq-d-btn-left {
    display: flex;
    align-items: center;
    gap: 13px;
    flex: 1;
  }

  .faq-d-num {
    width: 28px; height: 28px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700;
    flex-shrink: 0;
    transition: background 0.25s, color 0.25s;
  }
  .faq-d-num-closed { background: #f0f4ff; color: #1e6afb; }
  .faq-d-num-open   { background: #1e6afb; color: #fff; }

  .faq-d-q {
    font-size: 0.88rem;
    font-weight: 600;
    line-height: 1.45;
    transition: color 0.2s;
  }
  .faq-d-q-closed { color: #1e293b; }
  .faq-d-q-open   { color: #0a0f1e; }

  .faq-d-chevron-wrap {
    width: 30px; height: 30px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: background 0.25s;
  }
  .faq-d-chevron-closed { background: #f0f4ff; }
  .faq-d-chevron-open   { background: #1e6afb; }

  /* Answer expand */
  .faq-d-body {
    display: grid;
    transition: grid-template-rows 0.35s cubic-bezier(.4,0,.2,1);
  }
  .faq-d-body-inner { overflow: hidden; }
  .faq-d-ans {
    padding: 0 22px 20px 62px;
    font-size: 0.83rem;
    color: #64748b;
    line-height: 1.7;
    transition: opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s;
  }

  /* Bottom gradient line */
  .faq-d-accent {
    height: 2px;
    background: linear-gradient(90deg, #1e6afb, #06b6d4);
    transition: opacity 0.3s ease;
  }

  /* ── CTA ── */
  .faq-d-cta {
    display: flex;
    justify-content: center;
    margin-top: 44px;
  }
  .faq-d-ctabtn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #1e6afb;
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-size: 0.82rem;
    font-weight: 700;
    padding: 13px 28px;
    border-radius: 100px;
    text-decoration: none;
    box-shadow: 0 4px 14px rgba(30,106,251,0.3);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .faq-d-ctabtn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(30,106,251,0.38);
  }
`;

export default function FAQDesktop() {
  const [activeIndex, setActiveIndex] = useState(null);
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const ctaRef = useRef(null);
  const itemRefs = useRef([]);
  const [titleAnimated, setTitleAnimated] = useState(false);

  useEffect(() => {
    const allTargets = [
      { el: headRef.current, onVis: () => setTitleAnimated(true) },
      { el: ctaRef.current },
      ...itemRefs.current.map((el) => ({ el })),
    ].filter((t) => t.el);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("faq-d-in");
          const t = allTargets.find((t) => t.el === entry.target);
          t?.onVis?.();
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.08 }
    );

    allTargets.forEach(({ el }) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const toggle = (i) => setActiveIndex((prev) => (prev === i ? null : i));

  return (
    <>
      <style>{css}</style>
      <section ref={sectionRef} className="faq-d">
        <div className="faq-d-topbar" />
        <div className="faq-d-ring1" />
        <div className="faq-d-ring2" />

        {/* Header */}
        <div
          ref={headRef}
          className="faq-d-head faq-d-fade"
          style={{ transitionDelay: "0s" }}
        >
          <h2 className="faq-d-h2">
            Frequently{" "}
            <em>
              Ask Questions
              <svg
                style={{ position: "absolute", bottom: -4, left: 0, width: "100%" }}
                height="6"
                viewBox="0 0 200 6"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M0 5 Q50 0 100 4 Q150 8 200 3"
                  stroke="#1e6afb"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 220,
                    strokeDashoffset: titleAnimated ? 0 : 220,
                    transition: "stroke-dashoffset 1.1s ease 0.5s",
                  }}
                />
              </svg>
            </em>
          </h2>
          <p className="faq-d-sub">
            Clear answers to help you understand our online schooling
            experience, accreditation, and student journey.
          </p>
        </div>

        {/* Two-column FAQ grid */}
        <div className="faq-d-grid">
          {faqs.map((faq, i) => {
            const isOpen = activeIndex === i;
            return (
              <div
                key={i}
                ref={(el) => (itemRefs.current[i] = el)}
                className={`faq-d-item${isOpen ? " faq-d-open" : ""}`}
                style={{ transitionDelay: `${0.08 + (i % 10) * 0.04}s` }}
              >
                <button className="faq-d-btn" onClick={() => toggle(i)}>
                  <div className="faq-d-btn-left">
                    <span className={`faq-d-num ${isOpen ? "faq-d-num-open" : "faq-d-num-closed"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`faq-d-q ${isOpen ? "faq-d-q-open" : "faq-d-q-closed"}`}>
                      {faq.question}
                    </span>
                  </div>
                  <div className={`faq-d-chevron-wrap ${isOpen ? "faq-d-chevron-open" : "faq-d-chevron-closed"}`}>
                    <ChevronDown
                      size={16}
                      strokeWidth={2.2}
                      color={isOpen ? "#fff" : "#1e6afb"}
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.35s cubic-bezier(.34,1.56,.64,1)",
                      }}
                    />
                  </div>
                </button>

                <div
                  className="faq-d-body"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="faq-d-body-inner">
                    <div
                      className="faq-d-ans"
                      style={{
                        opacity: isOpen ? 1 : 0,
                        transform: isOpen ? "translateY(0)" : "translateY(-6px)",
                      }}
                    >
                      {faq.answer}
                    </div>
                  </div>
                </div>

                <div
                  className="faq-d-accent"
                  style={{ opacity: isOpen ? 0.6 : 0 }}
                />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="faq-d-cta faq-d-fade"
          style={{ transitionDelay: "0.5s" }}
        >
          <a href="#demo-book" className="faq-d-ctabtn">
            Book Free Demo
            <ArrowRight size={15} strokeWidth={2.5} />
          </a>
        </div>
      </section>
    </>
  );
}