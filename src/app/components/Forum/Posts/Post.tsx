"use client";
import React from "react";
import styles from "@/app/styles/Forum.module.scss";
import { formatTime, like } from "../../../(Forum)/forum/[channelID]/helper";
import {
  setIsReplyModalOpen,
  setIsEditModalOpen,
  setIsDeleteModalOpen,
  setPostID,
  setReplyID,
  setAction,
  setPostTitleInput,
  setPostContentInput,
} from "@/redux/slices/forumSlice";

import { IoTrash } from "react-icons/io5";
import { AiFillLike } from "react-icons/ai";
import { MdReply, MdModeEdit } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Button from "@/app/components/Button";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

interface Props {
  isReply: boolean;
  post: any;
  postID: number;
  like: (id: number, isReply: boolean, depth: number) => void;
}

function Post({ isReply, post, postID, like }: Props) {
  const { data: session } = useSession();
  const username = session?.user?.username;
  const dispatch = useDispatch();

  return (
    <div
      key={post.id}
      className={styles.post}
      style={
        isReply
          ? {
              marginLeft: (post.depth + 1) * 20,
              width: `calc(100% - ${(post.depth + 1) * 20}px)`,
            }
          : {}
      }>
      <div className={styles.postHeader}>
        <div className={styles.postHeaderLeft}>
          {!isReply && <span className={styles.postTitle}>{post.title}</span>}
          <div>
            <span className={styles.postAuthor}>
              <FaUserAlt className={styles.userIcon} />
              {post.author.display_name}
            </span>
            <span className={styles.postDetails}>
              {` \u2022 ${formatTime(post.date)}${
                post.edited ? " \u2022 (edited)" : ""
              }`}
            </span>
          </div>
        </div>
        <div className={styles.postHeaderRight}>
          {post.author.username === username && (
            <>
              <Button
                tertiary
                icon={IoTrash}
                onClick={() => {
                  if (isReply) dispatch(setReplyID(post.id));
                  else dispatch(setPostID(post.id));
                  dispatch(setAction(isReply ? "reply" : "post"));
                  dispatch(setIsDeleteModalOpen(true));
                }}
              />
              <Button
                tertiary
                icon={MdModeEdit}
                onClick={() => {
                  if (isReply) {
                    dispatch(setPostID(postID));
                    dispatch(setReplyID(post.id));
                  } else {
                    dispatch(setPostID(post.id));
                    dispatch(setPostTitleInput(post.title));
                  }
                  dispatch(setAction(isReply ? "reply" : "post"));
                  dispatch(setPostContentInput(post.content));
                  dispatch(setIsEditModalOpen(true));
                }}
              />
            </>
          )}
          <Button
            tertiary
            icon={MdReply}
            onClick={() => {
              if (isReply) {
                dispatch(setPostID(postID));
                dispatch(setReplyID(post.id));
              } else {
                dispatch(setPostID(post.id));
                dispatch(setReplyID(null));
              }
              dispatch(setIsReplyModalOpen(true));
            }}
          />
        </div>
      </div>
      <div className={styles.postContent}>{post.content}</div>
      <div className={styles.postFooter}>
        <motion.span
          whileTap={{
            scale: [null, 1.1],
            y: [null, -2],
          }}
          className={`${styles.postLikes}${
            post.liked ? " " + styles.liked : ""
          }`}
          onClick={() => {
            like(isReply ? post.id : postID, isReply, isReply ? post.depth : 0);
          }}>
          {post.likes} <AiFillLike className={styles.likeIcon} />
        </motion.span>
      </div>
    </div>
  );
}

export default Post;
