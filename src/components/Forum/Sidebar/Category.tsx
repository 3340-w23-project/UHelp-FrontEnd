"use client";
import React, { useState } from "react";
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
import clsx from "clsx";
import { useRouter } from "next/navigation";

type Props = {
  category: Category;
  channelID: number;
};

function Category({ category, channelID }: Props) {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(
    category.channels.some((channel) => channel.id === channelID)
  );
  const router = useRouter();

  return (
    <div className={styles.sidebarCategory}>
      <span className={styles.category} onClick={() => setIsOpen(!isOpen)}>
        {category.name}
        <FaChevronDown
          className={clsx(styles.arrow, isOpen && styles.openArrow)}
        />
      </span>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.ul
            key={category.name}
            variants={categoryAnimation}
            initial="initial"
            animate="visible"
            exit="exit">
            {category.channels.map((channel) => (
              <li
                key={channel.name}
                className={clsx(
                  channelID === channel.id && styles.selectedChannel
                )}
                onClick={() => {
                  dispatch(setChannelName(channel.name));
                  router.replace(`/forum/${channel.id}`);
                  window.scrollTo(0, 0);
                }}>
                {channel.name}
                {channelID === channel.id && (
                  <motion.div className={styles.selected} layoutId="selected" />
                )}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Category;
