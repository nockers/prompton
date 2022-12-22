export class Config {
  static get isClient() {
    return typeof window !== "undefined"
  }

  static get isNotClient() {
    return typeof window === "undefined"
  }

  static get isProduction() {
    return process.env.NODE_ENV === "production"
  }

  static get isNotProduction() {
    return process.env.NODE_ENV !== "production"
  }

  static get siteName() {
    return "Prompton"
  }

  static get siteCatchphraseEN() {
    return "Find AI works and Prompters"
  }

  static get siteCatchphraseJA() {
    return "AI作品の依頼サイト"
  }

  static get siteDescriptionEN() {
    return "Prompton is a community of AI Prompters. You can post AI works and accept production requests."
  }

  static get siteDescriptionJA() {
    return "Prompton（プロンプトン）はAI作品を楽しむ人々のコミュニティサイトです。AI作品を投稿したり依頼を受け付けることができます。"
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
}
