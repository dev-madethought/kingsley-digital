import { Head, Html, Main, NextScript } from "next/document"

import { getCssText } from "@/styles/stitches"

export default function Document() {
  const viewport = `
  const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      const target = entry.target;
      const width = target.clientWidth;
      const height = target.clientHeight;
      target.style.setProperty('--vw', width + 'px');
      target.style.setProperty('--vh', height + 'px');
    }
  });
  resizeObserver.observe(document.documentElement);
  `
  return (
    <Html lang="en">
      <Head>
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Icons&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: viewport }}></script>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
