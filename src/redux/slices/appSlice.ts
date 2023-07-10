import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  isScrolled: boolean;
  isMobile: boolean;
  accessToken?: string;
}

const initialState: AppState = {
  isScrolled: false,
  isMobile: false,
  accessToken: undefined,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsScrolled: (state, action: PayloadAction<boolean>) => {
      state.isScrolled = action.payload;
    },
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setIsScrolled, setIsMobile, setAccessToken } = appSlice.actions;

export default appSlice.reducer;
