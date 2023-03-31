import React, { useEffect, useState } from "react";
import styles from "@/styles/Forum.module.scss";
import Link from "next/link";
import { AppConfig } from "@/utils/AppConfig";
import Image from "next/image";

type Category = {
  id: number;
  name: string;
  channels: Channel[];
};

type Channel = {
  id: number;
  name: string;
};

function Sidebar() {
  const [categories, setCategories] = useState([] as Category[]);

  const fetchCategories = async () => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
          <div key={category.id} className={styles.sidebarItem}>
            <span className={styles.category}>{category.name}</span>
            <ul>
              {category.channels.map((channel) => (
                <Link href={`/forum/${channel.id}`}>
                  <li key={channel.id} className={styles.classItem}>
                    {channel.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
