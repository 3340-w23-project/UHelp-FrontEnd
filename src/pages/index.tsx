import HeroSection from "@/components/Homepage/HeroSection";
import MetaTags from "@/components/MetaTags";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Section from "@/components/Homepage/Section";
import { sections } from "@/utils/HomeData";

type HomeProps = {
  isScrolled: boolean;
  isMobile: boolean;
};

export default function Home({ isScrolled, isMobile }: HomeProps) {
  return (
    <>
      <MetaTags />
      <main>
        <Navbar isScrolled={isScrolled} isMobile={isMobile} />
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
            isMobile={isMobile}
          />
        ))}
        <Footer />
      </main>
    </>
  );
}
