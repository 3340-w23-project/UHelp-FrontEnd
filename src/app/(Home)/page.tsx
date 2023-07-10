import HeroSection from "@/components/Homepage/HeroSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Section from "@/components/Homepage/Section";
import { sections } from "@/utils/HomeData";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <Navbar session={session} />
      <HeroSection
        session={session}
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
