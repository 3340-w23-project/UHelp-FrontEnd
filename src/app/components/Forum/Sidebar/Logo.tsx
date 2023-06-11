import React from "react";
import styles from "@/app/styles/Forum.module.scss";
import Link from "next/link";
import Image from "next/image";
import { AppConfig } from "@/utils/AppConfig";

function Header() {
  return (
    <Link href="/">
      <div className={styles.logo}>
        <Image
          priority
          loading="eager"
          src={AppConfig.siteLogo}
          alt={AppConfig.siteName + " Logo"}
          quality={100}
          width={50}
          height={50}
        />
        <h2>{AppConfig.siteName}</h2>
      </div>
    </Link>
  );
}

export default Header;
