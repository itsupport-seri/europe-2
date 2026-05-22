"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const AccreditationDesktop = dynamic(() => import("./AccreditationDesktop"), { ssr: false });
const AccreditationMobile = dynamic(() => import("./AccreditationMobile"), { ssr: false });

/**
 * Parent component — renders the correct variant based on device width.
 * Uses a lightweight useState + resize listener (no heavy lib needed).
 * SSR-safe: defaults to null on first render, avoids hydration mismatch.
 */
export default function AccreditationSection() {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);

    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Avoid layout shift on SSR — render nothing until JS resolves
  if (isMobile === null) return null;

  return isMobile ? <AccreditationMobile /> : <AccreditationDesktop />;
}