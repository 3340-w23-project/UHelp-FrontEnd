import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string | null;
  displayName: string | null;
  isAuth: boolean;
}

const initialState: UserState = {
  username: null,
  displayName: null,
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setDisplayName: (state, action: PayloadAction<string>) => {
      state.displayName = action.payload;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setUsername, setDisplayName, setIsAuth } = userSlice.actions;

export default userSlice.reducer;
