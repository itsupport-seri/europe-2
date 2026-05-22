"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
const Framework = dynamic(() => import("@/app/components/sections/Framework"), { ssr: false });
const Accreditationsection = dynamic(() => import("@/app/components/sections/Accreditationsection"), { ssr: false });
const Learningstylesection = dynamic(() => import("@/app/components/sections/Learningstylesection"), { ssr: false });
const Reviewssection = dynamic(() => import("@/app/components/sections/Reviewssection"), { ssr: false });
const AdmissionProcess = dynamic(() => import("@/app/components/sections/AdmissionProcess"), { ssr: false });
const Calender = dynamic(() => import("@/app/components/sections/Calender"), { ssr: false });
const FAQSection = dynamic(() => import("@/app/components/sections/FAQSection"), { ssr: false });
const Ctabanner = dynamic(() => import("@/app/components/sections/Ctabanner"), { ssr: false });


const sections = [

  { key: "accreditation", minHeight: 620, Component: Accreditationsection },
  { key: "Framework", minHeight: 680, Component: Framework },
  { key: "learning", minHeight: 640, Component: Learningstylesection },
  { key: "reviews", minHeight: 980, Component: Reviewssection },
  { key: "admission", minHeight: 900, Component: AdmissionProcess },
  { key: "calender", minHeight: 900, Component: Calender },
  { key: "faq", minHeight: 1180, Component: FAQSection },
  { key: "ctabanner", minHeight: 520, Component: Ctabanner },

];

function LazyMount({ children, minHeight }) {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;

    if (!("IntersectionObserver" in window)) {
      const id = window.setTimeout(() => setMounted(true), 0);
      return () => window.clearTimeout(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0 }
    );

    const node = ref.current;
    if (node) observer.observe(node);

    return () => observer.disconnect();
  }, [mounted]);

  return (
    <div ref={ref} style={mounted ? undefined : { minHeight }} aria-busy={!mounted}>
      {mounted ? children : null}
    </div>
  );
}

export default function BelowFoldSections() {
  // Scroll to section based on URL hash (e.g., #demo-book, #callback)
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash) {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    // Initial scroll on mount
    scrollToHash();
    // Listen for future hash changes
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return (
    <>
      {sections.map(({ key, minHeight, Component }) => {
        const isCalender = key === "calender";
        return (
          <LazyMount key={key} minHeight={minHeight}>
            {isCalender && (
              <>
                <div id="demo-book" />
                <div id="callback" />
              </>
            )}
            <div id={key}>
              <Component />
            </div>
          </LazyMount>
        );
      })}
    </>
  );
}
