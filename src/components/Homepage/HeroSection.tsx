import React from "react";
import styles from "@/styles/Home.module.scss";
import Button from "../Button";
import BackgroundPage from "./HeroBackground";
import { AppConfig } from "@/utils/AppConfig";
import { MdOutlineLogin } from "react-icons/md";
import { useAppSelector } from "@/redux/store";

type HeroSectionProps = {
  description: string;
  actionLabel: string;
  actionHref: string;
};

const HeroSection = ({
  description,
  actionLabel,
  actionHref,
}: HeroSectionProps) => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
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
          href={isAuth ? "/forum/1" : actionHref}
          label={isAuth ? "Go to Forum" : actionLabel}
        />
      </div>
    </>
  );
};

export default HeroSection;
