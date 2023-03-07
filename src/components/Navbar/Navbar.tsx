import styles from "@/styles/Navbar.module.scss";
import Link from "next/link";
import { MenuItem } from "./MenuItem";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Sign Up", href: "/signup" },
];

const Navbar = () => (
  <div className={styles.navbar}>
    <div className={styles.logo}>
      <Link href="/">
        <img src="/logo.png" alt="UHelp" width={50} height={50} />
        UHelp
      </Link>
    </div>

    <nav>
      <ul className={styles.menu}>
        {menuItems.map((item) => (
          <MenuItem key={item.label} {...item} />
        ))}
      </ul>
    </nav>
  </div>
);

export { Navbar };
