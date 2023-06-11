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
import { GiHamburgerMenu } from "react-icons/gi";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { setIsMenuOpen } from "@/redux/slices/forumSlice";
import { useDispatch } from "react-redux";
import clsx from "clsx";

function Sidebar() {
  const dispatch = useDispatch();
  const params = useParams();
  const channelID = params?.channelID;
  const isMobile = useAppSelector((state) => state.app.isMobile);
  const { data: categories, isLoading } = useSWRImmutable<Category[]>(
    "/uhelp-api/categories",
    categoriesFetcher
  );
  const isOpen = useAppSelector((state) => state.forum.isMenuOpen);

  const SidebarButton: React.FC = () => {
    return (
      <GiHamburgerMenu
        className={clsx(styles.menuIcon, !isOpen && styles.menuIconClosed)}
        onClick={() => {
          dispatch(setIsMenuOpen(!isOpen));
        }}
      />
    );
  };

  return (
    <>
      {isOpen ? (
        <aside className={styles.sidebarWrapper}>
          <div className={styles.sidebarHeader}>
            <SidebarButton />
            <Logo />
          </div>
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
                    key={category.name}
                    category={category}
                    channelID={parseInt(channelID!.toString())}
                  />
                ))}
          </div>
        </aside>
      ) : (
        <SidebarButton />
      )}
    </>
  );
}

export default Sidebar;
