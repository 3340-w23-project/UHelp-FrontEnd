import { Post } from "@/utils/Types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ForumState {
  isMenuOpen: boolean;
  modalType: string;
  isOpen: boolean;
  postID: number;
  replyID: number | null;
  replyDepth: number;
  action: string;
  postTitleInput: string;
  postContentInput: string;
  error: string;
  posts: Post[];
}

const initialState: ForumState = {
  isMenuOpen: false,
  modalType: "Post",
  isOpen: false,
  postID: 0,
  replyID: null,
  replyDepth: 0,
  action: "post",
  postTitleInput: "",
  postContentInput: "",
  error: "",
  posts: [],
};

export const forumSlice = createSlice({
  name: "forum",
  initialState,
  reducers: {
    setIsMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMenuOpen = action.payload;
    },
    setModalType: (state, action: PayloadAction<string>) => {
      state.modalType = action.payload;
    },
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setPostID: (state, action: PayloadAction<number>) => {
      state.postID = action.payload;
    },
    setReplyID: (state, action: PayloadAction<number | null>) => {
      state.replyID = action.payload;
    },
    setReplyDepth: (state, action: PayloadAction<number>) => {
      state.replyDepth = action.payload;
    },
    setAction: (state, action: PayloadAction<string>) => {
      state.action = action.payload;
    },
    setPostTitleInput: (state, action: PayloadAction<string>) => {
      state.postTitleInput = action.payload;
    },
    setPostContentInput: (state, action: PayloadAction<string>) => {
      state.postContentInput = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
});

export const {
  setIsMenuOpen,
  setModalType,
  setIsOpen,
  setPostID,
  setReplyID,
  setReplyDepth,
  setAction,
  setPostTitleInput,
  setPostContentInput,
  setError,
  setPosts,
} = forumSlice.actions;

export default forumSlice.reducer;
