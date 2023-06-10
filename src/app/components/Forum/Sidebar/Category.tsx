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
import clsx from "clsx";

type Props = {
  category: Category;
  channelID: number;
};

function Category({ category, channelID }: Props) {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(
    category.channels.some((channel) => channel.id === channelID)
  );

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
              <Link
                key={channel.id}
                href={`/forum/${channel.id}`}
                shallow
                onClick={() => {
                  dispatch(setChannelName(channel.name));
                  dispatch(setChannelDescription(null));
                }}>
                <li
                  className={clsx(
                    channelID === channel.id && styles.selectedChannel
                  )}>
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
