import Link from "next/link";
import React from "react";
import { Button } from "../Button";
import styles from "@/styles/Home.module.scss";
import { AppConfig } from "@/utils/AppConfig";

const HeroSection = () => {
  return (
    <div className={styles.heroSectionWrapper}>
      <h1 className={styles.heading}>{AppConfig.siteName}</h1>
      <div className={styles.description}>
        {"Get "}
        <span className={styles.highlight}>Help </span>
        {"and "}
        <span className={styles.highlight}>Connect </span>
        {"with Peers."}
      </div>

      <Link href="">
        <Button xl>Join Now</Button>
      </Link>
    </div>
  );
};

export default HeroSection;
