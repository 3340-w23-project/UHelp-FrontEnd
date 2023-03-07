import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import { Navbar } from "@/components/Navbar/Navbar";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>UHelp</title>
        <meta name="description" content="UHelp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Navbar />

        <Section hero>
          <h1 className={styles.heroHeading}>UHelp</h1>
          <div className={styles.heroDescription}>
            {"Get "}
            <span className={styles.heroHeadingPrimary}>Help </span>
            {"and "}
            <span className={styles.heroHeadingPrimary}>Connect </span>
            {"with Peers."}
          </div>

          <Link href="">
            <Button xl>Join Now</Button>
          </Link>
        </Section>
        <Section
          heading="What is UHelp?"
          description="UHelp is a platform that connects students with peers to help them with their academic needs."
        />
        <Footer />
      </main>
    </>
  );
}
