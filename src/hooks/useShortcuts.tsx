import { setIsOpen } from "@/redux/slices/forumSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useSubmitShortcut(
  onSubmit: () => void,
  status: boolean
) {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (status && e.key === "Enter" && e.ctrlKey) {
        onSubmit();
      } else if (status && e.key === "Escape") {
        dispatch(setIsOpen(false));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onSubmit, status]);
}
