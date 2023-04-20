import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  channelName: string | null;
  posts: any[];
}

const initialState: UserState = {
  channelName: null,
  posts: [],
};

export const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setChannelName: (state, action: PayloadAction<string>) => {
      state.channelName = action.payload;
    },
    setPosts: (state, action: PayloadAction<any[]>) => {
      state.posts = action.payload;
    },
  },
});

export const { setChannelName, setPosts } = channelSlice.actions;

export default channelSlice.reducer;
