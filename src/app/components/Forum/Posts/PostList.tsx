"use client";
import { Post } from "@/utils/Types";
import styles from "@/app/styles/Forum.module.scss";
import React from "react";
import { postAnimation } from "@/utils/Animations";
import PostComponent from "@/app/components/Forum/Posts/Post";
import useSWR from "swr";
import ForumModal from "@/app/components/Forum/Modal/ForumModal";
import LoadingIndicator from "@/app/components/Forum/Posts/LoadingIndicator";
import { like, postsFetcher } from "../../../(Forum)/forum/[channelID]/helper";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineSpeakerNotesOff } from "react-icons/md";
import { setChannelID } from "@/redux/slices/channelSlice";
import { useDispatch } from "react-redux";

function ForumPosts({ channelID }: { channelID: number }) {
  const dispatch = useDispatch();
  dispatch(setChannelID(channelID));

  const { data: posts, isLoading } = useSWR<Post[]>(
    `/uhelp-api/channel/${channelID}/posts`,
    postsFetcher,
    {
      refreshInterval: 20000,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
    }
  );

  const likePost = async (id: number, isReply: boolean, depth: number = 0) =>
    like(id, isReply, depth, posts);

  return (
    <>
      {isLoading && <LoadingIndicator />}
      <AnimatePresence>
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
            <PostComponent
              key={post.id}
              post={post}
              parentID={post.id}
              like={likePost}
              isReply={false}
            />
          ))
        )}
      </AnimatePresence>
      <ForumModal />
    </>
  );
}

export default ForumPosts;
