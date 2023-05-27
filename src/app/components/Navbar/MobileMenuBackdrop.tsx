"use client";
import { motion } from "framer-motion";
import { fadeTransition } from "@/utils/Animations";
import styles from "@/app/styles/Navbar.module.scss";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

const MobileMenuBackdrop = ({ children, onClick }: Props) => {
  return (
    <motion.div
      onClick={onClick}
      className={styles.backdrop}
      variants={fadeTransition}
      initial="hidden"
      animate="visible"
      exit="exit">
      {children}
    </motion.div>
  );
};

export default MobileMenuBackdrop;
