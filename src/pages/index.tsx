import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import { Navbar } from "@/components/Navbar/Navbar";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";

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
          <h1 className={styles.heading}>UHelp</h1>
          <div className={styles.description}>
            {"Get "}
            <span className={styles.headingPrimary}>Help </span>
            {"and "}
            <span className={styles.headingPrimary}>Connect </span>
            {"with Peers."}
          </div>

          <Link href="">
            <Button xl>Join Now</Button>
          </Link>
        </Section>
        <Section
          title="What is UHelp?"
          description="UHelp is a platform that connects students with peers to help them with their academic needs."
        />
      </main>
    </>
  );
}
