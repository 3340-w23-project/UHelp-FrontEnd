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
import useSWR from "swr";
import { zeroRightClassName } from "react-remove-scroll-bar";

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

type Props = {
  isSignedIn: boolean;
  username: string;
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

function Forum({ isSignedIn, username }: Props) {
  const cookies = new Cookies();
  const router = useRouter();
  const { channelID } = router.query;

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  const [channelName, setChannelName] = useState("");
  const [postID, setPostID] = useState(0);
  const [replyID, setReplyID] = useState(0);
  const [actionType, setActionType] = useState("post");
  const [postTitleInput, setPostTitleInput] = useState("");
  const [postContentInput, setPostContentInput] = useState("");
  const [error, setError] = useState("");

  const { data: posts, mutate: fetchPosts } = useSWR<Post[]>(
    `/api/channel/${channelID ? channelID : "1"}/posts`,
    async (url) => {
      const res = await fetch(url);
      const data = await res.json();
      setChannelName(data.channel_name);
      return data.posts;
    },
    { refreshInterval: 5000 }
  );

  useEffect(() => {
    if (router.isReady) {
      if (!isSignedIn) {
        router.push("/signin");
      } else {
        fetchPosts();
      }
    }
  }, [router, isSignedIn]);

  const authHeader = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + cookies.get("access_token"),
  };

  const handleResponse = (data: any, setError: Function, mutate: Function) =>
    data.error ? setError(data.error) : mutate();

  const checkInput = (title: string, content: string) =>
    title === ""
      ? "Title cannot be empty"
      : content === ""
      ? "Content cannot be empty"
      : null;

  const addPost = () => {
    const error = checkInput(postTitleInput, postContentInput);
    if (error) {
      setError(error);
      return;
    }

    fetch("/api/post/new", {
      method: "POST",
      headers: authHeader,
      body: JSON.stringify({
        title: postTitleInput,
        content: postContentInput,
        channel_id: channelID,
      }),
    })
      .then((res) => res.json())
      .then(({ error }) => {
        handleResponse({ error }, setError, fetchPosts);
        setIsModalOpen(false);
        setPostTitleInput("");
        setPostContentInput("");
      })
      .catch(console.error);
  };

  const addReply = (id: number, parent_id: number) => {
    if (postContentInput === "") {
      setError("Reply cannot be empty");
      return;
    }

    fetch(`/api/post/${id}/reply`, {
      method: "POST",
      headers: authHeader,
      body: JSON.stringify({
        content: postContentInput,
        post_id: postID,
        parent_reply_id: parent_id,
      }),
    })
      .then((res) => res.json())
      .then(({ error }) => {
        handleResponse({ error }, setError, fetchPosts);
        setIsReplyModalOpen(false);
        setPostContentInput("");
      })
      .catch(console.error);
  };

  const deletePost = (id: number) => {
    fetch(`/api/post/${id}/delete`, {
      method: "POST",
      headers: authHeader,
    })
      .then(() => {
        setIsDeleteModalOpen(false);
        fetchPosts();
      })
      .catch(console.error);
  };

  const deleteReply = (id: number) => {
    fetch(`/api/reply/${id}/delete`, {
      method: "POST",
      headers: authHeader,
    })
      .then(() => {
        setIsDeleteModalOpen(false);
        fetchPosts();
      })
      .catch(console.error);
  };

  const updatePost = (id: number) => {
    const error = checkInput(postTitleInput, postContentInput);
    if (error) {
      setError(error);
      return;
    }

    fetch(`/api/post/${id}/update`, {
      method: "POST",
      headers: authHeader,
      body: JSON.stringify({
        title: postTitleInput,
        content: postContentInput,
      }),
    })
      .then((res) => res.json())
      .then(({ error }) => {
        handleResponse({ error }, setError, fetchPosts);
        setIsEditModalOpen(false);
        setPostID(0);
        setPostTitleInput("");
        setPostContentInput("");
      })
      .catch(console.error);
  };

  const updateReply = (id: number) => {
    if (postContentInput === "") {
      setError("Reply cannot be empty");
      return;
    }

    fetch(`/api/reply/${id}/update`, {
      method: "POST",
      headers: authHeader,
      body: JSON.stringify({
        content: postContentInput,
      }),
    })
      .then((res) => res.json())
      .then(({ error }) => {
        handleResponse({ error }, setError, fetchPosts);
        setIsEditModalOpen(false);
        setPostContentInput("");
      })
      .catch(console.error);
  };

  const formatDateTime = (date: string) => {
    const postedDate = new Date(date);
    const localOffset = new Date().getTimezoneOffset();
    const localTime = new Date(postedDate.getTime() - localOffset * 60 * 1000);
    const now = new Date();
    const diffInMs = Math.abs(now.getTime() - localTime.getTime());
    const diffInSeconds = Math.round(diffInMs / 1000);
    const diffInMinutes = Math.round(diffInMs / (1000 * 60));
    const diffInHours = Math.round(diffInMs / (1000 * 60 * 60));

    return diffInSeconds < 60
      ? diffInSeconds + "s ago"
      : diffInMinutes < 60
      ? diffInMinutes + "m ago"
      : diffInHours < 24
      ? diffInHours + "h ago"
      : "on " +
        localTime.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        });
  };

  const renderPost = (isReply: boolean, post: any, postID: number) => (
    <div
      key={post.id}
      className={styles.post}
      style={
        isReply
          ? {
              marginLeft: (post.depth + 1) * 20,
              width: `calc(100% - ${(post.depth + 1) * 20}px)`,
            }
          : {}
      }>
      <div className={styles.postHeader}>
        <div className={styles.postHeaderLeft}>
          {!isReply && <span className={styles.postTitle}>{post.title}</span>}
          <div>
            <span className={styles.postAuthor}>
              <FaUserAlt className={styles.userIcon} />
              {post.author.username}
            </span>
            {` ${isReply ? "replied" : "posted"} ${formatDateTime(post.date)}`}
          </div>
        </div>
        <div className={styles.postHeaderRight}>
          {post.author.username === username && (
            <>
              <Button
                tertiary
                icon={IoTrash}
                onClick={() => {
                  if (isReply) setReplyID(post.id);
                  else setPostID(post.id);
                  setActionType(isReply ? "reply" : "post");
                  setIsDeleteModalOpen(true);
                }}
              />
              <Button
                tertiary
                icon={MdModeEdit}
                onClick={() => {
                  if (isReply) {
                    setPostID(postID);
                    setReplyID(post.id);
                  } else {
                    setPostID(post.id);
                    setPostTitleInput(post.title);
                  }
                  setActionType(isReply ? "reply" : "post");
                  setPostContentInput(post.content);
                  setIsEditModalOpen(true);
                }}
              />
            </>
          )}
          <Button
            tertiary
            icon={MdReply}
            onClick={() => {
              if (isReply) {
                setPostID(postID);
                setReplyID(post.id);
              } else {
                setPostID(post.id);
                setReplyID(0);
              }
              setIsReplyModalOpen(true);
            }}
          />
        </div>
      </div>
      <div className={styles.postContent}>{post.content}</div>
    </div>
  );

  const renderReplies = (replies: Reply[], postID: number): JSX.Element[] =>
    replies.map((reply) => (
      <div key={reply.id}>
        {renderPost(true, reply, postID)}
        {reply.replies.length > 0 && renderReplies(reply.replies, postID)}
      </div>
    ));

  return (
    isSignedIn && (
      <>
        <Head>
          <title>{`${AppConfig.siteName} - Forum`}</title>
        </Head>
        <SidebarLayout>
          <div className={`${styles.header} ${zeroRightClassName}`}>
            <h2>{channelName}</h2>
            <div className={styles.headerButtons}>
              <Button
                sm
                tertiary
                label="New Post"
                onClick={() => setIsModalOpen(true)}
              />
              <Account username={username} />
            </div>
          </div>
          <div className={styles.contentWrapper}>
            <div className={styles.postsWrapper}>
              <AnimatePresence>
                {posts?.map((post) => (
                  <motion.div
                    key={post.id}
                    className={styles.postWrapper}
                    variants={itemTransition}
                    initial="hidden"
                    animate="visible"
                    exit="exit">
                    {renderPost(false, post, post.id)}
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
                ))}
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
