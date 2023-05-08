"use client";
import HeroSection from "@/app/components/Homepage/HeroSection";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar/Navbar";
import Section from "@/app/components/Homepage/Section";
import { sections } from "@/utils/HomeData";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection
        description="Get _Help_ and _Connect_ with Peers."
        actionLabel="Join Now"
        actionHref="/signup"
      />
      {sections.map((section, index) => (
        <Section
          key={index}
          heading={section.heading}
          description={section.description}
          buttonLabel={section.buttonLabel}
          buttonHref={section.buttonHref}
          image={section.image}
          reverse={section.reverse}
        />
      ))}
      <Footer />
    </main>
  );
}
