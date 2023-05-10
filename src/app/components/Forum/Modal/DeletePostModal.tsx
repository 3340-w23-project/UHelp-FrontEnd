"use client";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import styles from "@/app/styles/Forum.module.scss";
import { setIsDeleteModalOpen } from "@/redux/slices/forumSlice";
import Button from "../../Button";
import { useAppSelector } from "@/redux/store";

type Props = {
  onSubmit: () => void;
};

const DeletePostModal = ({ onSubmit }: Props) => {
  const dispatch = useDispatch();
  const isDeleteModalOpen = useAppSelector(
    (state) => state.forum.isDeleteModalOpen
  );
  const actionType = useAppSelector((state) => state.forum.action);

  return (
    <Modal
      status={isDeleteModalOpen}
      handleClose={() => dispatch(setIsDeleteModalOpen(false))}
      title={`Delete ${actionType === "post" ? "Post" : "Reply"}`}>
      <div className={styles.modalBodyWrapper}>
        <div className={styles.modalBody}>
          <div className="centerRow">
            <p>{`Are you sure you want to permanently delete this ${
              actionType === "post" ? "post" : "reply"
            }?`}</p>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <Button
            secondary
            sm
            onClick={onSubmit}
            label={`Delete ${actionType === "post" ? "Post" : "Reply"}`}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeletePostModal;
