import styles from "@/styles/Navbar.module.scss";
import Link from "next/link";
import { Button } from "../Button";
import { MenuItem } from "./MenuItem";
import { AppConfig } from "@/utils/AppConfig";
import className from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";

import { GiHamburgerMenu } from "react-icons/gi";

type NavbarProps = {
  isScrolled: boolean;
  isMobile: boolean;
};

function Navbar({ isScrolled, isMobile }: NavbarProps) {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState("");
  const cookies = new Cookies();
  const signOut = () => {
    cookies.remove("access_token");
    fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.href = "/";
  };

  useEffect(() => {
    if (cookies.get("access_token")) {
      setIsLogged(true);
      const decoded: any = jwt(cookies.get("access_token"));
      setUser(decoded.sub);
    } else {
      setIsLogged(false);
    }
  }, [cookies]);

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
            {isLogged ? (
              <>
                <MenuItem label="Home" href="/" />
                <MenuItem href="/forum/1" label="Forum" />
                <span className={styles.user}>{user}</span>
                <Button
                  sm
                  secondary
                  href="/signout"
                  label="Sign Out"
                  onClick={signOut}
                />
              </>
            ) : (
              <>
                <MenuItem label="Home" href="/" />
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
