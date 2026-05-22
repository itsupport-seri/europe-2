"use client";
import { useEffect, useRef, useState } from "react";
import { Play, Star, Globe, Quote } from "lucide-react";

const reviews = [
  { id: "EfHor0B7Nbg", label: "Student From Sri Lanka", sublabel: "Living in UAE",        flag: "🇱🇰", accent: "blue"    },
  { id: "yc8Wyw2wFB0", label: "Student From Oman",      sublabel: "Middle East",           flag: "🇴🇲", accent: "emerald" },
  { id: "nhGtomI2nVU", label: "Student From UAE",       sublabel: "United Arab Emirates",  flag: "🇦🇪", accent: "violet"  },
];

const accentColors = {
  blue:    { top: "#3b82f6", badge: "#eff6ff",   badgeText: "#1d4ed8" },
  emerald: { top: "#10b981", badge: "#ecfdf5",   badgeText: "#065f46" },
  violet:  { top: "#8b5cf6", badge: "#f5f3ff",   badgeText: "#5b21b6" },
};

const trustStats = [
  { value: "4.9/5", label: "Average Rating" },
  { value: "15K+",  label: "Happy Families"  },
  { value: "190+",  label: "Countries"        },
];

function useInView(threshold) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: threshold || 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function VideoCard({ review, index, visible }) {
  const [playing, setPlaying] = useState(false);
  const a = accentColors[review.accent];
  const thumb = `https://i.ytimg.com/vi/${review.id}/hqdefault.jpg`;

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
        transition: `opacity 0.6s ease ${0.1 + index * 0.08}s, transform 0.6s ease ${0.1 + index * 0.08}s, box-shadow 0.4s`,
      }}
    >
      {/* Coloured top bar */}
      <div style={{ height: 4, background: a.top }} />

      {/* Video — fills the card, no footer below */}
      <div className="relative aspect-video overflow-hidden bg-slate-900">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${review.id}?autoplay=1&rel=0`}
            title={`Review from ${review.label}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play review from ${review.label}, ${review.sublabel}`}
            className="group/btn relative block h-full w-full cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumb} alt=""
              loading="lazy" decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover/btn:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
            <div className="absolute top-3 left-3 opacity-40">
              <Quote size={20} className="text-white fill-white" />
            </div>
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="relative flex size-16 items-center justify-center rounded-full bg-white shadow-2xl ring-4 ring-white/30 transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:ring-white/60">
                <Play size={22} className="fill-red-600 text-red-600 ml-1" />
                <span className="absolute inset-0 rounded-full bg-white/30 animate-ping opacity-60" />
              </span>
            </span>
            <span className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
              ▶ Watch
            </span>
          </button>
        )}
      </div>
      {/* ← Footer/badge strip removed */}
    </article>
  );
}

export default function ReviewsDesktop() {
  const [headerRef, headerVisible] = useInView(0.2);
  const [gridRef,   gridVisible]   = useInView(0.08);

  return (
    <section
      id="reviews"
      className="relative scroll-mt-28 overflow-hidden border-y border-blue-100 py-16 md:py-10"
      style={{ background: "linear-gradient(160deg, #f8faff 0%, #eff6ff 50%, #f0f9ff 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 right-0 w-[400px] h-[400px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 -left-20 w-[350px] h-[350px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 70%)" }} />
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="rdots-dt" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.2" fill="#93c5fd" fillOpacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#rdots-dt)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-14 space-y-14">

        <header
          ref={headerRef}
          className="text-center space-y-5"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <h2 className="text-5xl font-extrabold leading-tight" style={{ color: "#5b5b5b" }}>
            Designed for Every
            <span className="relative inline-block text-blue-700 ps-2">
              Kind of Learner
              <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6"
                preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 5 Q50 0 100 4 Q150 8 200 3" stroke="#1d4ed8" strokeWidth="3"
                  fill="none" strokeLinecap="round"
                  style={{
                    strokeDasharray: 220,
                    strokeDashoffset: headerVisible ? 0 : 220,
                    transition: "stroke-dashoffset 1.1s ease 0.5s",
                  }}
                />
              </svg>
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-slate-500 leading-relaxed">
            Perfect for athletes, traveling families, gifted learners, and students who need flexible,
            personalized education.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            {trustStats.map(({ value, label }, i) => (
              <div
                key={label}
                className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-2xl px-5 py-2.5 shadow-sm"
                style={{
                  opacity: headerVisible ? 1 : 0,
                  transform: headerVisible ? "translateY(0)" : "translateY(10px)",
                  transition: `opacity 0.5s ease ${0.3 + i * 0.1}s, transform 0.5s ease ${0.3 + i * 0.1}s`,
                }}
              >
                <span className="text-xl font-extrabold text-slate-900">{value}</span>
                <span className="text-xs font-semibold text-slate-500">{label}</span>
              </div>
            ))}
          </div>
        </header>

        <div ref={gridRef} className="grid gap-5 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <VideoCard key={review.id} review={review} index={i} visible={gridVisible} />
          ))}
        </div>

        <h2 className="text-3xl font-extrabold text-center leading-tight" style={{ color: "#1d4ed8" }}>
          Learn Anywhere.{" "}
          <span className="text-[1.85rem]">Grow Everywhere.</span>
        </h2>

        <div
          className="flex items-center justify-between gap-5 rounded-3xl border border-blue-200 bg-white px-7 py-6 shadow-sm"
          style={{
            opacity: gridVisible ? 1 : 0,
            transition: "opacity 0.7s ease 0.7s",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-blue-100">
              <Globe size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">Join Families From 190+ Countries</p>
              <p className="text-xs text-slate-500 mt-0.5">Experience world-class education from home</p>
            </div>
          </div>
          
           <a href="#demo-book"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3 text-sm font-bold text-white shadow-md shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 shrink-0"
          >
            Book Free Demo →
          </a>
        </div>

      </div>
    </section>
  );
}