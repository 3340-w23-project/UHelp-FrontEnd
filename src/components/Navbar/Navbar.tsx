import styles from "@/styles/Navbar.module.scss";
import Link from "next/link";
import { MenuItem } from "./MenuItem";

const Navbar = () => (
  <div className={styles.navbar}>
    <div className={styles.logo}>
      <Link href="/">
        <img src="/logo.png" alt="UHelp" width={50} height={50} />
      </Link>
    </div>

    <nav>
      <ul className={styles.menu}>
        <MenuItem label="Home" href="/" />
        <MenuItem label="Sign In" href="/" />
      </ul>
    </nav>
  </div>
);

export { Navbar };
