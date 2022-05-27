import { AppProps } from 'next/app'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import Router from 'next/router';

//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
function MyApp({ Component, pageProps }:AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
