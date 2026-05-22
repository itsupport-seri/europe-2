"use client";

import HeroMobile from "./HeroMobile";
import HeroDesktop from "./HeroDesktop";

export default function HeroSection() {
  return (
    <>
      <div className="lg:hidden block">
        <HeroMobile visible />
      </div>
      <div className="hidden lg:block">
        <HeroDesktop visible />
      </div>
    </>
  );
}
