import SidebarLayout from "@/layouts/ForumLayout";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Forum.module.scss";
import { Button } from "@/components/Button";
import { AppConfig } from "@/utils/AppConfig";
import Head from "next/head";

type Post = {
  id: number;
  title: string;
  content: string;
  date: string;
  author: {
    id: number;
    username: string;
  };
  replies: [];
};

function forum() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const res = await fetch("/api/post/all");
    const data = await res.json();
    setPosts(data);
    console.log(data);
  };

  const formatDateTime = (date: string) => {
    const postedDate = new Date(date);
    const localOffset = new Date().getTimezoneOffset();
    const localTime = new Date(postedDate.getTime() - localOffset * 60 * 1000);

    const formattedDate = localTime.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return formattedDate;
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Head>
        <title>{`${AppConfig.siteName} - Forum`}</title>
      </Head>
      <SidebarLayout>
        <div className={styles.header}>
          <h2>Thread Name</h2>
          <div className={styles.headerButtons}>
            <Button sm secondary label="New Post" />
          </div>
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.postsWrapper}>
            {posts.map((post) => {
              return (
                <div key={post.id} className={styles.post}>
                  <div className={styles.postHeader}>
                    <div className={styles.postHeaderLeft}>
                      <span className={styles.postTitle}>{post.title}</span>
                      <div>
                        <span className={styles.postAuthor}>
                          {post.author.username}
                        </span>
                        {" posted on "}
                        <span className={styles.postDate}>
                          {formatDateTime(post.date)}
                        </span>
                      </div>
                    </div>
                    <div className={styles.postHeaderRight}>
                      <Button sm secondary label="Reply" />
                    </div>
                  </div>
                  <div className={styles.postContent}>{post.content}</div>
                </div>
              );
            })}
          </div>
        </div>
      </SidebarLayout>
    </>
  );
}

export default forum;
