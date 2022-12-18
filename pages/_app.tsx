import { ApolloProvider } from "@apollo/client"
import { AppProps } from "@blitzjs/next"
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
import { FC, Suspense, useEffect } from "react"
import { AppContextProvider } from "app/components/AuthContextProvider"
import { HomeHeader } from "app/components/HomeHeader"
import RootError from "app/error"
import RootLoading from "app/loading"
import { theme } from "interface/theme"
import { client } from "interface/utils/client"

export const App: FC<AppProps> = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  const description =
    "Prompton（プロンプトン）はAIデザイナーを支援する作品投稿サイトです。AIで生成した作品を投稿したり制作の依頼を引き受けられます。"

  useEffect(() => {
    if (typeof window === "undefined") return
    if (process.env.NODE_ENV !== "production") return
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
          content={"Prompton - AIデザイナーに制作依頼"}
        />
        <meta name={"twitter:card"} content={"summary_large_image"} />
        <meta name={"twitter:site"} content="@nockerdev" />
      </Head>
      <ChakraProvider theme={theme}>
        <Suspense fallback={<RootLoading />}>
          <ErrorBoundary fallback={(props) => <RootError {...props} />}>
            <AppContextProvider>
              <HomeHeader />
              {getLayout(<Component {...pageProps} />)}
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
if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
  init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 1.0,
  })
}

/**
 * Firebase
 */
if (typeof window !== "undefined" && getApps().length === 0) {
  initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  })
  if (process.env.NODE_ENV !== "production") {
    setAnalyticsCollectionEnabled(getAnalytics(), false)
  }
}

export default App
