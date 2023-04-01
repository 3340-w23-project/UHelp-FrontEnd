import { Navbar } from "@/components/Navbar/Navbar";
import { Section } from "@/components/Homepage/Section";
import { Footer } from "@/components/Footer";
import HeroSection from "@/components/Homepage/HeroSection";
import MetaTags from "@/components/MetaTags";
import { sections } from "@/utils/HomeData";

type HomeProps = {
  isScrolled: boolean;
  isMobile: boolean;
  isSignedIn: boolean;
  username: string;
};

export default function Home({
  isScrolled,
  isMobile,
  isSignedIn,
  username,
}: HomeProps) {
  return (
    <>
      <MetaTags />
      <main>
        <Navbar
          isScrolled={isScrolled}
          isMobile={isMobile}
          isSignedIn={isSignedIn}
          username={username}
        />
        <HeroSection
          description="Get _Help_ and _Connect_ with Peers."
          actionLabel="Join Now"
          actionHref="/signup"
          isSignedIn={isSignedIn}
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
