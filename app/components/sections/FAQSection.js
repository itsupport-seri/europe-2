"use client";

import { useEffect, useState } from "react";
import FAQDesktop from "./FAQDesktop";
import FAQMobile  from "./FAQMobile";

export default function FAQSection() {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (isMobile === null) return null;
  return isMobile ? <FAQMobile /> : <FAQDesktop />;
}