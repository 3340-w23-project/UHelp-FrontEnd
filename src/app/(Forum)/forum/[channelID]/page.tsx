import React from "react";
import dynamic from "next/dynamic";
import styles from "@/app/styles/Forum.module.scss";
import LoadingIndicator from "@/app/components/Forum/Posts/LoadingIndicator";

const ForumPosts = dynamic(
  () => import("../../../components/Forum/Posts/PostList"),
  {
    loading: () => <LoadingIndicator />,
  }
);

async function Forum(context: any) {
  const channelID = context.params.channelID;

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.postsWrapper}>
        <ForumPosts channelID={channelID} />
      </div>
    </div>
  );
}

export default Forum;
