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

function Sidebar() {
  const params = useParams();
  const channelID = params?.channelID;
  const isMobile = useAppSelector((state) => state.app.isMobile);
  const { data: categories } = useSWRImmutable<Category[]>(
    "/uhelp-api/categories",
    categoriesFetcher
  );

  const activeCategory = useAppSelector(
    (state) => state.forum.activeCategory
  ) as number;

  const [openCategory, setOpenCategory] =
    React.useState<number>(activeCategory);

  React.useEffect(() => {
    setOpenCategory(activeCategory);
  }, [activeCategory]);

  return isMobile ? null : (
    <div className={styles.sidebarWrapper}>
      <Logo />
      <div className={styles.sidebarContent}>
        {categories &&
          categories.map((category) => (
            <CategoryComponent
              key={category.id}
              category={category}
              channelID={parseInt(channelID!.toString())}
              openCategory={openCategory}
            />
          ))}
      </div>
    </div>
  );
}

export default Sidebar;
