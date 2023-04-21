import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  channelName: string | null;
  channelDescription: string | null;
}

const initialState: UserState = {
  channelName: null,
  channelDescription: null,
};

export const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setChannelName: (state, action: PayloadAction<string>) => {
      state.channelName = action.payload;
    },
    setChannelDescription: (state, action: PayloadAction<string>) => {
      state.channelDescription = action.payload;
    },
  },
});

export const { setChannelName, setChannelDescription } = channelSlice.actions;

export default channelSlice.reducer;
