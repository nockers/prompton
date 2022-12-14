export class Config {
  static get isClient() {
    return typeof window !== "undefined"
  }

  static get isNotClient() {
    return typeof window === "undefined"
  }

  static get isProduction() {
    return window.location.hostname === "prompton.io"
  }

  static get isNotProduction() {
    return window.location.hostname !== "prompton.io"
  }

  static get isDevelopment() {
    return process.env.NODE_ENV === "development"
  }

  static get isNotDevelopment() {
    return process.env.NODE_ENV !== "development"
  }

  static get siteName() {
    return "Prompton"
  }

  static get siteCatchphraseEN() {
    return "Find AI works and Prompters"
  }

  static get siteCatchphraseJA() {
    return "AI創作リクエストサービス"
  }

  static get siteDescriptionEN() {
    return "Prompton is a community of AI Prompters. You can post and request AI works."
  }

  static get siteDescriptionJA() {
    return "Prompton（プロンプトン）はAI作品を投稿したりリクエストできるサービスです。"
  }

  static get appURL() {
    return process.env.NEXT_PUBLIC_APP_URL!
  }

  static get imageUrl() {
    return process.env.NEXT_PUBLIC_IMAGE_URL!
  }

  static get graphqlEndpoint() {
    return process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!
  }

  static get sentryDSN() {
    return process.env.NEXT_PUBLIC_SENTRY_DSN!
  }

  static get sentryEnvironment() {
    return process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT!
  }

  static get sentryRelease() {
    return process.env.NEXT_PUBLIC_SENTRY_RELEASE!
  }

  static get firebaseOptions() {
    return {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    }
  }

  static get featureRequest() {
    return process.env.NEXT_PUBLIC_FEATURE_REQUEST === "true"
  }
}
