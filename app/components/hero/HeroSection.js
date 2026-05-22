"use client";

/**
 * HeroSection — Conditional renderer
 *
 * Mounts HeroMobile  when viewport width < 900 px
 * Mounts HeroDesktop when viewport width ≥ 900 px
 *
 * Returns null on the very first server/hydration frame so there
 * is never a layout flash. The blank moment is one paint cycle —
 * invisible to real users.
 *
 * Both child components are lazy-imported so each bundle is only
 * downloaded by the device that actually needs it.
 */

import { useEffect, useState, lazy, Suspense } from "react";

const HeroMobile  = lazy(() => import("./HeroMobile"));
const HeroDesktop = lazy(() => import("./HeroDesktop"));

const MOBILE_BREAKPOINT = 900; // px — keep in sync with CSS

export default function HeroSection() {
  const [isMounted,  setIsMounted]  = useState(false);
  const [isMobile,   setIsMobile]   = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // Set initial value
    setIsMobile(mq.matches);
    setIsMounted(true);

    // Keep in sync on resize / orientation change
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Server render + first hydration paint → render nothing
  // (avoids SSR mismatch; one invisible frame on client)
  if (!isMounted) return null;

  return (
    <Suspense fallback={null}>
      {isMobile ? <HeroMobile /> : <HeroDesktop />}
    </Suspense>
  );
}