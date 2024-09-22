import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const themeMode =
      ctx.req?.headers?.cookie
        ?.split('; ')
        .find((row) => row.startsWith('themeMode='))
        ?.split('=')[1] || 'light';
    return { ...initialProps, themeMode };
  }

  render() {
    const themeMode = (this.props as any).themeMode;
    return (
      <Html lang="fa" data-theme={themeMode}>
        <Head>
          <link rel="icon" href="/images/logo.ico" sizes="any" />
          <title>سامانه EDR</title>
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  const themeMode = document.documentElement.getAttribute('data-theme');
                  if (themeMode) {
                    document.documentElement.setAttribute('data-theme', themeMode);
                  }
                })();
              `,
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
