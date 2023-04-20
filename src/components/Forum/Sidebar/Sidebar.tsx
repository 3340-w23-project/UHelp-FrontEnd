import React from "react";
import styles from "@/styles/Forum.module.scss";
import Link from "next/link";
import Image from "next/image";
import CategoryComponent from "./Category";
import useSWR from "swr";
import { AppConfig } from "@/utils/AppConfig";
import { useRouter } from "next/router";
import { Category } from "@/utils/Types";

function Sidebar() {
  const router = useRouter();
  const { channelID } = router.query;
  const categoriesFetcher = async (url: string): Promise<Category[]> =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        return data.categories;
      });

  const { data: categories } = useSWR<Category[]>(
    "/api/categories",
    categoriesFetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

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
        {categories &&
          categories.map((category) => (
            <CategoryComponent
              key={category.id}
              category={category}
              channelID={parseInt(channelID as string)}
            />
          ))}
      </div>
    </div>
  );
}

export default React.memo(Sidebar);
