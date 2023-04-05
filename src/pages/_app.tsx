import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export default function App({ Component, pageProps }: AppProps) {
  const cookies = new Cookies();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");

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
      setIsSignedIn(true);
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
            setUsername(data.username);
            setDisplayName(data.display_name);
          }
        });
    } else {
      setIsSignedIn(false);
    }
  }, [cookies.get("access_token")]);

  return (
    <Component
      {...pageProps}
      isScrolled={isScrolled}
      isMobile={isMobile}
      isSignedIn={isSignedIn}
      username={username}
      displayName={displayName}
    />
  );
}
