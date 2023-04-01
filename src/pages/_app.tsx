import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";

export default function App({ Component, pageProps }: AppProps) {
  const cookies = new Cookies();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const handleResize = () => {
    const width = window.innerWidth;
    if (width < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (cookies.get("access_token")) {
      setIsSignedIn(true);
      const decoded: any = jwt(cookies.get("access_token"));
      setUsername(decoded.sub);
    } else {
      setIsSignedIn(false);
    }
  }, [cookies]);

  return (
    <Component
      {...pageProps}
      isScrolled={isScrolled}
      isMobile={isMobile}
      isSignedIn={isSignedIn}
      username={username}
    />
  );
}
