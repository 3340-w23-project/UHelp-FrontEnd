import React, { useState } from "react";
import styles from "@/styles/Account.module.scss";
import Cookies from "universal-cookie";
import { AnimatePresence, motion } from "framer-motion";
import { FaUserAlt, FaChevronDown } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { setIsAuth } from "@/redux/slices/userSlice";
import { menuAnimation } from "@/utils/Animations";

function Account() {
  const cookies = new Cookies();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const displayName = useAppSelector((state) => state.user.displayName);

  const signOut = () => {
    cookies.remove("access_token", { path: "/" });
    cookies.remove("access_token", { path: "/forum" });
    fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(setIsAuth(false));
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
