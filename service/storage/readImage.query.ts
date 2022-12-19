import { tmpdir } from "os"
import { captureException } from "@sentry/node"
import { getStorage } from "firebase-admin/storage"
import sharp from "sharp"
import { injectable } from "tsyringe"
import { FirebaseAdapter } from "infrastructure"

type Props = {
  fileId: string
  width: number
  height: number | null
  quality: number
}

@injectable()
export class ReadImageQuery {
  constructor(private readonly firebaseAdapter: FirebaseAdapter) {}

  async execute(props: Props) {
    try {
      await this.firebaseAdapter.initialize()

      const tmpPath = `${tmpdir()}/${props.fileId}.${props.width}.${
        props.height
      }.${props.quality}`

      try {
        const buffer = await sharp(tmpPath).toBuffer()
        return buffer
      } catch (error) {
        error
      }

      const bucket = getStorage().bucket()

      const [file] = await bucket.file(props.fileId).download({
        validation: false,
      })

      try {
        if (props.width !== null && props.height !== null) {
          const shapeImage = sharp(file)
            .resize({
              width: props.width,
              height: props.height,
              fit: sharp.fit.cover,
            })
            .png({ quality: props.quality })
          const buffer = shapeImage.toBuffer()
          await shapeImage.toFile(tmpPath)
          return buffer
        }
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
