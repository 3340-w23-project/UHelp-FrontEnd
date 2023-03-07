import styles from "@/styles/Navbar.module.scss";
import Link from "next/link";

const MenuItem = ({ label, href }: { label: string; href: string }) => (
  <li className={styles.item}>
    <Link href={href}>{label}</Link>
  </li>
);

export { MenuItem };
