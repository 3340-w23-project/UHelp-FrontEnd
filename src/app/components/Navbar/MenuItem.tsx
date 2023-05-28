"use client";
import styles from "@/app/styles/Navbar.module.scss";
import Link from "next/link";

interface MenuItemProps {
  label: string;
  href: string;
  className?: string;
}

const MenuItem = ({ label, href, className }: MenuItemProps) => (
  <li className={styles.item}>
    <Link href={href}>
      <span className={className}>{label}</span>
    </Link>
  </li>
);

export { MenuItem };
