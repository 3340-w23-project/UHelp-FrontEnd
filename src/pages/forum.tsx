import SidebarLayout from "@/layouts/ForumLayout";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Forum.module.scss";
import { Button } from "@/components/Button";
import { AppConfig } from "@/utils/AppConfig";
import Head from "next/head";
import Modal from "@/components/Forum/Modal";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import { IoTrash } from "react-icons/io5";
import { MdReply } from "react-icons/md";

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

function Forum() {
  const cookies = new Cookies();
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletePostId, setDeletePostId] = useState(0);

  const closeModal = () => setIsModalOpen(false);
  const [postTitleInput, setPostTitleInput] = useState("");
  const [postContentInput, setPostContentInput] = useState("");
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    const res = await fetch("/api/post/all");
    const data = await res.json();
    setPosts(data);
  };

  const addPost = async () => {
    if (postTitleInput === "") {
      setError("Title cannot be empty");
      return;
    } else if (postContentInput === "") {
      setError("Content cannot be empty");
      return;
    }

    const res = await fetch("/api/post/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.get("access_token"),
      },
      body: JSON.stringify({
        title: postTitleInput,
        content: postContentInput,
      }),
    });
    const data = await res.json();
    if (data.error) {
      setError(data.error);
      return;
    }
    closeModal();
    fetchPosts();
  };

  const deletePost = async (id: number) => {
    fetch(`/api/post/${id}/delete`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + cookies.get("access_token"),
      },
    }).then(() => fetchPosts());
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
    if (!cookies.get("access_token")) {
      window.location.href = "/signin";
    } else {
      fetchPosts();
      const decoded: any = jwt(cookies.get("access_token"));
      setUser(decoded.sub);
    }
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
            <Button
              sm
              secondary
              label="New Post"
              onClick={() => setIsModalOpen(true)}
            />
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
                      {post.author.username === user && (
                        <Button
                          secondary
                          icon={IoTrash}
                          onClick={() => {
                            setDeletePostId(post.id);
                            setDeleteModalOpen(true);
                          }}
                        />
                      )}
                      <Button secondary icon={MdReply} />
                    </div>
                  </div>
                  <div className={styles.postContent}>{post.content}</div>
                </div>
              );
            })}
          </div>
        </div>
      </SidebarLayout>

      {/* New Post Modal */}
      <Modal
        status={isModalOpen}
        handleClose={closeModal}
        title={"New Post"}
        width={"30%"}>
        <div className={styles.modalBodyWrapper}>
          <div className={styles.modalBody}>
            <div className={styles.modalForm}>
              <label className={styles.modalLabel}>
                Post Title
                <input
                  type="text"
                  value={postTitleInput}
                  onChange={(e) => {
                    setPostTitleInput(e.target.value);
                  }}
                />
              </label>
              <label className={styles.modalLabel}>
                Post Content
                <textarea
                  value={postContentInput}
                  onChange={(e) => {
                    setPostContentInput(e.target.value);
                  }}
                />
              </label>
            </div>
            <div className="centerRow">
              {error && <p className={styles.error}>{error}</p>}
            </div>
          </div>
          <div className={styles.modalFooter}>
            <Button
              secondary
              sm
              onClick={() => addPost()}
              label={"Add Post"}></Button>
          </div>
        </div>
      </Modal>

      {/* Delete Post Modal */}
      <Modal
        status={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        title={"Delete Post"}>
        <div className={styles.modalBodyWrapper}>
          <div className={styles.modalBody}>
            <div className="centerRow">
              <p>Are you sure you want to permanently delete this post?</p>
            </div>
          </div>
          <div className={styles.modalFooter}>
            <Button
              secondary
              sm
              onClick={() => {
                deletePost(deletePostId);
                setDeleteModalOpen(false);
              }}
              label={"Delete Post"}></Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Forum;
