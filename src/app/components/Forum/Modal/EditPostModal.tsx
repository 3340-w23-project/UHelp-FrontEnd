"use client";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import styles from "@/app/styles/Forum.module.scss";
import {
  setIsEditModalOpen,
  setPostContentInput,
  setPostID,
  setPostTitleInput,
} from "@/redux/slices/forumSlice";
import Button from "../../Button";
import { useAppSelector } from "@/redux/store";

type Props = {
  onSubmit: () => void;
};

const EditPostModal = ({ onSubmit }: Props) => {
  const dispatch = useDispatch();
  const isEditModalOpen = useAppSelector(
    (state) => state.forum.isEditModalOpen
  );
  const actionType = useAppSelector((state) => state.forum.action);
  const postTitleInput = useAppSelector((state) => state.forum.postTitleInput);
  const postContentInput = useAppSelector(
    (state) => state.forum.postContentInput
  );
  const error = useAppSelector((state) => state.forum.error);

  return (
    <Modal
      status={isEditModalOpen}
      handleClose={() => {
        dispatch(setIsEditModalOpen(false));
        dispatch(setPostID(0));
        dispatch(setPostTitleInput(""));
        dispatch(setPostContentInput(""));
      }}
      title={`Edit ${actionType === "post" ? "Post" : "Reply"}`}
      width={"30%"}>
      <div className={styles.modalBodyWrapper}>
        <div className={styles.modalBody}>
          <div className={styles.modalForm}>
            {actionType === "post" && (
              <label className={styles.modalLabel}>
                Post Title
                <input
                  type="text"
                  value={postTitleInput}
                  onChange={(e) => {
                    dispatch(setPostTitleInput(e.target.value));
                  }}
                />
              </label>
            )}
            <label className={styles.modalLabel}>
              {actionType === "post" ? "Post Content" : "Reply Content"}
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
          <Button
            secondary
            sm
            onClick={onSubmit}
            label={`Update ${actionType === "post" ? "Post" : "Reply"}`}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditPostModal;
