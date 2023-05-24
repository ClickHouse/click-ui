import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/variables.css";
import "../styles/variables.dark.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
