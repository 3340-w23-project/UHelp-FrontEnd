"use client";
import Modal from "./Modal";
import styles from "@/app/styles/Forum.module.scss";
import Button from "../../Button";
import { useAppSelector } from "@/redux/store";
import {
  addPost,
  addReply,
  deletePost,
  deleteReply,
  editPost,
  editReply,
} from "@/app/(Forum)/forum/[channelID]/helper";
import {
  setIsOpen,
  setPostContentInput,
  setPostTitleInput,
} from "@/redux/slices/forumSlice";
import { useDispatch } from "react-redux";
import useSubmitShortcut from "@/hooks/useShortcuts";

const ForumModal = () => {
  const dispatch = useDispatch();
  const isOpen = useAppSelector((state) => state.forum.isOpen);
  const error = useAppSelector((state) => state.forum.error);
  const modalType = useAppSelector((state) => state.forum.modalType);
  const postID = useAppSelector((state) => state.forum.postID);
  const replyID = useAppSelector((state) => state.forum.replyID);
  const actionType = useAppSelector((state) => state.forum.action);
  const postTitleInput = useAppSelector((state) => state.forum.postTitleInput);
  const postContentInput = useAppSelector(
    (state) => state.forum.postContentInput
  );

  const handleSubmit = () => {
    switch (modalType) {
      case "Post":
        addPost();
        break;
      case "Reply":
        addReply(postID, replyID);
        break;
      case "Edit":
        if (actionType === "post") editPost(postID);
        if (actionType === "reply") editReply(replyID);
        break;
      case "Delete":
        if (actionType === "post") deletePost(postID);
        else if (actionType === "reply") deleteReply(replyID);
        break;
      default:
        break;
    }
  };

  const title = () => {
    switch (modalType) {
      case "Post":
        return "New Post";
      case "Reply":
        return "New Reply";
      case "Edit":
        return `Edit ${actionType}`;
      case "Delete":
        return `Delete ${actionType}`;
      default:
        return "";
    }
  };

  const buttonText = () => {
    switch (modalType) {
      case "Post":
        return "Add Post";
      case "Reply":
        return "Reply";
      case "Edit":
        return "Update";
      case "Delete":
        return "Confirm";
      default:
        return "";
    }
  };

  useSubmitShortcut(handleSubmit, isOpen);
  return (
    <Modal
      status={isOpen}
      handleClose={() => dispatch(setIsOpen(false))}
      title={title()}
      width={"30%"}>
      <div className={styles.modalBodyWrapper}>
        <div className={styles.modalBody}>
          <div className={styles.modalForm}>
            {modalType === "Post" && (
              <>
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
              </>
            )}
            {modalType === "Reply" && (
              <>
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
              </>
            )}
            {modalType === "Edit" && (
              <>
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
              </>
            )}
          </div>
          {modalType === "Delete" && (
            <p>{`Are you sure you want to permanently delete this ${
              actionType === "post" ? "post" : "reply"
            }?`}</p>
          )}
          <div className="centerRow">
            {error && <p className={styles.error}>{error}</p>}
          </div>
        </div>
        <div className={styles.modalFooter}>
          <Button
            secondary
            sm
            onClick={handleSubmit}
            label={buttonText()}></Button>
        </div>
      </div>
    </Modal>
  );
};

export default ForumModal;
