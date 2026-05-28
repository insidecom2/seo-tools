import QueryProviders from '@/src/providers/provider';
import { ThemeProvider } from '@/src/providers/theme-provider';
import { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import '../styles/globals.css';
//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <QueryProviders>
        <Component {...pageProps} />
      </QueryProviders>
    </ThemeProvider>
  );
}

export default MyApp;
