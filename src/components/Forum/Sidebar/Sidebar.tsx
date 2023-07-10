"use client";
import React, { useLayoutEffect } from "react";
import styles from "@/app/styles/Forum.module.scss";
import CategoryComponent from "./Category";
import { Category } from "@/utils/Types";
import { useAppSelector } from "@/redux/store";
import Logo from "./Logo";
import { useParams } from "next/navigation";
import SidebarButton from "./SidebarButton";
import { setIsMenuOpen } from "@/redux/slices/forumSlice";
import { useDispatch } from "react-redux";

interface SidebarProps {
  categories: Category[];
}

function Sidebar({ categories }: SidebarProps) {
  const dispatch = useDispatch();
  const params = useParams();
  const channelID = params?.channelID;
  const isMobile = useAppSelector((state) => state.app.isMobile);
  const isSidebarOpen = useAppSelector((state) => state.forum.isMenuOpen);
  useLayoutEffect(() => {
    if (!isMobile) dispatch(setIsMenuOpen(true));
    else dispatch(setIsMenuOpen(false));
  }, [isMobile]);

  return (
    <>
      {isSidebarOpen && (
        <aside className={styles.sidebarWrapper}>
          <div className={styles.sidebarHeader}>
            <SidebarButton />
            <Logo />
          </div>
          <div className={styles.sidebarContent}>
            {categories?.map((category) => (
              <CategoryComponent
                key={category.name}
                category={category}
                channelID={parseInt(channelID!.toString())}
              />
            ))}
          </div>
        </aside>
      )}
    </>
  );
}

export default Sidebar;
