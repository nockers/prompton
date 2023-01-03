import { captureException } from "@sentry/node"
import axios from "axios"
import type { Id } from "core"
import { Url } from "core"
import { Env } from "infrastructure/env"

export class ImageAdapter {
  async createURL(fileId: Id) {
    try {
      const result = await axios({
        method: "POST",
        url: Env.appEngineURL,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          bucketName: Env.storageBucker,
          filePath: fileId.value,
        },
      })

      return new Url(result.data.data as string)
    } catch (error) {
      captureException(error)
      return null
    }
  }
}
