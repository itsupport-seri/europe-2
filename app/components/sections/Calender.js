"use client";

import { useEffect, useRef, useState } from "react"; // add useState
import CalenderForm from "@components/CalenderForm";

// ── add this hook ──────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}
// ──────────────────────────────────────────────────────────

export default function Calender() {
  const containerRef = useRef(null);
  const [sectionRef, sectionVisible] = useInView(0.15);

  useEffect(() => {
    if (window.Calendly) {
      window.Calendly.initInlineWidget({
        url: "https://calendly.com/american-school-uae/30min?hide_gdpr_banner=1",
        parentElement: containerRef.current,
        prefill: {},
        utm: {},
      });
    }
  }, []);

  return (
    <section className="py-16 md:py-15 bg-slate-100" ref={sectionRef}> {/* swap to sectionRef */}
      <div className="r-w max-w-5xl mx-auto">
        <h3 className="text-2xl font-semibold text-slate-800 md:text-4xl text-center">
         
        </h3>
        <h2
          id="home-accreditation-title"
          className="font-[family-name:var(--font-display)] text-[1.85rem] sm:text-4xl font-extrabold text-center leading-tight"
        >
          <span style={{ color: "#5b5b5b" }}>Talk to Our</span>{" "}
        
          <span className="relative inline-block text-blue-600">
              Academic Experts
            <svg
              className="absolute -bottom-1 left-0 w-full"
              height="6"
              viewBox="0 0 200 6"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 5 Q50 0 100 4 Q150 8 200 3"
                stroke="#1e52e1"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 220,
                  strokeDashoffset: sectionVisible ? 0 : 220,
                  transition: "stroke-dashoffset 1.1s ease 0.5s",
                }}
              />
            </svg>
          </span>
        </h2>
        <div id="callback" className="scroll-mt-24" aria-hidden="true"></div>
        <div id="book-demo" className="scroll-mt-24 p-3 md:p-0" ref={containerRef}>
          <CalenderForm folderName="europe" uiVariant="calendly" />
        </div>
      </div>
    </section>
  );
}