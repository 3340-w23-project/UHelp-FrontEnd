"use client";
import "./page.css";
import React, { useEffect } from "react";
import styles from "@/app/styles/Forum.module.scss";
import LoadingIndicator from "@/app/components/Forum/Posts/loadingSpinner";
import clsx from "clsx";
import useSWR from "swr";
import PostComponent from "@/app/components/Forum/Posts/Post";
import ForumModal from "@/app/components/Forum/Modal/ForumModal";
import ForumHeader from "@/app/components/Forum/Header/Header";
import { useAppSelector } from "@/redux/store";
import { Post } from "@/utils/Types";
import { postAnimation } from "@/utils/Animations";
import { postsFetcher } from "../../../(Forum)/forum/[channelID]/helper";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineSpeakerNotesOff } from "react-icons/md";
import { setChannelID } from "@/redux/slices/channelSlice";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { setPosts } from "@/redux/slices/forumSlice";

function Forum() {
  const dispatch = useDispatch();
  const isMenuOpen = useAppSelector((state) => state.forum.isMenuOpen);
  const params = useParams();
  const channelID = params.channelID;
  dispatch(setChannelID(parseInt(channelID)));

  const { data: posts, isLoading } = useSWR<Post[]>(
    `/uhelp-api/channel/${channelID}/posts`,
    postsFetcher,
    {
      refreshInterval: 20000,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
    }
  );

  useEffect(() => {
    if (posts) {
      dispatch(setPosts(posts));
    }
  }, [posts]);

  return (
    <>
      <div
        className={clsx(
          styles.contentWrapper,
          !isMenuOpen && styles.expandedContentWrapper
        )}>
        <ForumHeader />
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
    </>
  );
}

export default Forum;
