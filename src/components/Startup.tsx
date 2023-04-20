import Cookies from "universal-cookie";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/store";
import {
  setUsername,
  setDisplayName,
  setIsAuth,
} from "@/redux/slices/userSlice";
import { setIsScrolled, setIsMobile } from "@/redux/slices/appSlice";

function Startup() {
  const cookies = new Cookies();
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
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (cookies.get("access_token")) {
      dispatch(setIsAuth(true));
      fetch("/api/identity", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("access_token")}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((data) => {
          if (data) {
            dispatch(setUsername(data.username));
            dispatch(setDisplayName(data.display_name));
          }
        });
    }
  }, [cookies.get("access_token")]);
  return null;
}

export default Startup;
