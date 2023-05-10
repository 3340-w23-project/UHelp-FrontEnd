import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ForumState {
  activeCategory: number;
  isPostModalOpen: boolean;
  isDeleteModalOpen: boolean;
  isEditModalOpen: boolean;
  isReplyModalOpen: boolean;
  postID: number;
  replyID: number | null;
  action: string;
  postTitleInput: string;
  postContentInput: string;
  error: string;
}

const initialState: ForumState = {
  activeCategory: 1,
  isPostModalOpen: false,
  isDeleteModalOpen: false,
  isEditModalOpen: false,
  isReplyModalOpen: false,
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
    setIsPostModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isPostModalOpen = action.payload;
    },
    setIsDeleteModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isDeleteModalOpen = action.payload;
    },
    setIsEditModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isEditModalOpen = action.payload;
    },
    setIsReplyModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isReplyModalOpen = action.payload;
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
  setIsPostModalOpen,
  setIsDeleteModalOpen,
  setIsEditModalOpen,
  setIsReplyModalOpen,
  setPostID,
  setReplyID,
  setAction,
  setPostTitleInput,
  setPostContentInput,
  setError,
} = forumSlice.actions;

export default forumSlice.reducer;
