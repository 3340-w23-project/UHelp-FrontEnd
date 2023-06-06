"use client";
import React, { useState } from "react";
import styles from "@/app/styles/Account.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { menuAnimation } from "@/utils/Animations";
import { signOut, useSession } from "next-auth/react";
import Avatar from "react-avatar";
import Skeleton from "../Skeleton";
import { avatarColors } from "@/utils/AppConfig";

const Account = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const displayName = session?.user?.display_name;

  return (
    <div className={styles.container}>
      <div
        className={`${styles.account} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen(!isOpen)}>
        <Avatar
          name={displayName}
          round={"0.25rem"}
          textSizeRatio={2}
          size={"32px"}
          color={
            avatarColors[
              displayName
                ? (displayName.charCodeAt(0) +
                    displayName.charCodeAt(displayName.length - 1)) %
                  avatarColors.length
                : 0
            ]
          }
          style={{ border: "none" }}
          className={styles.avatar}
        />
        {displayName ? (
          <span>{displayName}</span>
        ) : (
          <Skeleton width={"5rem"} height={"1.2rem"} />
        )}
        <FaChevronDown
          className={`${styles.arrow} ${isOpen ? styles.openArrow : ""}`}
        />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.dropDownContainer}
            initial={"exit"}
            animate={"enter"}
            exit={"exit"}
            variants={menuAnimation}
            onMouseLeave={() => setIsOpen(false)}>
            <div
              className={`${styles.item} ${styles.logout}`}
              onClick={() => signOut({ callbackUrl: "/signin" })}>
              <IoMdExit />
              {"Logout"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(Account);
