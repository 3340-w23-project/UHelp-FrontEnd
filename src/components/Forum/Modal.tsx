import { AnimatePresence, motion } from "framer-motion";
import ModalBackdrop from "@/components/Forum/ModalBackdrop";
import styles from "@/styles/Forum.module.scss";
import { BsXLg } from "react-icons/bs";

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

interface Props {
  status: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
  title: string;
}

const Modal = ({ status, handleClose, children, title }: Props) => {
  return (
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
      {status && (
        <ModalBackdrop onClick={handleClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className={styles.modal}
            variants={modalTransition}
            initial="hidden"
            animate="visible"
            exit="exit">
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>{title}</div>
              <BsXLg className={styles.closeButton} onClick={handleClose} />
            </div>
            <div className={styles.modalBody}>{children}</div>
          </motion.div>
        </ModalBackdrop>
      )}
    </AnimatePresence>
  );
};

export default Modal;
