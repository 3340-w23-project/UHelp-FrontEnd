"use client";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import styles from "@/app/styles/Forum.module.scss";
import {
  setIsPostModalOpen,
  setPostContentInput,
  setPostTitleInput,
} from "@/redux/slices/forumSlice";
import Button from "../../Button";
import { useAppSelector } from "@/redux/store";

type Props = {
  onSubmit: () => void;
};

const AddPostModal = ({ onSubmit }: Props) => {
  const dispatch = useDispatch();
  const isPostModalOpen = useAppSelector(
    (state) => state.forum.isPostModalOpen
  );
  const postTitleInput = useAppSelector((state) => state.forum.postTitleInput);
  const postContentInput = useAppSelector(
    (state) => state.forum.postContentInput
  );
  const error = useAppSelector((state) => state.forum.error);
  return (
    <Modal
      status={isPostModalOpen}
      handleClose={() => dispatch(setIsPostModalOpen(false))}
      title={"New Post"}
      width={"30%"}>
      <div className={styles.modalBodyWrapper}>
        <div className={styles.modalBody}>
          <div className={styles.modalForm}>
            <label className={styles.modalLabel}>
              Post Title
              <input
                type="text"
                value={postTitleInput}
                autoFocus
                onChange={(e) => {
                  dispatch(setPostTitleInput(e.target.value));
                }}
              />
            </label>
            <label className={styles.modalLabel}>
              Post Content
              <textarea
                value={postContentInput}
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
          <Button secondary sm onClick={onSubmit} label={"Add Post"}></Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddPostModal;
