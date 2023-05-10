"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "@/app/styles/Forum.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch } from "@/redux/store";
import { FaChevronDown } from "react-icons/fa";
import { Category } from "@/utils/Types";
import { categoryAnimation } from "@/utils/Animations";
import {
  setChannelName,
  setChannelDescription,
} from "@/redux/slices/channelSlice";
import { setActiveCategory } from "@/redux/slices/forumSlice";

type Props = {
  category: Category;
  channelID: number;
  openCategory: number;
};

function Category({ category, channelID, openCategory }: Props) {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.sidebarCategory}>
      <span
        className={styles.category}
        onClick={() => dispatch(setActiveCategory(category.id))}>
        {category.name}
        <FaChevronDown
          className={`${styles.arrow} ${
            category.id === openCategory ? styles.openArrow : ""
          }`}
        />
      </span>
      <AnimatePresence mode="wait" initial={false}>
        {category.id === openCategory && (
          <motion.ul
            variants={categoryAnimation}
            initial="initial"
            animate="visible"
            exit="exit">
            {category.channels.map((channel) => (
              <Link
                key={channel.id}
                href={`/forum/${channel.id}`}
                onClick={() => {
                  dispatch(setChannelName(channel.name));
                  dispatch(setChannelDescription(null));
                }}>
                <li
                  className={
                    channelID === channel.id ? styles.selectedChannel : ""
                  }>
                  {channel.name}
                  {channelID === channel.id && (
                    <motion.div
                      className={styles.selected}
                      layoutId="selected"
                    />
                  )}
                </li>
              </Link>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Category;
