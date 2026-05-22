import Navbar from "@/app/components/Navbar";
import HeroSection from "@/app/components/hero/HeroSection";
import BelowFoldSections from "@/app/components/BelowFoldSections";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-0">
        <HeroSection />
        <BelowFoldSections />
      </main>
    </>
  );
}
