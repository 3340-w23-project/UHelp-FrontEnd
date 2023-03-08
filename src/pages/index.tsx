import Head from "next/head";
import { Navbar } from "@/components/Navbar/Navbar";
import { Section } from "@/components/Homepage/Section";
import { Footer } from "@/components/Footer";
import { AppConfig } from "@/utils/AppConfig";
import HeroSection from "@/components/Homepage/HeroSection";

type HomeProps = {
  isScrolled: boolean;
};

export default function Home(props: HomeProps) {
  return (
    <>
      <Head>
        <title>{`${AppConfig.siteName} - ${AppConfig.siteDescription}`}</title>
        <meta name="description" content={AppConfig.siteDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar isScrolled={props.isScrolled} />
        <HeroSection />
        <Section
          heading="Connect with Classmates and Get Help"
          description="Find academic assistance and connect with peers by joining a class-specific forum. Get multiple perspectives on course material and discover new study techniques to help you succeed in your classes."
          image="/images/img1.png"
        />
        <Section
          heading="Find Answers Quickly and Easily"
          description="Use our efficient and user-friendly platform to quickly find answers to common questions. Browse through threads or use our search function to find the information you need. Follow our guidelines to keep the community organized and helpful."
          image="/images/img2.png"
          reverse
        />
        <Section
          heading="Join a Supportive Community of Learners"
          description="Be part of a safe and respectful community of learners from diverse backgrounds and perspectives. Connect with others, get academic support, and participate in additional resources and events like study groups and online workshops."
          image="/images/img3.png"
        />
        <Footer />
      </main>
    </>
  );
}
