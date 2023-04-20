import React, { useEffect, useState } from "react";
import SidebarLayout from "@/layouts/ForumLayout";
import styles from "@/styles/Forum.module.scss";
import Head from "next/head";
import Modal from "@/components/Forum/Modal";
import Cookies from "universal-cookie";
import Account from "@/components/Navbar/Account";
import Button from "@/components/Button";
import useSWR from "swr";
import { AppConfig } from "@/utils/AppConfig";
import { IoTrash } from "react-icons/io5";
import { AiFillLike } from "react-icons/ai";
import { MdReply, MdModeEdit, MdPostAdd } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { zeroRightClassName } from "react-remove-scroll-bar";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { setChannelName } from "@/redux/slices/channelSlice";

type Author = {
  id: number;
  username: string;
  display_name: string;
};

type Reply = {
  id: number;
  content: string;
  author: Author;
  date: string;
  depth: number;
  parent_reply_id: number | null;
  likes: number;
  liked: boolean;
  edited?: boolean;
  replies?: Reply[];
};

type Post = {
  id: number;
  title: string;
  content: string;
  author: Author;
  date: string;
  edited?: boolean;
  likes: number;
  liked: boolean;
  replies?: Reply[];
};

type Props = {
  isMobile: boolean;
};

const postAnimation = {
  initial: {
    y: -15,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  exit: {
    y: 15,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

function Forum({ isMobile }: Props) {
  const cookies = new Cookies();
  const router = useRouter();
  const { channelID } = router.query;

  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const username = useAppSelector((state) => state.user.username);
  const channelName = useAppSelector((state) => state.channel.channelName);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  const [postID, setPostID] = useState(0);
  const [replyID, setReplyID] = useState<number | null>(null);
  const [actionType, setActionType] = useState("post");
  const [postTitleInput, setPostTitleInput] = useState("");
  const [postContentInput, setPostContentInput] = useState("");
  const [error, setError] = useState("");

  const authHeader = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + cookies.get("access_token"),
  };
  const postsApiUrl = `/api/channel/${channelID}/posts`;

  const postsFetcher = async (url: string): Promise<Post[]> => {
    if (!channelID) return [];

    await new Promise((r) => setTimeout(r, 5000));
    const res = await fetch(url, { method: "GET", headers: authHeader });
    const data = await res.json();

    if (res.status === 401) {
      router.push("/signin");
      return [];
    }

    if (channelName !== data.channel_name)
      dispatch(setChannelName(data.channel_name));
    return data.posts;
  };

  const {
    data: posts,
    mutate: fetchPosts,
    isLoading,
  } = useSWR<Post[]>(postsApiUrl, postsFetcher, { refreshInterval: 10000 });

  useEffect(() => {
    if (router.isReady) {
      if (!isAuth) {
        router.push("/signin");
      } else {
        fetchPosts();
      }
    }
  }, [router, isAuth]);

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

  const addReply = (id: number, parent_id: number | null) => {
    if (postContentInput === "") {
      setError("Reply cannot be empty");
      return;
    }

    fetch(`/api/post/${id}/reply`, {
      method: "POST",
      headers: authHeader,
      body: JSON.stringify({
        content: postContentInput,
        post_id: id,
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

  const deleteReply = (id: number | null) => {
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

  const updateReply = (id: number | null) => {
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

  const like = (id: number, isReply: boolean, depth: number) => {
    fetch(`/api/${isReply ? "reply" : "post"}/${id}/like`, {
      method: "POST",
      headers: authHeader,
    })
      .then((res) => res.json())
      .then(({ error }) => {
        if (error) {
          setError(error);
        } else {
          handleLike(id, isReply, depth);
        }
      })
      .catch(console.error);
  };

  const handleLike = (id: number, isReply: boolean, depth: number = 0) => {
    const updateLikes = (data: Post[] | undefined, depth: number): Post[] => {
      if (data && depth === 0) {
        return data.map((post: Post) =>
          post.id === id
            ? {
                ...post,
                liked: !post.liked,
                likes: post.liked ? post.likes - 1 : post.likes + 1,
              }
            : post
        );
      } else {
        if (!data) return [];
        return data.map((post: any) =>
          post.replies
            ? { ...post, replies: updateLikes(post.replies, depth - 1) }
            : post
        );
      }
    };

    const updatedPosts = isReply
      ? updateLikes(posts, depth + 1)
      : updateLikes(posts, 0);

    fetchPosts(postsFetcher(postsApiUrl), {
      optimisticData: updatedPosts,
      rollbackOnError: true,
      populateCache: true,
      revalidate: false,
    });
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
              marginLeft: (post.depth + 1) * (isMobile ? 10 : 20),
              width: `calc(100% - ${
                (post.depth + 1) * (isMobile ? 10 : 20)
              }px)`,
            }
          : {}
      }>
      <div className={styles.postHeader}>
        <div className={styles.postHeaderLeft}>
          {!isReply && <span className={styles.postTitle}>{post.title}</span>}
          <div>
            <span className={styles.postAuthor}>
              <FaUserAlt className={styles.userIcon} />
              {post.author.display_name}
            </span>
            <span className={styles.postDetails}>
              {` \u2022 ${formatDateTime(post.date)}${
                post.edited ? " \u2022 (edited)" : ""
              }`}
            </span>
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
                setReplyID(null);
              }
              setIsReplyModalOpen(true);
            }}
          />
        </div>
      </div>
      <div className={styles.postContent}>{post.content}</div>
      <div className={styles.postFooter}>
        <motion.span
          whileTap={{
            scale: [null, 1.1],
            y: [null, -2],
          }}
          className={`${styles.postLikes}${
            post.liked ? " " + styles.liked : ""
          }`}
          onClick={() => {
            like(isReply ? post.id : postID, isReply, isReply ? post.depth : 0);
          }}>
          {post.likes} <AiFillLike className={styles.likeIcon} />
        </motion.span>
      </div>
    </div>
  );

  const renderReplies = (replies: Reply[], postID: number): JSX.Element[] =>
    replies.map((reply) => (
      <motion.div
        key={reply.id}
        variants={postAnimation}
        initial="initial"
        animate="visible"
        exit="exit">
        {renderPost(true, reply, postID)}
        <AnimatePresence>
          {reply.replies && renderReplies(reply.replies, postID)}
        </AnimatePresence>
      </motion.div>
    ));

  return (
    isAuth && (
      <>
        <Head>
          <title>{`${AppConfig.siteName} - Forum`}</title>
        </Head>
        <SidebarLayout isMobile={isMobile}>
          <div
            style={{
              width: isMobile ? "100%" : "calc(100% - 300px)",
              marginLeft: isMobile ? "0" : "300px",
            }}>
            <div
              className={`${styles.header} ${zeroRightClassName}`}
              style={{ width: isMobile ? "100%" : "calc(100% - 300px)" }}>
              <h2>{channelName}</h2>
              <div className={styles.headerButtons}>
                <Button
                  sm
                  tertiary
                  icon={MdPostAdd}
                  label="New Post"
                  onClick={() => setIsModalOpen(true)}
                />
                <Account />
              </div>
            </div>
            <div className={styles.contentWrapper}>
              <div className={styles.postsWrapper}>
                <AnimatePresence mode="popLayout">
                  {isLoading && (
                    <div className={styles.noPosts}>
                      <div className={styles.loadingIndicator}>
                        {Array.from({ length: 12 }, (_, i) => (
                          <div key={i} />
                        ))}
                      </div>
                    </div>
                  )}
                  {posts && posts.length === 0 ? (
                    <motion.div
                      className={styles.noPosts}
                      variants={postAnimation}
                      initial="initial"
                      animate="visible"
                      exit="exit">
                      <h3>No posts yet</h3>
                      <p>Be the first to post!</p>
                    </motion.div>
                  ) : (
                    posts &&
                    posts.map((post) => (
                      <motion.div
                        key={post.id}
                        className={styles.postWrapper}
                        variants={postAnimation}
                        initial="initial"
                        animate="visible"
                        exit="exit">
                        {renderPost(false, post, post.id)}
                        <AnimatePresence>
                          {post.replies && renderReplies(post.replies, post.id)}
                        </AnimatePresence>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
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
                    autoFocus
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
                    autoFocus
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
