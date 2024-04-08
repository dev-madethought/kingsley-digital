import type { AppProps } from "next/app"

import { Application } from "@/components/application"
import { ClientProvider } from "@/state/client-provider"
import { globalCss } from "@/styles/global"

export default function App({ Component, pageProps }: AppProps) {
  globalCss()

  return (
    <ClientProvider>
      <Application>
        <Component {...pageProps} />
      </Application>
    </ClientProvider>
  )
}
