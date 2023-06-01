import { store } from "@/redux/store";
import {
  setError,
  setIsOpen,
  setPostContentInput,
  setPostID,
  setPostTitleInput,
} from "@/redux/slices/forumSlice";
import { Category, Post } from "@/utils/Types";
import { mutate } from "swr";
import { signOut } from "next-auth/react";

const apiURL = process.env.NEXT_PUBLIC_API_URL;
const dispatch = store.dispatch;

const getChannelID = () => store.getState().channel.channelID;
const getPostsURL = () => `/uhelp-api/channel/${getChannelID()}/posts`;
let access_token: any = null;
const headers = () => {
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + access_token,
  };
};

const getAuthHeader = async () => {
  const res = await fetch("/api/auth/session");
  const data = await res.json();
  access_token = data.user.access_token;
};
getAuthHeader();

export const postsFetcher = async () => {
  const res = await fetch(getPostsURL(), {
    method: "GET",
    headers: headers(),
  });
  const data = await res.json();

  if (res.status === 401) {
    signOut();
    window.location.href = "/signin";
    return [];
  }
  if (data.error) return [];

  return data;
};

const handleResponse = (data: any, setError: Function) =>
  data.error ? setError(data.error) : mutate(getPostsURL());

const checkInput = (title: string, content: string) =>
  title === ""
    ? "Title cannot be empty"
    : content === ""
    ? "Content cannot be empty"
    : null;

export const formatTime = (date: string) => {
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
    : localTime.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
};

export const addPost = async () => {
  const postTitleInput = store.getState().forum.postTitleInput;
  const postContentInput = store.getState().forum.postContentInput;

  const error = checkInput(postTitleInput, postContentInput);
  if (error) {
    dispatch(setError(error));
    return;
  }

  fetch(`${apiURL}/post/new`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      title: postTitleInput,
      content: postContentInput,
      channel_id: getChannelID(),
    }),
  })
    .then((res) => res.json())
    .then(({ error }) => {
      handleResponse({ error }, setError);
      dispatch(setIsOpen(false));
      dispatch(setPostTitleInput(""));
      dispatch(setPostContentInput(""));
    })
    .catch(console.error);
};

export const addReply = async (id: number, parent_id: number | null) => {
  const postContentInput = store.getState().forum.postContentInput;
  if (postContentInput === "") {
    dispatch(setError("Reply cannot be empty"));
    return;
  }

  fetch(`/uhelp-api/post/${id}/reply`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      content: postContentInput,
      post_id: id,
      parent_reply_id: parent_id,
    }),
  })
    .then((res) => res.json())
    .then(({ error }) => {
      handleResponse({ error }, setError);
      dispatch(setIsOpen(false));
      dispatch(setPostContentInput(""));
    })
    .catch(console.error);
};

export const editPost = async (id: number) => {
  const postTitleInput = store.getState().forum.postTitleInput;
  const postContentInput = store.getState().forum.postContentInput;

  const error = checkInput(postTitleInput, postContentInput);
  if (error) {
    dispatch(setError(error));
    return;
  }

  fetch(`/uhelp-api/post/${id}/update`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      title: postTitleInput,
      content: postContentInput,
    }),
  })
    .then((res) => res.json())
    .then(({ error }) => {
      handleResponse({ error }, setError);
      dispatch(setIsOpen(false));
      dispatch(setPostID(0));
      dispatch(setPostTitleInput(""));
      dispatch(setPostContentInput(""));
    })
    .catch(console.error);
};

export const editReply = async (id: number | null) => {
  const postContentInput = store.getState().forum.postContentInput;

  if (postContentInput === "") {
    setError("Reply cannot be empty");
    return;
  }

  fetch(`/uhelp-api/reply/${id}/update`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      content: postContentInput,
    }),
  })
    .then((res) => res.json())
    .then(({ error }) => {
      handleResponse({ error }, setError);
      dispatch(setIsOpen(false));
      dispatch(setPostContentInput(""));
    })
    .catch(console.error);
};

export const deletePost = async (id: number) => {
  fetch(`/uhelp-api/post/${id}/delete`, {
    method: "POST",
    headers: headers(),
  })
    .then(() => {
      dispatch(setIsOpen(false));
      mutate(postsFetcher);
    })
    .catch(console.error);
};

export const deleteReply = async (id: number | null) => {
  fetch(`/uhelp-api/reply/${id}/delete`, {
    method: "POST",
    headers: headers(),
  })
    .then(() => {
      dispatch(setIsOpen(false));
      mutate(postsFetcher);
    })
    .catch(console.error);
};

export const like = async (
  id: number,
  isReply: boolean,
  depth: number = 0,
  posts: Post[] | undefined
) => {
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

  const updatedPostsFetcher = async (): Promise<Post[]> => {
    const res = await fetch(
      `/uhelp-api/${isReply ? "reply" : "post"}/${id}/like`,
      {
        method: "GET",
        headers: headers(),
      }
    );
    const data = await res.json();
    return data;
  };

  mutate(getPostsURL(), updatedPostsFetcher(), {
    optimisticData: updatedPosts,
    rollbackOnError: true,
    populateCache: true,
    revalidate: false,
  });
};

export const categoriesFetcher = async (url: string): Promise<Category[]> =>
  fetch(url, {
    method: "GET",
    headers: headers(),
  })
    .then((res) => res.json())
    .then((data) => {
      return data.categories;
    });

export const channelFetcher = async (url: string): Promise<any> =>
  fetch(url, {
    method: "GET",
    headers: headers(),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
