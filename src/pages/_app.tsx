import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <Component {...pageProps} isScrolled={isScrolled} isMobile={isMobile} />
  );
}
