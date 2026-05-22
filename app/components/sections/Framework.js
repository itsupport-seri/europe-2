

"use client";
import { useEffect, useState } from "react";
import FrameworkDesktop from "./FrameworkDesktop";
import FrameworkMobile from "./FrameworkMobile";

/**
 * Parent — renders correct variant based on viewport width.
 * SSR-safe: returns null until JS resolves (no hydration mismatch).
 * Single matchMedia listener, auto-cleans up.
 */
export default function Framework() {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (isMobile === null) return null;
  return isMobile ? <FrameworkMobile /> : <FrameworkDesktop />;
}
