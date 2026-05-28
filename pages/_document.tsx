import Document, {
  Head,
  Html,
  Main,
  NextScript,
  type DocumentContext,
} from 'next/document';

import { STORAGE_KEY } from '@/src/providers/theme-provider';

const themeInitScript = `(function(){try{var stored=window.localStorage.getItem('${STORAGE_KEY}');var system=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';var theme=stored||system;document.documentElement.classList.toggle('dark',theme==='dark');document.documentElement.dataset.theme=theme;}catch(e){document.documentElement.dataset.theme='light';}})();`;

export default class AppDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
