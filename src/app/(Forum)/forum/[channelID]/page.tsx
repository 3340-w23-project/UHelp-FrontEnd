import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import React from "react";
import dynamic from "next/dynamic";
import styles from "@/app/styles/Forum.module.scss";
import ForumHeader from "../../../components/Forum/Header/Header";
import LoadingIndicator from "@/app/components/Forum/Posts/LoadingIndicator";

const ForumPosts = dynamic(
  () => import("../../../components/Forum/Posts/PostList"),
  {
    loading: () => <LoadingIndicator />,
  }
);

async function Forum(context: any) {
  const session = await getServerSession(authOptions);
  const channelID = context.params.channelID;
  return (
    <>
      <ForumHeader session={session} channelID={channelID} />
      <div className={styles.contentWrapper}>
        <div className={styles.postsWrapper}>
          <ForumPosts session={session} channelID={channelID} />
        </div>
      </div>
    </>
  );
}

export default Forum;
