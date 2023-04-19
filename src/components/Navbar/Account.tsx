import React, { useState } from "react";
import styles from "@/styles/Account.module.scss";
import Cookies from "universal-cookie";
import { AnimatePresence, motion } from "framer-motion";
import { FaUserAlt, FaChevronDown } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { useRouter } from "next/router";
import { useAppSelector } from "@/redux/store";

function Account() {
  const cookies = new Cookies();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const displayName = useAppSelector((state) => state.user.displayName);

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
    cookies.remove("access_token", { path: "/" });
    cookies.remove("access_token", { path: "/forum" });
    fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    router.push("/");
  };

  return (
    <>
      <div className={styles.account} onClick={() => setIsOpen(!isOpen)}>
        <FaUserAlt className={styles.userIcon} />
        <div>{displayName}</div>
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
              onMouseLeave={() => setIsOpen(false)}
              onClick={() => signOut()}>
              <div className={styles.signOutItem}>
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
