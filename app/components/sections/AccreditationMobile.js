"use client";
import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Award, Star, CheckCircle2 } from "lucide-react";
import Image from "next/image";

function useInView(threshold = 0.15, rootMargin = "0px") {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold, rootMargin }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);
  return [ref, visible];
}

const BADGES = [
  { label: "Globally Trusted",         icon: Star,       textColor: "#d97706", bgColor: "#fffbeb", ringColor: "#fde68a" },
  { label: "Quality Assured",           icon: ShieldCheck, textColor: "#2563eb", bgColor: "#eff6ff", ringColor: "#bfdbfe" },
  { label: "Internationally Recognized",icon: Award,      textColor: "#059669", bgColor: "#ecfdf5", ringColor: "#a7f3d0" },
];

const STATS = [
  { value: "190+", label: "Countries" },
  { value: "15K+", label: "Students" },
  { value: "Top",  label: "Universities" },
];

const STRIPS = [
  {
    src: "/new-strip.avif",
    alt: "Accreditations: NEASC, WASC, Cognia",
    caption: "NEASC · WASC · Cognia",
    badge: "✓ Active",
    icon: ShieldCheck,
    title: "Accreditation Bodies",
    sub: "USA-based certification",
    w: 720, h: 60,
  },
  {
    src: "/second-strip.avif",
    alt: "Recognitions: NCAA, College Board, CID",
    caption: "NCAA · College Board · CID",
    badge: "✓ Verified",
    icon: Award,
    title: "Global Recognitions",
    sub: "Trusted by world institutions",
    w: 960, h: 139,
  },
];

const KEYFRAMES = `
@keyframes acc-fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes acc-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes acc-slide-up {
  from { opacity: 0; transform: translateY(28px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0)   scale(1); }
}
@keyframes acc-underline {
  from { stroke-dashoffset: 220; }
  to   { stroke-dashoffset: 0; }
}
@keyframes acc-shimmer {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}
@keyframes acc-pulse-dot {
  0%, 100% { transform: scale(1);   opacity: 1; }
  50%       { transform: scale(1.5); opacity: 0.6; }
}
`;

export default function AccreditationMobile() {
  const [headerRef, headerVisible] = useInView(0.1, "0px 0px -60px 0px");
  const [statsRef,  statsVisible]  = useInView(0.2);
  const [strip1Ref, strip1Visible] = useInView(0.15);
  const [strip2Ref, strip2Visible] = useInView(0.15);

  return (
    <>
      <style>{KEYFRAMES}</style>

      <section
        id="accreditation"
        aria-labelledby="mob-accreditation-title"
        className="relative overflow-hidden bg-white"
        style={{ paddingTop: 44, paddingBottom: 52 }}
      >
        {/* Top line */}
        <div aria-hidden="true" style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg, transparent, #93c5fd 40%, #6ee7b7 60%, transparent)",
        }} />

        {/* Ambient blobs */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -40, right: -60, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(191,219,254,0.32) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: -30, left: -40, width: 190, height: 190, borderRadius: "50%", background: "radial-gradient(circle, rgba(167,243,208,0.25) 0%, transparent 70%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 10, padding: "0 18px" }}>

          {/* ── Header ── */}
          <header
            ref={headerRef}
            style={{
              textAlign: "center", marginBottom: 24,
              animationName: headerVisible ? "acc-fade-up" : "none",
              animationDuration: "0.65s",
              animationTimingFunction: "ease",
              animationFillMode: "both",
            }}
          >
            {/* Eyebrow pill */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "linear-gradient(135deg, #eff6ff, #f0fdf4)",
              border: "1px solid #bfdbfe", borderRadius: 99,
              padding: "5px 14px", marginBottom: 14,
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: "50%", background: "#2563eb",
                display: "inline-block",
                animationName: "acc-pulse-dot",
                animationDuration: "2s",
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
              }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "#1d4ed8", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Accredited &amp; Recognized
              </span>
            </div>

            {/* Title */}
            <h2
              id="mob-accreditation-title"
              style={{
                fontFamily: "var(--font-display, Georgia, serif)",
                fontSize: 25, fontWeight: 800, lineHeight: 1.25,
                margin: "0 0 10px", color: "#1e293b",
              }}
            >
              Fully Accredited{" "}
              <span style={{ color: "#94a3b8", fontStyle: "italic", fontWeight: 400 }}>&amp;</span>
              <br />
              <span style={{ position: "relative", display: "inline-block", color: "#2563eb" }}>
                Globally Recognized
                <svg
                  style={{ position: "absolute", bottom: -3, left: 0, width: "100%" }}
                  height="6" viewBox="0 0 200 6" preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                >
                  <path
                    d="M0 5 Q50 0 100 4 Q150 8 200 3"
                    stroke="#3b82f6" strokeWidth="2.5" fill="none" strokeLinecap="round"
                    style={{
                      strokeDasharray: 220,
                      animationName: headerVisible ? "acc-underline" : "none",
                      animationDuration: "1.1s",
                      animationTimingFunction: "ease",
                      animationDelay: "0.5s",
                      animationFillMode: "both",
                    }}
                  />
                </svg>
              </span>
            </h2>

            <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, margin: "0 auto", maxWidth: 310 }}>
              15,000+ students worldwide — certified teachers, American curriculum.
            </p>
          </header>

          {/* ── Stats row ── */}
          <div
            ref={statsRef}
            style={{
              display: "flex", justifyContent: "space-around",
              background: "linear-gradient(135deg, #1e40af 0%, #1d4ed8 50%, #0369a1 100%)",
              borderRadius: 20, padding: "16px 10px", marginBottom: 22,
              animationName: statsVisible ? "acc-fade-up" : "none",
              animationDuration: "0.6s",
              animationTimingFunction: "ease",
              animationDelay: "0.1s",
              animationFillMode: "both",
            }}
          >
            {STATS.map(({ value, label }, i) => (
              <div key={label} style={{ textAlign: "center", flex: 1 }}>
                {/*
                  FIX: split animation shorthand into separate properties
                  so animationDelay doesn't conflict with the animation shorthand.
                */}
                <p style={{
                  fontSize: 20, fontWeight: 800, margin: 0,
                  fontFamily: "var(--font-display, Georgia, serif)",
                  background: "linear-gradient(90deg, #fff 0%, #bfdbfe 40%, #fff 60%, #fff 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  /* Split shorthand → no conflict */
                  animationName: statsVisible ? "acc-shimmer" : "none",
                  animationDuration: "3s",
                  animationTimingFunction: "linear",
                  animationIterationCount: "infinite",
                  animationDelay: `${i * 0.3}s`,
                }}>
                  {value}
                </p>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", margin: "2px 0 0", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* ── Badge pills — horizontal centered row, wraps to 2nd line if needed ── */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 8,
            marginBottom: 24,
          }}>
            {BADGES.map(({ label, icon: Icon, textColor, bgColor, ringColor }, i) => (
              <div
                key={label}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: bgColor,
                  border: `1px solid ${ringColor}`,
                  borderRadius: 99,
                  padding: "7px 12px",
                  /* Split shorthand → no conflict */
                  animationName: headerVisible ? "acc-slide-up" : "none",
                  animationDuration: "0.5s",
                  animationTimingFunction: "ease",
                  animationDelay: `${0.1 + i * 0.1}s`,
                  animationFillMode: "both",
                }}
              >
                <Icon size={13} color={textColor} />
                <span style={{ fontSize: 12, fontWeight: 700, color: textColor, whiteSpace: "nowrap" }}>{label}</span>
              </div>
            ))}
          </div>

          {/* ── Logo Strip Cards ── */}
          {STRIPS.map(({ src, alt, caption, badge, icon: Icon, title, sub, w, h }, idx) => {
            const [ref, visible] = idx === 0
              ? [strip1Ref, strip1Visible]
              : [strip2Ref, strip2Visible];

            return (
              <div
                key={caption}
                ref={ref}
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 22,
                  padding: "16px 14px",
                  marginBottom: idx === 0 ? 14 : 0,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  willChange: visible ? "auto" : "opacity, transform",
                  /* Split shorthand */
                  animationName: visible ? "acc-slide-up" : "none",
                  animationDuration: "0.6s",
                  animationTimingFunction: "ease",
                  animationDelay: `${idx * 0.12}s`,
                  animationFillMode: "both",
                }}
              >
                {/* Card header */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 11,
                    background: "#eff6ff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <Icon size={16} color="#2563eb" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 12, fontWeight: 800, color: "#1e293b", margin: 0, lineHeight: 1.3 }}>{title}</p>
                    <p style={{ fontSize: 10, color: "#94a3b8", margin: 0, fontWeight: 500 }}>{sub}</p>
                  </div>
                  <span style={{
                    fontSize: 10, fontWeight: 700, color: "#2563eb",
                    background: "#eff6ff", border: "1px solid #bfdbfe",
                    borderRadius: 99, padding: "4px 10px", flexShrink: 0,
                  }}>
                    {badge}
                  </span>
                </div>

                {/* Logo image */}
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  height: 54, background: "#f8fafc", borderRadius: 12,
                  padding: "0 10px", marginBottom: 10,
                }}>
                  <Image
                    src={src}
                    alt={alt}
                    width={w}
                    height={h}
                    loading="lazy"
                    style={{ height: "auto", width: "100%", maxWidth: idx === 0 ? 260 : 300, objectFit: "contain" }}
                    sizes="(max-width: 767px) 300px"
                  />
                </div>

                <p style={{
                  textAlign: "center", fontSize: 10, color: "#94a3b8",
                  fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", margin: 0,
                }}>
                  {caption}
                </p>
              </div>
            );
          })}

          {/* ── Bottom micro-copy ── */}
          {/* <div style={{
            marginTop: 26, textAlign: "center",
            animationName: strip2Visible ? "acc-fade-in" : "none",
            animationDuration: "0.7s",
            animationTimingFunction: "ease",
            animationDelay: "0.35s",
            animationFillMode: "both",
          }}>
            <p style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
              Recognized by
            </p>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              {["190+ Countries", "15,000+ Students", "Top Universities"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#93c5fd", display: "inline-block" }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#475569" }}>{item}</span>
                </div>
              ))}
            </div>
          </div> */}

        </div>

        {/* Bottom line */}
        <div aria-hidden="true" style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg, transparent, #6ee7b7 40%, #93c5fd 60%, transparent)",
        }} />
      </section>
    </>
  );
}