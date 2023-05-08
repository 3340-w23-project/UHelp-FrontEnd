import React from "react";
import styles from "@/app/styles/Forum.module.scss";
import Link from "next/link";
import Image from "next/image";
import CategoryComponent from "./Category";
import useSWR from "swr";
import Cookies from "universal-cookie";
import { AppConfig } from "@/utils/AppConfig";
import { useSearchParams } from "next/navigation";
import { Category } from "@/utils/Types";

function Sidebar() {
  const cookies = new Cookies();
  const channelID = useSearchParams();
  const authHeader = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + cookies.get("access_token"),
  };
  const categoriesFetcher = async (url: string): Promise<Category[]> =>
    fetch(url, {
      method: "GET",
      headers: authHeader,
    })
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
              channelID={parseInt(channelID.toString())}
            />
          ))}
      </div>
    </div>
  );
}

export default React.memo(Sidebar);
