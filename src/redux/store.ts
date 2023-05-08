import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./slices/appSlice";
import { forumSlice } from "./slices/forumSlice";
import { channelSlice } from "./slices/channelSlice";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    forum: forumSlice.reducer,
    channel: channelSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
