import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { Features } from "@/components/home/features";
import { UniversityCarousel } from "@/components/home/university-carousel";
import { CTASection } from "@/components/home/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <UniversityCarousel />
      <CTASection />
    </>
  );
}
