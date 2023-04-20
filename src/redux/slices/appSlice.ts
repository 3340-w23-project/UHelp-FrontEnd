import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  isScrolled: boolean;
  isMobile: boolean;
}

const initialState: AppState = {
  isScrolled: false,
  isMobile: false,
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
  },
});

export const { setIsScrolled, setIsMobile } = appSlice.actions;

export default appSlice.reducer;
