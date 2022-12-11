import vision from "@google-cloud/vision"
import { captureException } from "@sentry/node"
import { toHexFromRgb } from "infrastructure/utils/toHexFromRgb"

export class VisionAdapter {
  /**
   * https://cloud.google.com/vision/docs/labels
   */
  async getLabels(fileId: string) {
    try {
      const clientEmail = process.env.GOOGLE_CLIENT_EMAIL!

      const privateKey = process.env.GOOGLE_PRIVATE_KEY!

      const client = new vision.ImageAnnotatorClient({
        credentials: {
          client_email: clientEmail,
          private_key: privateKey.replace(/\\n/g, "\n"),
        },
      })

      const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!

      const filePath = `gs://${projectId}.appspot.com/${fileId}`

      const [result] = await client.labelDetection(filePath)

      if (typeof result.labelAnnotations === "undefined") {
        return []
      }

      if (result.labelAnnotations === null) {
        return []
      }

      return result.labelAnnotations.map((annotation) => {
        return annotation.description!.replaceAll(/\s/g, "_").toLowerCase()
      })
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }

  /**
   * https://cloud.google.com/vision/docs/detecting-properties
   */
  async getProperties(fileId: string) {
    try {
      const clientEmail = process.env.GOOGLE_CLIENT_EMAIL!

      const privateKey = process.env.GOOGLE_PRIVATE_KEY!

      const client = new vision.ImageAnnotatorClient({
        credentials: {
          client_email: clientEmail,
          private_key: privateKey.replace(/\\n/g, "\n"),
        },
      })

      const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!

      const filePath = `gs://${projectId}.appspot.com/${fileId}`

      const [result] = await client.imageProperties(filePath)

      const colors =
        result.imagePropertiesAnnotation?.dominantColors?.colors ?? []

      if (typeof colors === "undefined") {
        return []
      }

      return colors.map((color) => {
        return toHexFromRgb(
          color.color!.red!,
          color.color!.green!,
          color.color!.blue!,
        )
      })
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }

  async getSafeSearchAnnotation(fileId: string) {
    try {
      const clientEmail = process.env.GOOGLE_CLIENT_EMAIL!

      const privateKey = process.env.GOOGLE_PRIVATE_KEY!

      const client = new vision.ImageAnnotatorClient({
        credentials: {
          client_email: clientEmail,
          private_key: privateKey.replace(/\\n/g, "\n"),
        },
      })

      const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!

      const filePath = `gs://${projectId}.appspot.com/${fileId}`

      const [result] = await client.safeSearchDetection(filePath)

      return {
        adult: result.safeSearchAnnotation?.adult as string,
        medical: result.safeSearchAnnotation?.medical as string,
        racy: result.safeSearchAnnotation?.racy as string,
        spoof: result.safeSearchAnnotation?.spoof as string,
        violence: result.safeSearchAnnotation?.violence as string,
      }
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
