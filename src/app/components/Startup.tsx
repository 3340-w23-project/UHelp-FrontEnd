"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/store";
import { setIsScrolled, setIsMobile } from "@/redux/slices/appSlice";

function Startup() {
  const dispatch = useAppDispatch();

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 0) {
      dispatch(setIsScrolled(true));
    } else {
      dispatch(setIsScrolled(false));
    }
  };

  const handleResize = () => {
    const width = window.innerWidth;
    if (width < 768) {
      dispatch(setIsMobile(true));
    } else {
      dispatch(setIsMobile(false));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleScroll();
    handleResize();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return null;
}

export default Startup;
