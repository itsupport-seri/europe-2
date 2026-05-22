// Updated Navbar with proper key handling and isHash detection
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MessageCircle, Clock, X, Menu } from "lucide-react";

// Updated CTA links with hash navigation
const ctaLinks = [
  { label: "Book Free Demo", href: "#demo-book", primary: false, external: false },
  { label: "Request Callback", href: "#callback", primary: false, external: false },
  // { label: "Enroll Now", href: "https://internationalschooling.org/enrollment", primary: true, external: true },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactBarVisible, setContactBarVisible] = useState(true);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY <= 0) {
            setContactBarVisible(true);
          } else if (currentScrollY > lastScrollY.current && currentScrollY > 40) {
            setContactBarVisible(false);
            setMenuOpen(false);
          } else if (currentScrollY < lastScrollY.current) {
            setContactBarVisible(true);
          }
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Spacer */}
      <div className="h-[3.75rem] lg:h-[calc(3.75rem+2.5rem)]" aria-hidden="true" />

      <header className="fixed top-0 left-0 right-0 z-50 w-full">
        {/* Contact Bar */}
        <div className={`hidden lg:block bg-[#0560cc] overflow-hidden transition-all duration-300 ease-in-out ${contactBarVisible ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between h-10">
            <a href="https://api.whatsapp.com/send?phone=17273902419" target="_blank" rel="noreferrer" className="contact-chip flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 group">
              <span className="relative flex items-center justify-center w-4 h-4 shrink-0">
                <span className="wa-pulse absolute inset-0 rounded-full" />
                <MessageCircle size={12} className="text-[#25d366] relative z-10" />
              </span>
              <span className="text-[11px] font-semibold text-white tracking-wide">24/7 WhatsApp</span>
              <span className="text-[11px] font-semibold text-white tracking-wide">+1 (727) 390-2419</span>
            </a>
            <div className="flex items-center gap-1">
              <a href="tel:+17273902419" className="contact-chip flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10">
                <Phone size={11} className="text-white shrink-0" />
                <span className="text-[11px] font-semibold text-white tracking-wide">+1 (727) 390-2419</span>
              </a>
              <span className="text-white/60 text-xs mx-1">|</span>
              <a href="mailto:support@internationalschooling.org" className="contact-chip flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10">
                <Mail size={11} className="text-white shrink-0" />
                <span className="text-[11px] font-semibold text-white tracking-wide">support@internationalschooling.org</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <div className="bg-white shadow-md border-b border-gray-200">
          <div className="max-w-screen-xl mx-auto px-3 lg:px-6 flex items-center h-[3.75rem]">
            <Link href="/" className="shrink-0 flex items-center">
              <Image src="/logo.avif" alt="International Schooling" width={200} height={44} className="h-6 lg:h-8 w-auto object-contain" priority />
            </Link>

            {/* Desktop CTA buttons */}
            <div className="hidden lg:flex items-center gap-2 ml-auto">
              {ctaLinks.map((cta) => {
                const isHash = cta.href.startsWith("#");
                const commonProps = {
                  href: cta.href,
                  className: cta.primary
                    ? "navbar-cta-btn px-5 py-2 text-[12.5px] font-bold tracking-widest uppercase bg-[#077ffb] text-white rounded-full hover:bg-[#0662d1] transition-colors"
                    : "wave-btn px-4 py-2 text-[12.5px] font-semibold tracking-wide text-[#00d9ff] border-1 border-[#5b5b5b] rounded-full",
                };
                if (isHash) {
                  return (
                    <a key={cta.label} {...commonProps} onClick={() => setMenuOpen(false)}>
                      {cta.label}
                    </a>
                  );
                }
                return (
                  <Link key={cta.label} {...commonProps} target={cta.external ? "_blank" : undefined} rel={cta.external ? "noreferrer" : undefined}>
                    {cta.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile — Book Demo + hamburger */}
            <div className="flex lg:hidden items-center gap-2 ml-auto">
              <a
                href={ctaLinks[0].href}
                onClick={() => setMenuOpen(false)}
                className="wave-btn px-4 py-2 text-[11px] font-semibold tracking-wide text-[#00d9ff] border-1 border-[#5b5b5b] rounded-full"
              >
                {ctaLinks[0].label}
              </a>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Toggle menu"
                className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 transition-colors"
              >
                {menuOpen ? <X size={18} className="text-[#077ffb]" /> : <Menu size={18} className="text-[#077ffb]" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mobile-menu-anim lg:hidden bg-white shadow-xl border-b border-gray-200">
            <div className="bg-[#0560cc] px-4 py-4 flex flex-col gap-3">
              <a href="https://api.whatsapp.com/send?phone=17273902419" target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#25d366]/20 shrink-0">
                  <span className="wa-pulse absolute inset-0 rounded-full" />
                  <MessageCircle size={15} className="text-[#25d366] relative z-10" />
                </span>
                <div>
                  <p className="text-[10px] font-bold text-white uppercase tracking-widest">24/7 WhatsApp Support</p>
                  <p className="text-[13px] font-semibold text-white">+1 (727) 390-2419</p>
                </div>
              </a>
              <a href="tel:+17273902419" className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 shrink-0">
                  <Phone size={14} className="text-white" />
                </span>
                <div>
                  <p className="text-[10px] font-bold text-white uppercase tracking-widest">Available on Call</p>
                  <p className="text-[13px] font-semibold text-white">+1 (727) 390-2419</p>
                  <p className="text-[10px] text-white/80 mt-0.5">10:00 AM – 7:00 PM (UTC +08:00)</p>
                </div>
              </a>
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-bold text-white uppercase tracking-widest px-1">Email Us</p>
                {["info@internationalschooling.org", "support@internationalschooling.org"].map((email) => (
                  <a key={email} href={`mailto:${email}`} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-2.5">
                    <Mail size={13} className="text-white shrink-0" />
                    <span className="text-[12px] text-white font-medium">{email}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="px-4 py-4 flex flex-col gap-2.5">
              {ctaLinks.map((cta) => (
                <a
                  key={cta.label}
                  href={cta.href}
                  target={cta.external ? "_blank" : undefined}
                  rel={cta.external ? "noreferrer" : undefined}
                  className={
                    cta.primary
                      ? "navbar-cta-btn flex items-center justify-center py-3 text-[13px] font-semibold rounded-xl transition-colors bg-[#077ffb] text-white hover:bg-[#0662d1]"
                      : "navbar-cta-btn wave-btn flex items-center justify-center py-3 text-[13px] font-semibold rounded-xl transition-colors border border-gray-200 bg-white text-[#444] hover:border-[#077ffb] hover:text-[#077ffb]"
                  }
                >
                  {cta.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}