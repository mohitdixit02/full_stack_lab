import "./index.css";
import type { AppProps } from "next/app";
import Header from "./_components/Header";

export default function App({ Component, pageProps }: AppProps) {
  // Global wrapper for all pages
  console.log("App component rendered with page:", Component.name);
  return <>
    <Header />
    <div className="parent_body">
      <Component {...pageProps} />
    </div>
  </>
}
