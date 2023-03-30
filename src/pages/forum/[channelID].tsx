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
import { MdReply, MdModeEdit } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

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

const itemTransition = {
  hidden: {
    y: -20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
  exit: {
    y: -20,
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
};

function Forum() {
  const cookies = new Cookies();
  const router = useRouter();
  const { channelID } = router.query;

  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState("");
  const [channelName, setChannelName] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPostId, setEditPostId] = useState(0);
  const [deletePostId, setDeletePostId] = useState(0);

  const [postTitleInput, setPostTitleInput] = useState("");
  const [postContentInput, setPostContentInput] = useState("");
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    fetch(`/api/channel/${channelID}/posts`).then((res) =>
      res.json().then((data) => {
        setChannelName(data.channel_name);
        setPosts(data.posts);
      })
    );
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
        channel_id: channelID,
      }),
    });
    const data = await res.json();
    if (data.error) {
      setError(data.error);
      return;
    }
    setIsModalOpen(false);
    setPostTitleInput("");
    setPostContentInput("");
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

  const updatePost = async (id: number) => {
    if (postTitleInput === "") {
      setError("Title cannot be empty");
      return;
    } else if (postContentInput === "") {
      setError("Content cannot be empty");
      return;
    }

    const res = await fetch(`/api/post/${id}/update`, {
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
    setIsEditModalOpen(false);
    setEditPostId(0);
    setPostTitleInput("");
    setPostContentInput("");
    fetchPosts();
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
      if (router.isReady) {
        fetchPosts();
      }
      const decoded: any = jwt(cookies.get("access_token"));
      setUser(decoded.sub);
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>{`${AppConfig.siteName} - Forum`}</title>
      </Head>
      <SidebarLayout>
        <div className={styles.header}>
          <h2>{channelName}</h2>
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
            <AnimatePresence>
              {posts.map((post) => {
                return (
                  <motion.div
                    key={post.id}
                    className={styles.post}
                    variants={itemTransition}
                    initial="hidden"
                    animate="visible"
                    exit="exit">
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
                          <>
                            <Button
                              secondary
                              icon={IoTrash}
                              onClick={() => {
                                setDeletePostId(post.id);
                                setIsDeleteModalOpen(true);
                              }}
                            />
                            <Button
                              secondary
                              icon={MdModeEdit}
                              onClick={() => {
                                setEditPostId(post.id);
                                setPostTitleInput(post.title);
                                setPostContentInput(post.content);
                                setIsEditModalOpen(true);
                              }}
                            />
                          </>
                        )}
                        <Button secondary icon={MdReply} />
                      </div>
                    </div>
                    <div className={styles.postContent}>{post.content}</div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </SidebarLayout>

      {/* New Post Modal */}
      <Modal
        status={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
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

      {/* Edit Post Modal */}
      <Modal
        status={isEditModalOpen}
        handleClose={() => {
          setIsEditModalOpen(false);
          setEditPostId(0);
          setPostTitleInput("");
          setPostContentInput("");
        }}
        title={"Edit Post"}
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
              onClick={() => updatePost(editPostId)}
              label={"Update Post"}></Button>
          </div>
        </div>
      </Modal>

      {/* Delete Post Modal */}
      <Modal
        status={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
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
                setIsDeleteModalOpen(false);
              }}
              label={"Delete Post"}></Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Forum;
