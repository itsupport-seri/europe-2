"use client";

import { useState, useEffect } from "react";
import HeroMobile from "./HeroMobile";
import dynamic from "next/dynamic";

const HeroDesktop = dynamic(() => import("./HeroDesktop"), { ssr: false });

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Render HeroMobile during SSR and initial hydration to match SSR payload exactly.
  if (!mounted) {
    return (
      <div className="lg:hidden block">
        <HeroMobile visible />
      </div>
    );
  }

  return (
    <>
      {isMobile ? (
        <HeroMobile visible />
      ) : (
        <HeroDesktop visible />
      )}
    </>
  );
}
