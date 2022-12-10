import { tmpdir } from "os"
import { captureException } from "@sentry/node"
import { getStorage } from "firebase-admin/storage"
import sharp from "sharp"
import { injectable } from "tsyringe"
import { FirebaseAdapter } from "infrastructure"

type Props = {
  fileId: string
  width: number
  quality: number
}

@injectable()
export class ReadImageQuery {
  constructor(private readonly firebaseAdapter: FirebaseAdapter) {}

  async execute(props: Props) {
    try {
      await this.firebaseAdapter.initialize()

      const tmpPath = `${tmpdir()}/${props.fileId}`

      try {
        const buffer = await sharp(tmpPath).toBuffer()
        return buffer
      } catch (error) {}

      const bucket = getStorage().bucket()

      const [file] = await bucket.file(props.fileId).download({
        validation: false,
      })

      try {
        const shapeImage = sharp(file)
          .resize(props.width)
          .png({ quality: props.quality })
        const buffer = shapeImage.toBuffer()
        await shapeImage.toFile(tmpPath)
        return buffer
      } catch (error) {
        captureException(error)
        return file
      }
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
