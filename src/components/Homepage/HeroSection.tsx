import React from "react";
import styles from "@/styles/Home.module.scss";
import Button from "../Button";
import BackgroundPage from "./HeroBackground";
import { AppConfig } from "@/utils/AppConfig";
import { MdOutlineLogin } from "react-icons/md";

type HeroSectionProps = {
  description: string;
  actionLabel: string;
  actionHref: string;
  isSignedIn: boolean;
};

const HeroSection = ({
  description,
  actionLabel,
  actionHref,
  isSignedIn,
}: HeroSectionProps) => {
  return (
    <>
      <BackgroundPage />
      <div className={styles.heroSectionWrapper}>
        <h1 className={styles.heading}>{AppConfig.siteName}</h1>

        <div className={styles.description}>
          {description.split("_").map((word, index) =>
            index % 2 ? (
              <span key={index} className={styles.highlight}>
                {word}
              </span>
            ) : (
              <span key={index}>{word}</span>
            )
          )}
        </div>

        <Button
          xl
          icon={MdOutlineLogin}
          href={isSignedIn ? "/forum/1" : actionHref}
          label={isSignedIn ? "Go to Forum" : actionLabel}
        />
      </div>
    </>
  );
};

export default HeroSection;
