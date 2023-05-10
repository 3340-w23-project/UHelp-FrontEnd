"use client";
import { Post, Reply } from "@/utils/Types";
import styles from "@/app/styles/Forum.module.scss";
import React from "react";
import { postAnimation } from "@/utils/Animations";
import PostComponent from "@/app/components/Forum/Posts/Post";
import useSWR from "swr";
import ForumModals from "@/app/components/Forum/Modal/ForumModals";
import LoadingIndicator from "@/app/components/Forum/Posts/LoadingIndicator";
import { like } from "../../../(Forum)/forum/[channelID]/helper";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineSpeakerNotesOff } from "react-icons/md";
interface Props {
  session: any;
  channelID: number;
}

function ForumPosts({ session, channelID }: Props) {
  const apiURL = `/uhelp-api/channel/${channelID}/posts`;
  const authHeader = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + session?.user?.access_token,
  };

  const postsFetcher = async (): Promise<Post[]> => {
    const res = await fetch(apiURL, {
      method: "GET",
      headers: authHeader,
    });
    const data = await res.json();

    if (res.status === 401) return [];
    if (data.error) return [];

    return data;
  };

  const {
    data: posts,
    mutate: fetchPosts,
    isLoading,
  } = useSWR<Post[]>(apiURL, postsFetcher, {
    refreshInterval: 20000,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
  });

  const likePost = async (id: number, isReply: boolean, depth: number = 0) =>
    like(id, isReply, depth, fetchPosts, posts);

  const renderReplies = (replies: Reply[], postID: number): JSX.Element[] =>
    replies.map((reply) => (
      <motion.div
        key={reply.id}
        variants={postAnimation}
        initial="initial"
        animate="visible"
        exit="exit">
        <PostComponent
          key={reply.id}
          isReply={true}
          post={reply}
          postID={reply.id}
          like={likePost}
        />
        <AnimatePresence>
          {reply.replies && renderReplies(reply.replies, postID)}
        </AnimatePresence>
      </motion.div>
    ));

  return (
    <>
      {isLoading && <LoadingIndicator />}
      <AnimatePresence mode="popLayout">
        {posts?.length === 0 ? (
          <motion.div
            className={styles.noPosts}
            variants={postAnimation}
            initial="initial"
            animate="visible"
            exit="exit">
            <MdOutlineSpeakerNotesOff />
            <h3>No posts yet</h3>
            <p>Be the first to post!</p>
          </motion.div>
        ) : (
          posts?.map((post) => (
            <motion.div
              key={post.id}
              className={styles.postWrapper}
              variants={postAnimation}
              initial="initial"
              animate="visible"
              exit="exit">
              <PostComponent
                key={post.id}
                isReply={false}
                post={post}
                postID={post.id}
                like={likePost}
              />
              <AnimatePresence>
                {post.replies && renderReplies(post.replies, post.id)}
              </AnimatePresence>
            </motion.div>
          ))
        )}
      </AnimatePresence>
      <ForumModals fetchPosts={fetchPosts} />
    </>
  );
}

export default ForumPosts;
