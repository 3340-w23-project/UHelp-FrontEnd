import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  channelID: number;
  channelName: string | null;
  channelDescription: string | null;
}

const initialState: UserState = {
  channelID: 1,
  channelName: null,
  channelDescription: null,
};

export const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setChannelID: (state, action: PayloadAction<number>) => {
      state.channelID = action.payload;
    },
    setChannelName: (state, action: PayloadAction<string>) => {
      state.channelName = action.payload;
    },
    setChannelDescription: (state, action: PayloadAction<string | null>) => {
      state.channelDescription = action.payload;
    },
  },
});

export const { setChannelID, setChannelName, setChannelDescription } =
  channelSlice.actions;

export default channelSlice.reducer;
