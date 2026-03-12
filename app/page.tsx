import Hero from "@/components/landing/Hero";
import BentoGrid from "@/components/landing/BentoGrid";
import Features from "@/components/landing/Features";
import CTA from "@/components/landing/CTA";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <BentoGrid />
      <Features />
      <CTA />
    </main>
  );
}
