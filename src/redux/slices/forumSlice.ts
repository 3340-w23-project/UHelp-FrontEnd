import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ForumState {
  activeCategory: number;
  modalType: string;
  isOpen: boolean;
  postID: number;
  replyID: number | null;
  action: string;
  postTitleInput: string;
  postContentInput: string;
  error: string;
}

const initialState: ForumState = {
  activeCategory: 1,
  modalType: "Post",
  isOpen: false,
  postID: 0,
  replyID: null,
  action: "post",
  postTitleInput: "",
  postContentInput: "",
  error: "",
};

export const forumSlice = createSlice({
  name: "forum",
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<number>) => {
      state.activeCategory = action.payload;
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
  },
});

export const {
  setActiveCategory,
  setModalType,
  setIsOpen,
  setPostID,
  setReplyID,
  setAction,
  setPostTitleInput,
  setPostContentInput,
  setError,
} = forumSlice.actions;

export default forumSlice.reducer;
