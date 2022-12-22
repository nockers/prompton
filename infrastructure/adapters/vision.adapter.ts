import vision from "@google-cloud/vision"
import { captureException } from "@sentry/node"
import Color from "color"
import { Env } from "infrastructure/env"

export class VisionAdapter {
  /**
   * https://cloud.google.com/vision/docs/labels
   */
  async getLabels(fileId: string) {
    try {
      const client = new vision.ImageAnnotatorClient({
        credentials: {
          client_email: Env.googleClientEmail,
          private_key: Env.googlePrivateKey,
        },
      })

      const filePath = `${Env.storageURL}/${fileId}`

      const [result] = await client.labelDetection(filePath)

      if (typeof result.labelAnnotations === "undefined") {
        return []
      }

      if (result.labelAnnotations === null) {
        return []
      }

      return result.labelAnnotations.map((annotation) => {
        return annotation
          .description!.replaceAll(/\s/g, "_")
          .replaceAll(/-/g, "_")
          .toLowerCase()
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
      const client = new vision.ImageAnnotatorClient({
        credentials: {
          client_email: Env.googleClientEmail,
          private_key: Env.googlePrivateKey,
        },
      })

      const filePath = `${Env.storageURL}/${fileId}`

      const [result] = await client.imageProperties(filePath)

      const colors =
        result.imagePropertiesAnnotation?.dominantColors?.colors ?? []

      if (typeof colors === "undefined") {
        return []
      }

      return colors.map((color) => {
        return Color.rgb(
          color.color!.red!,
          color.color!.green!,
          color.color!.blue!,
        ).hex()
      })
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }

  async getSafeSearchAnnotation(fileId: string) {
    try {
      const client = new vision.ImageAnnotatorClient({
        credentials: {
          client_email: Env.googleClientEmail,
          private_key: Env.googlePrivateKey,
        },
      })

      const filePath = `${Env.storageURL}/${fileId}`

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
