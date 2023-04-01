import SidebarLayout from "@/layouts/ForumLayout";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Forum.module.scss";
import { Button } from "@/components/Button";
import { AppConfig } from "@/utils/AppConfig";
import Head from "next/head";
import Modal from "@/components/Forum/Modal";
import Cookies from "universal-cookie";
import { IoTrash } from "react-icons/io5";
import { MdReply, MdModeEdit } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import Account from "@/components/Navbar/Account";

type Author = {
  id: number;
  username: string;
};

type Reply = {
  author: Author;
  content: string;
  date: string;
  depth: number;
  id: number;
  parent_reply_id: number | null;
  replies: Reply[];
};

type Post = {
  author: Author;
  content: string;
  date: string;
  id: number;
  replies: Reply[];
  title: string;
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

type Props = {
  isSignedIn: boolean;
  username: string;
};

function Forum({ isSignedIn, username }: Props) {
  const cookies = new Cookies();
  const router = useRouter();
  const { channelID } = router.query;

  const [posts, setPosts] = useState<Post[]>([]);
  const [channelName, setChannelName] = useState("");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  const [postID, setPostID] = useState(0);
  const [replyID, setReplyID] = useState(0);
  const [actionType, setActionType] = useState("post");
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

  const addReply = async (id: number, parent_id: number) => {
    if (postContentInput === "") {
      setError("Reply cannot be empty");
      return;
    }

    const res = await fetch(`/api/post/${id}/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.get("access_token"),
      },
      body: JSON.stringify({
        content: postContentInput,
        post_id: postID,
        parent_reply_id: parent_id,
      }),
    });
    const data = await res.json();
    if (data.error) {
      setError(data.error);
      return;
    }
    setIsReplyModalOpen(false);
    setPostContentInput("");
    fetchPosts();
  };

  const deleteReply = async (id: number) => {
    fetch(`/api/reply/${id}/delete`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + cookies.get("access_token"),
      },
    }).then(() => {
      setIsDeleteModalOpen(false);
      fetchPosts();
    });
  };

  const updateReply = async (id: number) => {
    if (postContentInput === "") {
      setError("Reply cannot be empty");
      return;
    }

    const res = await fetch(`/api/reply/${id}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.get("access_token"),
      },
      body: JSON.stringify({
        content: postContentInput,
      }),
    });
    const data = await res.json();
    if (data.error) {
      setError(data.error);
      return;
    }
    setIsEditModalOpen(false);
    setPostContentInput("");
    fetchPosts();
  };

  const deletePost = async (id: number) => {
    fetch(`/api/post/${id}/delete`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + cookies.get("access_token"),
      },
    }).then(() => {
      setIsDeleteModalOpen(false);
      fetchPosts();
    });
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
    setPostID(0);
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
    if (router.isReady) {
      if (!isSignedIn) {
        router.push("/signin");
      } else {
        fetchPosts();
        console.log(posts);
      }
    }
  }, [router.isReady, isSignedIn]);

  function renderReplies(replies: Reply[], postID: number): JSX.Element[] {
    return replies.map((reply) => {
      return (
        <>
          <div
            key={reply.id}
            className={styles.post}
            style={{
              marginLeft: (reply.depth + 1) * 15,
              width: `calc(100% - ${(reply.depth + 1) * 15}px)`,
            }}>
            <div className={styles.postHeader}>
              <div className={styles.postHeaderLeft}>
                <div>
                  <span className={styles.postAuthor}>
                    <FaUserAlt className={styles.userIcon} />
                    {reply.author.username}
                  </span>
                  {" replied on "}
                  <span className={styles.postDate}>
                    {formatDateTime(reply.date)}
                  </span>
                </div>
              </div>
              <div className={styles.postHeaderRight}>
                {reply.author.username === username && (
                  <>
                    <Button
                      secondary
                      icon={IoTrash}
                      onClick={() => {
                        setReplyID(reply.id);
                        setActionType("reply");
                        setIsDeleteModalOpen(true);
                      }}
                    />
                    <Button
                      secondary
                      icon={MdModeEdit}
                      onClick={() => {
                        setPostID(postID);
                        setActionType("reply");
                        setReplyID(reply.id);
                        setPostContentInput(reply.content);
                        setIsEditModalOpen(true);
                      }}
                    />
                  </>
                )}
                <Button
                  secondary
                  icon={MdReply}
                  onClick={() => {
                    setPostID(postID);
                    setReplyID(reply.id);
                    setIsReplyModalOpen(true);
                  }}
                />
              </div>
            </div>
            <div className={styles.replyContent}>{reply.content}</div>
          </div>
          {reply.replies.length > 0 && renderReplies(reply.replies, postID)}
        </>
      );
    });
  }

  return (
    isSignedIn && (
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
              <Account username={username} />
            </div>
          </div>
          <div className={styles.contentWrapper}>
            <div className={styles.postsWrapper}>
              <AnimatePresence>
                {posts.map((post) => {
                  return (
                    <motion.div
                      key={post.id}
                      className={styles.postWrapper}
                      variants={itemTransition}
                      initial="hidden"
                      animate="visible"
                      exit="exit">
                      <div className={styles.post}>
                        <div className={styles.postHeader}>
                          <div className={styles.postHeaderLeft}>
                            <span className={styles.postTitle}>
                              {post.title}
                            </span>
                            <div>
                              <span className={styles.postAuthor}>
                                <FaUserAlt className={styles.userIcon} />
                                {post.author.username}
                              </span>
                              {" posted on "}
                              <span className={styles.postDate}>
                                {formatDateTime(post.date)}
                              </span>
                            </div>
                          </div>
                          <div className={styles.postHeaderRight}>
                            {post.author.username === username && (
                              <>
                                <Button
                                  secondary
                                  icon={IoTrash}
                                  onClick={() => {
                                    setPostID(post.id);
                                    setActionType("post");
                                    setIsDeleteModalOpen(true);
                                  }}
                                />
                                <Button
                                  secondary
                                  icon={MdModeEdit}
                                  onClick={() => {
                                    setPostID(post.id);
                                    setActionType("post");
                                    setPostTitleInput(post.title);
                                    setPostContentInput(post.content);
                                    setIsEditModalOpen(true);
                                  }}
                                />
                              </>
                            )}
                            <Button
                              secondary
                              icon={MdReply}
                              onClick={() => {
                                setIsReplyModalOpen(true);
                                setPostID(post.id);
                                setReplyID(0);
                              }}
                            />
                          </div>
                        </div>
                        <div className={styles.postContent}>{post.content}</div>
                      </div>
                      {post.replies.length > 0 && (
                        <motion.div
                          variants={itemTransition}
                          initial="hidden"
                          animate="visible"
                          exit="exit">
                          {renderReplies(post.replies, post.id)}
                        </motion.div>
                      )}
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
            setPostID(0);
            setPostTitleInput("");
            setPostContentInput("");
          }}
          title={`Edit ${actionType === "post" ? "Post" : "Reply"}`}
          width={"30%"}>
          <div className={styles.modalBodyWrapper}>
            <div className={styles.modalBody}>
              <div className={styles.modalForm}>
                {actionType === "post" && (
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
                )}
                <label className={styles.modalLabel}>
                  {actionType === "post" ? "Post Content" : "Reply Content"}
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
                onClick={() => {
                  if (actionType === "post") {
                    updatePost(postID);
                  } else if (actionType === "reply") {
                    updateReply(replyID);
                  }
                }}
                label={`Update ${actionType === "post" ? "Post" : "Reply"}`}
              />
            </div>
          </div>
        </Modal>

        {/* Delete Post Modal */}
        <Modal
          status={isDeleteModalOpen}
          handleClose={() => setIsDeleteModalOpen(false)}
          title={`Delete ${actionType === "post" ? "Post" : "Reply"}`}>
          <div className={styles.modalBodyWrapper}>
            <div className={styles.modalBody}>
              <div className="centerRow">
                <p>{`Are you sure you want to permanently delete this ${
                  actionType === "post" ? "post" : "reply"
                }?`}</p>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <Button
                secondary
                sm
                onClick={() => {
                  if (actionType === "post") {
                    deletePost(postID);
                  } else if (actionType === "reply") {
                    deleteReply(replyID);
                  }
                }}
                label={`Delete ${actionType === "post" ? "Post" : "Reply"}`}
              />
            </div>
          </div>
        </Modal>

        {/* Reply Modal */}
        <Modal
          status={isReplyModalOpen}
          handleClose={() => {
            setIsReplyModalOpen(false);
          }}
          title={"Reply"}
          width={"30%"}>
          <div className={styles.modalBodyWrapper}>
            <div className={styles.modalBody}>
              <div className={styles.modalForm}>
                <label className={styles.modalLabel}>
                  Reply Content
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
                onClick={() => addReply(postID, replyID)}
                label={"Add Reply"}></Button>
            </div>
          </div>
        </Modal>
      </>
    )
  );
}

export default Forum;
