import Link from "next/link";
import styles from "@/styles/Footer.module.scss";
import { AppConfig } from "@/utils/AppConfig";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";

const Footer = () => (
  <div className={styles.footerWrapper}>
    <div className={styles.footer}>
      <Link href="/">
        <Image
          src={AppConfig.siteLogo}
          alt="UHelp"
          quality={100}
          width={75}
          height={75}
        />
      </Link>
      <a
        className={styles.icon}
        href={AppConfig.githubUrl}
        target="_blank"
        rel="noreferrer nofollow">
        <FaGithub />
      </a>
      <span>
        © Copyright {new Date().getFullYear()} {AppConfig.siteName}.
      </span>
    </div>
  </div>
);

export { Footer };
