import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Blog for Journey of Nerd" />
        <meta property="og:title" content="NerdInSight" />
        <meta property="og:description" content="Blog for Journey of Nerd" />
        <meta property="og:url" content="https://nerdinsight.vercel.app" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
