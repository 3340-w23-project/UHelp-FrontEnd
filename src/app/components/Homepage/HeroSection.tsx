"use client";
import React from "react";
import styles from "@/app/styles/Home.module.scss";
import Button from "../Button";
import BackgroundPage from "./HeroBackground";
import { AppConfig } from "@/utils/AppConfig";
import { MdOutlineLogin } from "react-icons/md";
import { Session } from "next-auth";

type HeroSectionProps = {
  session: Session | null;
  description: string;
  actionLabel: string;
  actionHref: string;
};

const HeroSection = ({
  session,
  description,
  actionLabel,
  actionHref,
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
          href={session ? "/forum/1" : actionHref}
          label={session ? "Go to Forum" : actionLabel}
        />
      </div>
    </>
  );
};

export default HeroSection;
