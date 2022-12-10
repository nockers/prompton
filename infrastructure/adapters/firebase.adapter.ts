import { captureException } from "@sentry/node"
import { cert, getApps, initializeApp } from "firebase-admin/app"

export class FirebaseAdapter {
  async initialize() {
    try {
      if (getApps().length !== 0) {
        return null
      }

      // if (process.env.NODE_ENV === "development") {
      //   process.env.FIREBASE_AUTH_EMULATOR_HOST = "localhost:9099"
      //   process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080"
      //   process.env.FIREBASE_STORAGE_EMULATOR_HOST = "localhost:9199"
      // }

      const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!

      const clientEmail = process.env.FIREBASE_CLIENT_EMAIL!

      const privateKey = process.env.FIREBASE_PRIVATE_KEY!

      initializeApp({
        credential: cert({
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, "\n").replace(/\\/g, ""),
          projectId,
        }),
        storageBucket: `${projectId}.appspot.com`,
      })
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
