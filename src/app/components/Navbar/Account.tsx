"use client";
import React, { useState } from "react";
import styles from "@/app/styles/Account.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { FaUserAlt, FaChevronDown } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { menuAnimation } from "@/utils/Animations";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

let Account = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const displayName = session?.user?.display_name;

  return (
    <div className={styles.container}>
      <div
        className={`${styles.account} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen(!isOpen)}>
        <FaUserAlt className={styles.userIcon} />
        <div>{displayName}</div>
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
            <Link className={styles.item} href="/">
              <FaHome />
              {"Home"}
            </Link>
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
