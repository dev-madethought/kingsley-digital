import { Head, Html, Main, NextScript } from "next/document"

import { getCssText } from "@/styles/stitches"

export default function Document() {
  const viewport = `function updateViewport() {console.log('update viewport'); document.documentElement.style.setProperty('--vw', document.documentElement.clientWidth + 'px'); document.documentElement.style.setProperty('--vh', document.documentElement.clientHeight + 'px');}; window.addEventListener('resize', updateViewport); updateViewport();`
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
