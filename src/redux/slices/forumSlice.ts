import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ForumState {
  isPostModalOpen: boolean;
  isDeleteModalOpen: boolean;
  isEditModalOpen: boolean;
  isReplyModalOpen: boolean;
}

const initialState: ForumState = {
  isPostModalOpen: false,
  isDeleteModalOpen: false,
  isEditModalOpen: false,
  isReplyModalOpen: false,
};

export const forumSlice = createSlice({
  name: "forum",
  initialState,
  reducers: {
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
  },
});

export const {
  setIsPostModalOpen,
  setIsDeleteModalOpen,
  setIsEditModalOpen,
  setIsReplyModalOpen,
} = forumSlice.actions;

export default forumSlice.reducer;
