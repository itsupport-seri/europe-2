"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ReviewsDesktop = dynamic(() => import("./ReviewsDesktop"), { ssr: false });
const ReviewsMobile  = dynamic(() => import("./ReviewsMobile"), { ssr: false });

/**
 * Parent — SSR-safe conditional render.
 * ≤767px → ReviewsMobile, 768px+ → ReviewsDesktop.
 */
export default function Reviews() {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (isMobile === null) return null;
  return isMobile ? <ReviewsMobile /> : <ReviewsDesktop />;
}