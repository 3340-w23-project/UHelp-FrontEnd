"use client";
import styles from "@/app/styles/Forum.module.scss";
import { motion } from "framer-motion";
import { RemoveScrollBar } from "react-remove-scroll-bar";
import { fadeTransition } from "@/utils/Animations";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

const ModalBackdrop = ({ children, onClick }: Props) => {
  return (
    <motion.div
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClick();
        }
      }}
      className={styles.backdrop}
      variants={fadeTransition}
      initial="hidden"
      animate="visible"
      exit="exit">
      <RemoveScrollBar />
      {children}
    </motion.div>
  );
};

export default ModalBackdrop;
