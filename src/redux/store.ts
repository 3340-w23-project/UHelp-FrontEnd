import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./slices/appSlice";
import { forumSlice } from "./slices/forumSlice";
import { channelSlice } from "./slices/channelSlice";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { postsApi } from "@/app/api/postsApi";

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    forum: forumSlice.reducer,
    channel: channelSlice.reducer,
    postsApi: postsApi.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(postsApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
