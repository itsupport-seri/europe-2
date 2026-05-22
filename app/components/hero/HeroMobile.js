"use client";

/**
 * HeroMobile.jsx
 * Renders only on viewports < 900px.
 * Design: centered content, full-bleed slider, large tap targets,
 * urgency bar, single-column CTAs — optimised for Meta ad traffic.
 */

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import {
  Radio, CalendarCheck, PhoneCall, BookOpen,
  ChevronLeft, ChevronRight, Zap, ShieldCheck, Clock3, Award,
} from "lucide-react";
import { STATS, ACCREDS, SLIDES } from "./heroData";
import styles from "./HeroMobile.module.css";

export default function HeroMobile({ visible }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgErrors,   setImgErrors]   = useState({});

  const goTo = useCallback(
    (n) => setActiveIndex((n + SLIDES.length) % SLIDES.length),
    []
  );

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => goTo(activeIndex + 1), 4500);
    return () => clearInterval(id);
  }, [activeIndex, goTo, visible]);

  const onImgError = (i) =>
    setImgErrors((prev) => ({ ...prev, [i]: true }));

  return (
    <>
      {/* ── ANNOUNCEMENT BAR ── */}
      <div className={styles.announceBar}>
        <Zap size={12} aria-hidden="true" className={styles.announceIcon} />
        Admissions Open — Limited Seats for July &amp; September 2026
      </div>

      <section className={styles.section} aria-label="Hero">

        {/* ── LIVE BADGE ── */}
        <div className={styles.liveBadge}>
          <span className={styles.liveDotWrap}>
            <span className={styles.ping} />
            <span />
          </span>
          <Radio size={11} aria-hidden="true" />
          <span>Trusted Online School Since 2014</span>
        </div>

        {/* ── HEADLINE ── */}
        <h1 className={styles.heading}>
          <span className={styles.headingSm}>The Freedom to Learn From Anywhere.</span>
          <span className={styles.headingLg}>
            Best American Online School{" "}
            <em className={styles.green}>in Europe.</em>
          </span>
          <span className={styles.headingLg}>
            <em className={styles.blue}>Flexible. Accredited.<br />Future-Ready.</em>
          </span>
        </h1>

        {/* ── SUB COPY ── */}
        <p className={styles.sub}>
          <span className={styles.grade}>KG – Grade 12</span> American Curriculum
        </p>

        <p className={styles.accredLine}>
          <ShieldCheck size={13} aria-hidden="true" className={styles.shield} />
          Fully Accredited by NEASC, WASC &amp; Cognia, USA
        </p>

        {/* ── ACCREDITATION LOGO ── */}
        <div className={styles.accredLogoWrap}>
          <Image
            src="/new-strip.avif"
            alt="NEASC, WASC, Cognia and College Board accreditation logos"
            width={340}
            height={56}
            className={styles.accredLogoImg}
            priority
            decoding="async"
            quality={75}
          />
        </div>

        {/* ── ACCRED PILLS (always visible as supplement) ── */}
        {/* <div className={styles.accredPills}>
          {ACCREDS.map((a) => (
            <span key={a} className={styles.pill}>
              <Award size={9} aria-hidden="true" />
              {a}
            </span>
          ))}
        </div> */}

        {/* ── FULL-BLEED SLIDER ── */}
        <div className={styles.sliderOuter}>
          <div className={styles.sliderTrack} aria-live="polite" aria-atomic="true">
            {SLIDES.map((slide, i) => (
              <div
                key={i}
                className={`${styles.slide}${activeIndex === i ? ` ${styles.active}` : ""}`}
                aria-hidden={activeIndex !== i}
              >
                {!imgErrors[i] ? (
                  <div className={styles.slideImgWrap}>
                    <Image
                      src={slide.src}
                      alt={slide.label}
                      fill
                      sizes="100vw"
                      quality={i === 0 ? 75 : 60}
                      priority={visible && i === 0}
                      loading={i === 0 && visible ? undefined : "lazy"}
                      decoding="async"
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                      onError={() => onImgError(i)}
                    />
                  </div>
                ) : (
                  <div className={styles.slideFallback} style={{ background: slide.fallbackBg }} />
                )}
                <div className={styles.slideOverlay} />
                <span className={styles.slideCounter}>{i + 1} / {SLIDES.length}</span>
                <p className={styles.slideLabel}>{slide.label}</p>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button className={`${styles.navBtn} ${styles.navPrev}`} aria-label="Previous slide" onClick={() => goTo(activeIndex - 1)}>
            <ChevronLeft size={15} strokeWidth={2.5} />
          </button>
          <button className={`${styles.navBtn} ${styles.navNext}`} aria-label="Next slide" onClick={() => goTo(activeIndex + 1)}>
            <ChevronRight size={15} strokeWidth={2.5} />
          </button>

          {/* Bullets */}
          <div className={styles.bullets} role="tablist">
            {SLIDES.map((_, i) => (
              <button
                key={i} type="button" role="tab"
                aria-selected={activeIndex === i}
                aria-label={`Slide ${i + 1}`}
                className={`${styles.bullet}${activeIndex === i ? ` ${styles.bulletActive}` : ""}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>

        {/* ── PROGRESS BARS ── */}
        <div className={styles.progressRow} role="tablist">
          {SLIDES.map((_, i) => (
            <button
              key={i} type="button" role="tab"
              aria-selected={activeIndex === i}
              aria-label={`Slide ${i + 1}`}
              className={`${styles.progressDot}${activeIndex === i ? ` ${styles.progressDotActive}` : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        {/* ── STATS ── */}
        <div className={styles.statsCard}>
          {STATS.map((s, i) => (
            <span key={s.label} className={styles.statsGroup}>
              {i > 0 && <span className={styles.statSep} aria-hidden="true" />}
              <span className={styles.statItem}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </span>
            </span>
          ))}
        </div>

        {/* ── URGENCY BAR ── */}
        <div className={styles.urgencyBar}>
          <Zap size={15} className={styles.urgencyIcon} aria-hidden="true" />
          <div className={styles.urgencyText}>
            <strong>Admissions Open — Hurry Up!</strong>
            <span>Seats filling fast for July &amp; Sep 2026</span>
          </div>
          <span className={styles.urgencyBadge}>
            <Clock3 size={10} aria-hidden="true" />
            Act Now
          </span>
        </div>

        {/* ── CTAs ── */}
        <div className={styles.ctaStack}>
          <a href="#demo-book" className={styles.btnPrimary}>
            <CalendarCheck size={17} aria-hidden="true" />
            Book a Free Demo 
          </a>
          <div className={styles.btnRow}>
            <a href="#callback" className={styles.btnOutline}>
              <PhoneCall size={15} aria-hidden="true" />
              Book Callback
            </a>
            <a href="https://internationalschooling.org/download-brochure" className={styles.btnAmber}>
              <BookOpen size={15} aria-hidden="true" />
              Get Brochure
            </a>
          </div>
        </div>

        {/* ── TRUST ROW ── */}
        <div className={styles.trustRow}>
          {["Free Demo", "No Commitment", "Since 2014"].map((t, i) => (
            <span key={t} className={styles.trustItem}>
              {i > 0 && <span className={styles.trustSep} aria-hidden="true" />}
              <ShieldCheck size={12} aria-hidden="true" />
              {t}
            </span>
          ))}
        </div>

      </section>
    </>
  );
}