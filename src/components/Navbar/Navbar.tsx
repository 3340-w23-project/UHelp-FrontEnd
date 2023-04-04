import styles from "@/styles/Navbar.module.scss";
import Link from "next/link";
import { Button } from "../Button";
import { MenuItem } from "./MenuItem";
import { AppConfig } from "@/utils/AppConfig";
import className from "classnames";
import Image from "next/image";
import { useState } from "react";
import Account from "./Account";
import { GiHamburgerMenu } from "react-icons/gi";

type NavbarProps = {
  isScrolled: boolean;
  isMobile: boolean;
  isSignedIn: boolean;
  username: string;
  displayName: string;
};

function Navbar({
  isScrolled,
  isMobile,
  isSignedIn,
  username,
  displayName,
}: NavbarProps) {
  return (
    <div
      className={className(styles.navbar, { [styles.scrolled]: isScrolled })}>
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
        <nav className={styles.menu}>
          <ul>
            <MenuItem label="Home" href="/" />
            {isSignedIn ? (
              <>
                <MenuItem href="/forum/1" label="Forum" />
                <Account displayName={displayName} />
              </>
            ) : (
              <>
                <MenuItem label="Sign In" href="/signin" />
                <li>
                  <Button sm secondary href="/signup" label="Sign Up" />
                </li>
              </>
            )}
          </ul>
        </nav>
      ) : (
        <div className={styles.menu}>
          <GiHamburgerMenu className={styles.mobileMenuButtton} />
        </div>
      )}
    </div>
  );
}

export { Navbar };
