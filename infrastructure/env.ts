import { cert } from "firebase-admin/app"

/**
 * サーバーサイドで参照される環境変数
 */
export class Env {
  constructor() {
    if (typeof window !== "undefined") {
      throw new Error("This class is only for server-side.")
    }
  }

  /**
   * ライブ環境である
   */
  static get isProduction() {
    return process.env.NODE_ENV === "production"
  }

  /**
   * テスト環境である
   */
  static get isNotProduction() {
    return process.env.NODE_ENV !== "production"
  }

  static get googleProjectId() {
    return process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!
  }

  static get googleClientEmail() {
    return process.env.GOOGLE_CLIENT_EMAIL!
  }

  static get googlePrivateKey() {
    return process.env
      .GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n")
      .replace(/\\/g, "")
  }

  static get googleStorageBucket() {
    return `${this.googleProjectId}.appspot.com`
  }

  static get googleCredential() {
    return cert({
      projectId: this.googleProjectId,
      clientEmail: this.googleClientEmail,
      privateKey: this.googlePrivateKey,
    })
  }

  static get appURL() {
    return process.env.NEXT_PUBLIC_APP_URL!
  }

  static get storageURL() {
    return `gs://${this.googleProjectId}.appspot.com`
  }

  static get strapiApiKey() {
    return process.env.STRAPI_API_KEY!
  }

  static get strapiApiUrl() {
    return process.env.STRAPI_URL!
  }

  static get imageUrl() {
    return process.env.NEXT_PUBLIC_IMAGE_URL!
  }
}