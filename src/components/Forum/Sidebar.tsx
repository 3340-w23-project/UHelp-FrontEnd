import React, { useEffect, useState } from "react";
import styles from "@/styles/Forum.module.scss";
import Link from "next/link";
import Image from "next/image";
import { AppConfig } from "@/utils/AppConfig";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const { channelID } = router.query;
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
          <div key={category.id} className={styles.sidebarCategory}>
            <span className={styles.category}>{category.name}</span>
            <ul>
              {category.channels.map((channel) => (
                <Link key={channel.id} href={`/forum/${channel.id}`}>
                  <li
                    className={
                      parseInt(channelID as string) === channel.id
                        ? styles.selectedChannel
                        : ""
                    }>
                    {channel.name}
                    {parseInt(channelID as string) === channel.id && (
                      <motion.div
                        className={styles.selected}
                        layoutId="selected"
                      />
                    )}
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
