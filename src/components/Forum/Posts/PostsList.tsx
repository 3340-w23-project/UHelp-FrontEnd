"use client";
import React from "react";
import styles from "@/app/styles/Forum.module.scss";
import { postAnimation } from "@/utils/Animations";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineSpeakerNotesOff } from "react-icons/md";
import PostComponent from "@/components/Forum/Posts/Post";
import ForumModal from "@/components/Forum/Modal/ForumModal";
import LoadingIndicator from "@/components/Forum/Posts/loadingSpinner";
import { useGetPostsQuery } from "@/app/api/postsApi";
import { setChannelID } from "@/redux/slices/channelSlice";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import { useAppSelector } from "@/redux/store";
import ForumHeader from "../Header/Header";
import { Session } from "next-auth";
import { Channel } from "@/utils/Types";

interface PostsListProps {
  channelID: number;
  channel: Channel;
  session: Session | null;
}

function PostsList({ channelID, channel, session }: PostsListProps) {
  const isMenuOpen = useAppSelector((state) => state.forum.isMenuOpen);
  const { data: posts, isLoading } = useGetPostsQuery(String(channelID));
  const dispatch = useDispatch();
  dispatch(setChannelID(parseInt(String(channelID))));

  return (
    <div
      className={clsx(
        styles.contentWrapper,
        !isMenuOpen && styles.expandedContentWrapper
      )}>
      <ForumHeader channel={channel} session={session} />
      <div className={styles.postsWrapper}>
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
                isReply={false}
              />
            ))
          )}
        </AnimatePresence>
        <ForumModal />
      </div>
    </div>
  );
}

export default PostsList;
