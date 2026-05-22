"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const LearningStyleDesktop = dynamic(() => import("./LearningStyleDesktop"), { ssr: false });
const LearningStyleMobile  = dynamic(() => import("./LearningStyleMobile"), { ssr: false });

/**
 * Parent — renders correct variant based on viewport width.
 * SSR-safe: returns null until JS resolves (no hydration mismatch).
 * Breakpoint: ≤767px → mobile, 768px+ → desktop.
 */
export default function LearningStyle() {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (isMobile === null) return null;
  return isMobile ? <LearningStyleMobile /> : <LearningStyleDesktop />;
}