import React, { useState } from "react";
import styles from "@/styles/Account.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { FaUserAlt, FaChevronDown } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import Cookies from "universal-cookie";

type Props = {
  username: string;
  children?: React.ReactNode;
};

function Account({ username }: Props) {
  const cookies = new Cookies();
  const [isOpen, setIsOpen] = useState(false);

  const menuAnimation = {
    enter: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.1,
        ease: "easeOut",
      },
    },
    exit: {
      y: -5,
      opacity: 0,
      transition: {
        duration: 0.1,
        ease: "easeIn",
      },
    },
  };

  const signOut = () => {
    console.log("signing out");
    cookies.remove("access_token", { path: "/" });
    fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.href = "/";
  };

  return (
    <>
      <div className={styles.account} onClick={() => setIsOpen(!isOpen)}>
        <FaUserAlt className={styles.userIcon} />
        <div>{username}</div>
        <FaChevronDown
          className={`${styles.arrow} ${isOpen ? styles.openArrow : ""}`}
        />
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={styles.signOutContainer}
              initial={"exit"}
              animate={"enter"}
              exit={"exit"}
              variants={menuAnimation}
              onMouseLeave={() => setIsOpen(false)}>
              <div className={styles.signOutItem} onClick={() => signOut()}>
                <IoMdExit />
                {"Logout"}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default Account;
