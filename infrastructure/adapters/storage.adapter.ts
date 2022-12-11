import { tmpdir } from "os"
import { captureException } from "@sentry/node"
import { getStorage } from "firebase-admin/storage"
import sharp from "sharp"

export class StorageAdapter {
  async getTempPath(fileId: string) {
    try {
      const tmpPath = `${tmpdir()}/${fileId}`

      const bucket = getStorage().bucket()

      const [file] = await bucket.file(fileId).download({
        validation: false,
      })

      await sharp(file).toFile(tmpPath)

      return tmpPath
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
