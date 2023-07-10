import { store } from "@/redux/store";
import { setError } from "@/redux/slices/forumSlice";

const dispatch = store.dispatch;

export const validateInput = (isReply: boolean) => {
  const postContentInput = store.getState().forum.postContentInput;
  if (!postContentInput) {
    dispatch(setError("Content cannot be empty"));
    return false;
  }
  if (!isReply) {
    const postTitleInput = store.getState().forum.postTitleInput;
    if (!postTitleInput) {
      dispatch(setError("Title cannot be empty"));
      return false;
    }
  }
  return true;
};

export const formatTime = (date: string, full: boolean) => {
  const postedDate = new Date(date);
  const localOffset = new Date().getTimezoneOffset();
  const localTime = new Date(postedDate.getTime() - localOffset * 60 * 1000);

  if (full)
    return localTime.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

  const now = new Date();
  const diffInMs = Math.abs(now.getTime() - localTime.getTime());
  const diffInSeconds = Math.round(diffInMs / 1000);
  const diffInMinutes = Math.round(diffInSeconds / 60);
  const diffInHours = Math.round(diffInMinutes / 60);
  const diffInDays = Math.round(diffInHours / 24);
  const diffInMonths = Math.round(diffInDays / 30);
  const diffInYears = Math.round(diffInMonths / 12);

  const timeFormat =
    diffInSeconds < 60
      ? diffInSeconds + "s"
      : diffInMinutes < 60
      ? diffInMinutes + "m"
      : diffInHours < 24
      ? diffInHours + "h"
      : diffInDays < 30
      ? diffInDays + "d"
      : diffInMonths < 12
      ? diffInMonths + "mo"
      : diffInYears + "y";

  return timeFormat + " ago";
};
