import React, { useState } from "react";
import Link from "next/link";
import styles from "@/styles/Forum.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { setChannelName } from "@/redux/slices/channelSlice";
import { useAppDispatch } from "@/redux/store";
import { FaChevronDown } from "react-icons/fa";
import { Category } from "@/utils/Types";
import { categoryAnimation } from "@/utils/Animations";

type Props = {
  category: Category;
  channelID: string;
};

function Category({ category, channelID }: Props) {
  const dispatch = useAppDispatch();
  const [showChannels, setShowChannels] = useState(true);

  return (
    <div className={styles.sidebarCategory}>
      <span
        className={styles.category}
        onClick={() => setShowChannels(!showChannels)}>
        {category.name}
        <FaChevronDown
          className={`${styles.arrow} ${showChannels ? styles.openArrow : ""}`}
        />
      </span>
      <AnimatePresence mode="wait" initial={false}>
        {showChannels && (
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
                }}>
                <li
                  className={
                    parseInt(channelID) === channel.id
                      ? styles.selectedChannel
                      : ""
                  }>
                  {channel.name}
                  {parseInt(channelID) === channel.id && (
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
