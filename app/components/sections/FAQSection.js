"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const FAQDesktop = dynamic(() => import("./FAQDesktop"), { ssr: false });
const FAQMobile  = dynamic(() => import("./FAQMobile"), { ssr: false });

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