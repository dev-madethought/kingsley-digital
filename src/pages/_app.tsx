import type { AppProps } from "next/app"
import { ParallaxProvider } from "react-scroll-parallax"

import { Application } from "@/components/application"
import { ClientProvider } from "@/state/client-provider"
import { globalCss } from "@/styles/global"

export default function App({ Component, pageProps }: AppProps) {
  globalCss()

  return (
    <ClientProvider>
      <ParallaxProvider>
        <Application>
          <Component {...pageProps} />
        </Application>
      </ParallaxProvider>
    </ClientProvider>
  )
}
