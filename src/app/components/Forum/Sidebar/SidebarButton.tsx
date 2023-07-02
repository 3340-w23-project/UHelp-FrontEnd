import React from "react";
import styles from "@/app/styles/Forum.module.scss";
import { setIsMenuOpen } from "@/redux/slices/forumSlice";
import { useAppSelector } from "@/redux/store";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch } from "react-redux";

function SidebarButton() {
  const dispatch = useDispatch();
  const isOpen = useAppSelector((state) => state.forum.isMenuOpen);
  return (
    <span
      className={styles.sidebarButton}
      onClick={() => {
        dispatch(setIsMenuOpen(!isOpen));
      }}>
      <GiHamburgerMenu />
    </span>
  );
}

export default SidebarButton;
