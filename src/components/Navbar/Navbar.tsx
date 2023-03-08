import styles from "@/styles/Navbar.module.scss";
import Link from "next/link";
import { Button } from "../Button";
import { MenuItem } from "./MenuItem";
import { AppConfig } from "@/utils/AppConfig";
import className from "classnames";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Sign In", href: "/signin" },
  { label: "Sign Up", href: "/signup", button: true },
];

type NavbarProps = {
  isScrolled: boolean;
};

const Navbar = ({ isScrolled }: NavbarProps) => (
  <div className={className(styles.navbar, { [styles.scrolled]: isScrolled })}>
    <div className={styles.logo}>
      <Link href="/">
        <img src={AppConfig.siteLogo} alt="UHelp" width={50} height={50} />
        {AppConfig.siteName}
      </Link>
    </div>

    <nav className={styles.menu}>
      <ul>
        {menuItems.map((item) =>
          item.button ? (
            <li key={item.label}>
              <Button sm secondary href={item.href}>
                {item.label}
              </Button>
            </li>
          ) : (
            <MenuItem key={item.label} {...item} />
          )
        )}
      </ul>
    </nav>
  </div>
);

export { Navbar };
