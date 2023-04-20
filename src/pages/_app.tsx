import "@/styles/globals.scss";
import Startup from "@/components/Startup";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Startup />
      <Component {...pageProps} />
    </Provider>
  );
}
