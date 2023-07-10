"use client";
import Modal from "./Modal";
import styles from "@/app/styles/Forum.module.scss";
import Button from "../../Button";
import { useAppSelector } from "@/redux/store";
import {
  setIsOpen,
  setPostContentInput,
  setPostID,
  setPostTitleInput,
} from "@/redux/slices/forumSlice";
import { useDispatch } from "react-redux";
import useSubmitShortcut from "@/hooks/useShortcuts";
import { useEffect, useState } from "react";
import {
  useAddPostMutation,
  useAddReplyMutation,
  useDeleteItemMutation,
  useEditItemMutation,
} from "@/app/api/postsApi";
import { validateInput } from "@/app/(Forum)/forum/[channelID]/helper";

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
  const [lastOpenedModal, setLastOpenedModal] = useState(modalType);
  const [addPost] = useAddPostMutation();
  const [addReply] = useAddReplyMutation();
  const [editItem] = useEditItemMutation();
  const [deleteItem] = useDeleteItemMutation();
  const channelID = String(useAppSelector((state) => state.channel.channelID));

  useEffect(() => {
    if (
      lastOpenedModal !== modalType &&
      modalType !== "Edit" &&
      modalType !== "Delete"
    ) {
      dispatch(setPostTitleInput(""));
      dispatch(setPostContentInput(""));
    }
    if (modalType !== "Delete") setLastOpenedModal(modalType);
  }, [modalType]);

  const handleSubmit = () => {
    const isReply = actionType === "reply";
    switch (modalType) {
      case "Post":
        if (validateInput(false))
          addPost({
            channelID: channelID,
            title: postTitleInput,
            content: postContentInput,
          });
        dispatch(setIsOpen(false));
        dispatch(setPostTitleInput(""));
        dispatch(setPostContentInput(""));
        break;
      case "Reply":
        if (validateInput(true))
          addReply({
            postID: postID,
            parentID: replyID,
            content: postContentInput,
          });
        dispatch(setIsOpen(false));
        dispatch(setPostContentInput(""));
        break;
      case "Edit":
        if (validateInput(isReply)) {
          editItem({
            id: isReply ? replyID! : postID,
            isReply: isReply,
            title: postTitleInput,
            content: postContentInput,
          });
        }
        dispatch(setIsOpen(false));
        dispatch(setPostID(0));
        dispatch(setPostTitleInput(""));
        dispatch(setPostContentInput(""));
        if (isReply) {
          dispatch(setPostContentInput(""));
        }
        break;
      case "Delete":
        deleteItem({
          id: isReply ? replyID! : postID,
          parentID: isReply ? postID : undefined,
          isReply: isReply,
        });
        dispatch(setIsOpen(false));
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
      className={modalType === "Delete" ? styles.small : ""}>
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
