import { useEffect } from "react";

export default function useSubmitShortcut(
  onSubmit: () => void,
  status: boolean
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (status && e.key === "Enter" && e.ctrlKey) {
        onSubmit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onSubmit, status]);
}
