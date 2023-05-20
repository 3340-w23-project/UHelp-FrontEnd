"use client";
import styles from "@/app/styles/Navbar.module.scss";
import Link from "next/link";
import className from "classnames";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import { useState } from "react";
import { AppConfig } from "@/utils/AppConfig";
import { useAppSelector } from "@/redux/store";
import { useSession } from "next-auth/react";
import DesktopMenu from "./DesktopMenu";

function Navbar() {
  const { data: session } = useSession();
  const isMobile = useAppSelector((state) => state.app.isMobile);
  const isScrolled = useAppSelector((state) => state.app.isScrolled);
  const [active, setActive] = useState<boolean>(false);
  
  return (
    <div
      className={className(styles.navbar, {
        [styles.scrolled]: isScrolled || active,
      })}>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            priority
            src={AppConfig.siteLogo}
            alt={AppConfig.siteName + " Logo"}
            quality={100}
            width={50}
            height={50}
          />
          {AppConfig.siteName}
        </Link>
      </div>

      {!isMobile ? (
        <DesktopMenu session={session} />
      ) : (
        <MobileMenu active={active} setActive={setActive} />
      )}
    </div>
  );
}

export default Navbar;
