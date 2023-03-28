import React from "react";
import styles from "@/styles/Forum.module.scss";
import Link from "next/link";
import { AppConfig } from "@/utils/AppConfig";
import Image from "next/image";

function Sidebar() {
  const categories = [
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
    "Category 5",
  ];

  const classes = ["Class 1", "Class 2", "Class 3", "Class 4"];

  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.sidebarHeader}>
        <Link href="/">
          <div className={styles.logo}>
            <Image
              priority
              src={AppConfig.siteLogo}
              alt={AppConfig.siteName + " Logo"}
              quality={100}
              width={50}
              height={50}
            />
            <h2>{AppConfig.siteName}</h2>
          </div>
        </Link>
      </div>
      <div className={styles.sidebarContent}>
        {categories.map((category) => (
          <div key={category} className={styles.sidebarItem}>
            <span className={styles.category}>{category}</span>
            <ul>
              {classes.map((classItem) => (
                <li key={classItem} className={styles.classItem}>
                  {classItem}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
