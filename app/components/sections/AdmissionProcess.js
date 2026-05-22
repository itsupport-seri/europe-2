"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const AdmissionDesktop = dynamic(() => import("./AdmissionDesktop"), { ssr: false });
const AdmissionMobile  = dynamic(() => import("./AdmissionMobile"), { ssr: false });

export default function AdmissionProcess() {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (isMobile === null) return null;
  return isMobile ? <AdmissionMobile /> : <AdmissionDesktop />;
}