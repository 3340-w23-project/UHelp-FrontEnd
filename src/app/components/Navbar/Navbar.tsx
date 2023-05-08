"use client";
import styles from "@/app/styles/Navbar.module.scss";
import Link from "next/link";
import className from "classnames";
import Image from "next/image";
import Account from "./Account";
import Button from "../Button";
import MobileMenu from "./MobileMenu";
import { useState } from "react";
import { MenuItem } from "./MenuItem";
import { AppConfig } from "@/utils/AppConfig";
import { useAppSelector } from "@/redux/store";

function Navbar() {
  const isAuth = useAppSelector((state) => state.user.isAuth);
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
        <nav className={styles.menu}>
          <ul>
            <MenuItem label="Home" href="/" />
            {isAuth ? (
              <>
                <MenuItem href="/forum/1" label="Forum" />
                <Account />
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
        <MobileMenu active={active} setActive={setActive} />
      )}
    </div>
  );
}

export default Navbar;
