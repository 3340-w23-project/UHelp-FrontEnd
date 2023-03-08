import { Navbar } from "@/components/Navbar/Navbar";
import { Section } from "@/components/Homepage/Section";
import { Footer } from "@/components/Footer";
import HeroSection from "@/components/Homepage/HeroSection";
import MetaTags from "@/components/MetaTags";

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
        <Section
          isMobile={isMobile}
          heading="Connect with Classmates and Get Help"
          description="Find academic assistance and connect with peers by joining a class-specific forum. Get multiple perspectives on course material and discover new study techniques to help you succeed in your classes."
          image="/images/img1.png"
        />
        <Section
          isMobile={isMobile}
          heading="Find Answers Quickly and Easily"
          description="Use our efficient and user-friendly platform to quickly find answers to common questions. Browse through threads or use our search function to find the information you need. Follow our guidelines to keep the community organized and helpful."
          image="/images/img2.png"
          reverse
        />
        <Section
          isMobile={isMobile}
          heading="Join a Supportive Community of Learners"
          description="Be part of a safe and respectful community of learners from diverse backgrounds and perspectives. Connect with others, get academic support, and participate in additional resources and events like study groups and online workshops."
          image="/images/img3.png"
          buttonLabel="Get Started"
          buttonHref="/signup"
        />
        <Footer />
      </main>
    </>
  );
}
