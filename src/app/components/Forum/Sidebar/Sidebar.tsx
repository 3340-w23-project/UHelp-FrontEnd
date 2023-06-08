"use client";
import React from "react";
import styles from "@/app/styles/Forum.module.scss";
import CategoryComponent from "./Category";
import useSWRImmutable from "swr/immutable";
import { Category } from "@/utils/Types";
import { useAppSelector } from "@/redux/store";
import { categoriesFetcher } from "@/app/(Forum)/forum/[channelID]/helper";
import Logo from "./Logo";
import { useParams } from "next/navigation";
import Skeleton from "../../Skeleton";

function Sidebar() {
  const params = useParams();
  const channelID = params?.channelID;
  const isMobile = useAppSelector((state) => state.app.isMobile);
  const { data: categories, isLoading } = useSWRImmutable<Category[]>(
    "/uhelp-api/categories",
    categoriesFetcher
  );

  return isMobile ? null : (
    <div className={styles.sidebarWrapper}>
      <Logo />
      <div className={styles.sidebarContent}>
        {isLoading
          ? Array.from({ length: 6 }, (_, i) => (
              <Skeleton
                key={i}
                width={"100%"}
                height={"1.8rem"}
                margin={"0.25rem"}
              />
            ))
          : categories?.map((category) => (
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

export default Sidebar;
