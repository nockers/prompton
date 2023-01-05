import { ApolloProvider } from "@apollo/client"
import type { AppProps } from "@blitzjs/next"
import { ChakraProvider } from "@chakra-ui/react"
import { init } from "@sentry/browser"
import { ErrorBoundary } from "@sentry/react"
import {
  getAnalytics,
  logEvent,
  setAnalyticsCollectionEnabled,
} from "firebase/analytics"
import { getApps, initializeApp } from "firebase/app"
import Head from "next/head"
import { Router } from "next/router"
import type { FC } from "react"
import { Suspense, useEffect } from "react"
import { AppContextProvider } from "app/components/AuthContextProvider"
import { HomeFooter } from "app/components/HomeFooter"
import { HomeHeader } from "app/components/HomeHeader"
import RootError from "app/error"
import RootLoading from "app/loading"
import { Config } from "interface/config"
import { theme } from "interface/theme"
import { client } from "interface/utils/client"

export const App: FC<AppProps> = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  useEffect(() => {
    if (Config.isNotClient) return
    if (Config.isNotProduction) return
    const routeChangeComplete = () => {
      if (getApps().length === 0) return
      logEvent(getAnalytics(), "page_view", {
        page_path: location.pathname,
        page_title: location.pathname,
      })
    }
    Router.events.on("routeChangeComplete", routeChangeComplete)
    routeChangeComplete()
    return () => {
      Router.events.off("routeChangeComplete", routeChangeComplete)
    }
  }, [])

  return (
    <ApolloProvider client={client}>
      <Head>
        <meta
          name={"viewport"}
          content={"width=device-width, initial-scale=1.0"}
        />
        <title>{"Prompton"}</title>
        <meta property={"og:type"} content={"website"} />
        <meta
          property={"og:site_name"}
          content={`${Config.siteName} - ${Config.siteCatchphraseEN}`}
        />
        <meta name={"twitter:card"} content={"summary_large_image"} />
        <meta name={"twitter:site"} content="@promptonio" />
      </Head>
      <ChakraProvider theme={theme}>
        <Suspense fallback={<RootLoading />}>
          <ErrorBoundary fallback={(props) => <RootError {...props} />}>
            <AppContextProvider>
              <HomeHeader />
              {getLayout(<Component {...pageProps} />)}
              <HomeFooter />
            </AppContextProvider>
          </ErrorBoundary>
        </Suspense>
      </ChakraProvider>
    </ApolloProvider>
  )
}

/**
 * Sentry
 */
if (Config.isClient && Config.isProduction) {
  init({
    dsn: Config.sentryDSN,
    environment: Config.sentryEnvironment,
    tracesSampleRate: 1.0,
    attachStacktrace: true,
    normalizeDepth: 5,
    release: Config.sentryRelease,
  })
}

/**
 * Firebase
 */
if (Config.isClient && getApps().length === 0) {
  initializeApp(Config.firebaseOptions)
  if (Config.isNotProduction) {
    setAnalyticsCollectionEnabled(getAnalytics(), false)
  }
}

if (Config.isClient && location.href.includes("railway.app")) {
  location.href = location.href.replace("prompt.up.railway.app", "prompton.io")
}

export default App
