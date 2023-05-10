"use client";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import styles from "@/app/styles/Forum.module.scss";
import {
  setIsReplyModalOpen,
  setPostContentInput,
} from "@/redux/slices/forumSlice";
import Button from "../../Button";
import { useAppSelector } from "@/redux/store";

type Props = {
  onSubmit: () => void;
};

const AddReplyModal = ({ onSubmit }: Props) => {
  const dispatch = useDispatch();
  const isReplyModalOpen = useAppSelector(
    (state) => state.forum.isReplyModalOpen
  );
  const postContentInput = useAppSelector(
    (state) => state.forum.postContentInput
  );
  const error = useAppSelector((state) => state.forum.error);
  return (
    <Modal
      status={isReplyModalOpen}
      handleClose={() => {
        dispatch(setIsReplyModalOpen(false));
      }}
      title={"Reply"}
      width={"30%"}>
      <div className={styles.modalBodyWrapper}>
        <div className={styles.modalBody}>
          <div className={styles.modalForm}>
            <label className={styles.modalLabel}>
              Reply Content
              <textarea
                value={postContentInput}
                autoFocus
                onChange={(e) => {
                  dispatch(setPostContentInput(e.target.value));
                }}
              />
            </label>
          </div>
          <div className="centerRow">
            {error && <p className={styles.error}>{error}</p>}
          </div>
        </div>
        <div className={styles.modalFooter}>
          <Button secondary sm onClick={onSubmit} label={"Add Reply"}></Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddReplyModal;
