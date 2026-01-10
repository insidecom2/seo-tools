import QueryProviders from "@/src/providers/provider";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import "../styles/globals.css";
//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryProviders>
      <Component {...pageProps} />
    </QueryProviders>
  );
}

export default MyApp;
