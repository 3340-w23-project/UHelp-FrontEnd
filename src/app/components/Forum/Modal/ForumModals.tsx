"use client";
import React from "react";
import AddPostModal from "./AddPostModal";
import EditPostModal from "./EditPostModal";
import DeletePostModal from "./DeletePostModal";
import AddReplyModal from "./AddReplyModal";
import {
  addPost,
  addReply,
  deletePost,
  deleteReply,
  editPost,
  editReply,
} from "@/app/(Forum)/forum/[channelID]/helper";
import { useAppSelector } from "@/redux/store";
import { usePathname } from "next/navigation";

function ForumModals({ fetchPosts }: { fetchPosts: () => void }) {
  const postID = useAppSelector((state) => state.forum.postID);
  const replyID = useAppSelector((state) => state.forum.replyID);
  const actionType = useAppSelector((state) => state.forum.action);
  const channelID = usePathname()?.split("/")[2];

  return (
    <>
      <AddPostModal onSubmit={() => addPost(channelID as string, fetchPosts)} />
      <EditPostModal
        onSubmit={() => {
          if (actionType === "post") {
            editPost(postID, fetchPosts);
          } else if (actionType === "reply") {
            editReply(replyID, fetchPosts);
          }
        }}
      />
      <DeletePostModal
        onSubmit={() => {
          if (actionType === "post") {
            deletePost(postID, fetchPosts);
          } else if (actionType === "reply") {
            deleteReply(replyID, fetchPosts);
          }
        }}
      />
      <AddReplyModal
        onSubmit={() => {
          addReply(postID, replyID, fetchPosts);
        }}
      />
    </>
  );
}

export default ForumModals;
