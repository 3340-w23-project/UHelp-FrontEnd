import styles from "@/styles/Navbar.module.scss";
import Link from "next/link";
import { Button } from "../Button";
import { MenuItem } from "./MenuItem";
import { AppConfig } from "@/utils/AppConfig";
import className from "classnames";
import Image from "next/image";

import { GiHamburgerMenu } from "react-icons/gi";

type NavbarProps = {
  isScrolled: boolean;
  isMobile: boolean;
};

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Sign In", href: "/signin" },
  { label: "Sign Up", href: "/signup", button: true },
];

const Navbar = ({ isScrolled, isMobile }: NavbarProps) => (
  <div className={className(styles.navbar, { [styles.scrolled]: isScrolled })}>
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
          {menuItems.map((item) =>
            item.button ? (
              <li key={item.label}>
                <Button sm secondary href={item.href} label={item.label} />
              </li>
            ) : (
              <MenuItem key={item.label} {...item} />
            )
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

export { Navbar };
