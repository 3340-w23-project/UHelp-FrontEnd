"use client";
import React from "react";
import styles from "@/app/styles/Forum.module.scss";
import Link from "next/link";
import Image from "next/image";
import CategoryComponent from "./Category";
import useSWR from "swr";
import { AppConfig } from "@/utils/AppConfig";
import { usePathname } from "next/navigation";
import { Category } from "@/utils/Types";
import { useAppSelector } from "@/redux/store";
import { useSession } from "next-auth/react";

function Sidebar() {
  const { data: session } = useSession();
  const channelID = usePathname()?.split("/")[2];
  const isMobile = useAppSelector((state) => state.app.isMobile);
  const authHeader = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + session?.user?.access_token,
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
    "/uapi/categories",
    categoriesFetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  return isMobile ? null : (
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
              channelID={parseInt(channelID!.toString())}
            />
          ))}
      </div>
    </div>
  );
}

export default React.memo(Sidebar);
