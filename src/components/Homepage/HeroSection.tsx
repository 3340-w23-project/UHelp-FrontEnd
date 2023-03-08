import Link from "next/link";
import React from "react";
import { Button } from "../Button";
import styles from "@/styles/Home.module.scss";
import { AppConfig } from "@/utils/AppConfig";
import { MdOutlineLogin } from "react-icons/md";

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
      <Button xl Icon={MdOutlineLogin} href="/signup" label="Join Now" />
    </div>
  );
};

export default HeroSection;
