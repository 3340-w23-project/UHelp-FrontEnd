import "@/styles/globals.scss";
import Startup from "@/components/Startup";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

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
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Provider store={store}>
      <Startup />
      <Component {...pageProps} isScrolled={isScrolled} isMobile={isMobile} />
    </Provider>
  );
}
