"use client";
import ModalBackdrop from "@/components/Forum/Modal/ModalBackdrop";
import styles from "@/app/styles/Forum.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { BsXLg } from "react-icons/bs";
import clsx from "clsx";

const modalTransition = {
  hidden: {
    y: "20px",
    opacity: 0,
  },
  visible: {
    y: "0px",
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
  exit: {
    y: "20px",
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
};

type Props = {
  status: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
  title: string;
  className?: string;
};

const Modal = ({ status, handleClose, children, title, className }: Props) => {
  return (
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
      {status && (
        <ModalBackdrop onClick={handleClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className={clsx(styles.modal, className)}
            variants={modalTransition}
            initial="hidden"
            animate="visible"
            exit="exit">
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>{title}</div>
              <BsXLg className={styles.closeButton} onClick={handleClose} />
            </div>
            {children}
          </motion.div>
        </ModalBackdrop>
      )}
    </AnimatePresence>
  );
};

export default Modal;
