"use client";

/**
 * HeroDesktop.jsx
 * Renders only on viewports ≥ 900px.
 * Design: left copy + right media side-by-side, hover zoom on slider,
 * floating stats cards, prominent three-button CTA row.
 */

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import {
  Radio, CalendarCheck, PhoneCall, BookOpen,
  ChevronLeft, ChevronRight, Zap, ShieldCheck, Clock3, Award,
  Users, Globe, GraduationCap,
} from "lucide-react";
import { STATS, ACCREDS, SLIDES } from "./heroData";
import styles from "./HeroDesktop.module.css";

const STAT_ICONS = [Users, Globe, GraduationCap];

export default function HeroDesktop() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgErrors,   setImgErrors]   = useState({});

  const goTo = useCallback(
    (n) => setActiveIndex((n + SLIDES.length) % SLIDES.length),
    []
  );

  useEffect(() => {
    const id = setInterval(() => goTo(activeIndex + 1), 4500);
    return () => clearInterval(id);
  }, [activeIndex, goTo]);

  const onImgError = (i) =>
    setImgErrors((prev) => ({ ...prev, [i]: true }));

  return (
    <>
      {/* ── ANNOUNCEMENT BAR ── */}
      <div className={styles.announceBar}>
        <Zap size={13} aria-hidden="true" className={styles.announceIcon} />
        Admissions Open — Limited Seats Available for July &amp; September 2026 Intake
      </div>

      <section className={styles.section} aria-label="Hero">
        <div className={styles.inner}>

          {/* ══════════════ LEFT COPY ══════════════ */}
          <div className={styles.copy}>

            {/* Live badge */}
            <div className={styles.liveBadge}>
              <span className={styles.liveDotWrap}>
                <span className={styles.ping} />
                <span />
              </span>
              <Radio size={12} aria-hidden="true" />
              <span>Trusted Online School Since 2014</span>
            </div>

            {/* Headline */}
            <h1 className={styles.heading}>
              <span className={styles.headingSm}>The Freedom to Learn From Anywhere.</span>
              <span className={styles.headingLg}>
                Best American Online School{" "}
                <em className={styles.green}>in Europe.</em>
              </span>
              <span className={styles.headingLg}>
                <em className={styles.blue}>Flexible. Accredited.</em>
              </span>
              <span className={styles.headingLg}>
                <em className={styles.blue}>Future-Ready.</em>
              </span>
            </h1>

            {/* Sub */}
            <p className={styles.sub}>
              <span className={styles.grade}>KG – Grade 12</span> American Curriculum
            </p>

            <p className={styles.accredLine}>
              <ShieldCheck size={15} aria-hidden="true" className={styles.shield} />
              Fully Accredited by NEASC, WASC &amp; Cognia, USA
            </p>

            {/* Accred logo */}
            <div className={styles.accredLogoWrap}>
              <Image
                src="/new-strip.avif"
                alt="NEASC, WASC, Cognia and College Board accreditation logos"
                width={380}
                height={75}
                className={styles.accredLogoImg}
                priority
                decoding="async"
                quality={80}
              />
            </div>

            {/* Accred pills */}
            {/* <div className={styles.accredPills}>
              {ACCREDS.map((a) => (
                <span key={a} className={styles.pill}>
                  <Award size={10} aria-hidden="true" />
                  {a}
                </span>
              ))}
            </div> */}

            {/* Urgency bar */}
            <div className={styles.urgencyBar}>
              <Zap size={15} className={styles.urgencyIcon} aria-hidden="true" />
              <div className={styles.urgencyText}>
                <strong>Admissions Open — Hurry Up!</strong>
                <span>Seats filling fast for July &amp; September 2026</span>
              </div>
              <span className={styles.urgencyBadge}>
                <Clock3 size={10} aria-hidden="true" />
                Act Now
              </span>
            </div>

            {/* CTAs */}
            <div className={styles.ctaRow}>
              <a href="#demo-book" className={styles.btnPrimary}>
                <CalendarCheck size={17} aria-hidden="true" />
                Book a Free Demo 
              </a>
              <a href="#callback" className={styles.btnOutline}>
                <PhoneCall size={15} aria-hidden="true" />
                Book Callback
              </a>
              <a href="https://internationalschooling.org/download-brochure" className={styles.btnAmber}>
                <BookOpen size={15} aria-hidden="true" />
                Get Brochure
              </a>
            </div>

            {/* Trust row */}
            <div className={styles.trustRow}>
              {["Free Demo", "No Commitment", "Since 2014"].map((t, i) => (
                <span key={t} className={styles.trustItem}>
                  {i > 0 && <span className={styles.trustSep} aria-hidden="true" />}
                  <ShieldCheck size={13} aria-hidden="true" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* ══════════════ RIGHT MEDIA ══════════════ */}
          <div className={styles.media}>
            <p className={styles.mediaCaption}>
              Happy Students &amp; Satisfied Parents from 190+ Countries
            </p>

            {/* Slider */}
            <div className={styles.sliderOuter}>

              <button className={`${styles.navBtn} ${styles.navPrev}`} aria-label="Previous slide" onClick={() => goTo(activeIndex - 1)}>
                <ChevronLeft size={16} strokeWidth={2.5} />
              </button>
              <button className={`${styles.navBtn} ${styles.navNext}`} aria-label="Next slide" onClick={() => goTo(activeIndex + 1)}>
                <ChevronRight size={16} strokeWidth={2.5} />
              </button>

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
                          sizes="(max-width: 1280px) 44vw, 520px"
                          quality={i === 0 ? 80 : 70}
                          priority={i === 0}
                          loading={i === 0 ? undefined : "lazy"}
                          decoding="async"
                          style={{ objectFit: "cover" }}
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

            {/* Progress bars */}
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

            {/* Stats — desktop uses icon cards */}
            <div className={styles.statsRow}>
              {STATS.map((s, i) => {
                const Icon = STAT_ICONS[i];
                return (
                  <div key={s.label} className={styles.statCard}>
                    <Icon size={18} className={styles.statIcon} aria-hidden="true" />
                    <strong className={styles.statVal}>{s.value}</strong>
                    <span className={styles.statLbl}>{s.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}