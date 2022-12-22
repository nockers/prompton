import "reflect-metadata"
import { tmpdir } from "os"
import { getApps, initializeApp } from "firebase-admin/app"
import { getStorage } from "firebase-admin/storage"
import type { NextApiHandler } from "next"
import sharp from "sharp"
import { Env } from "infrastructure/env"

const apiHandler: NextApiHandler = async (req, resp) => {
  try {
    if (getApps().length === 0) {
      initializeApp({
        credential: Env.googleCredential,
        storageBucket: Env.googleStorageBucket,
      })
    }

    if (typeof req.query.id !== "string") {
      resp.status(500).end()
      return
    }

    const fileId = req.query.id

    const width = typeof req.query.w === "string" ? parseInt(req.query.w) : 512

    const height =
      typeof req.query.h === "string" ? parseInt(req.query.h) : null

    const quality = typeof req.query.q == "string" ? parseInt(req.query.q) : 100

    resp.setHeader("Cache-control", "public, max-age=86400")

    resp.setHeader("Content-Type", "image/png")

    const tmpPath = `${tmpdir()}/${fileId}.${width}.${height}.${quality}`

    try {
      const buffer = await sharp(tmpPath).toBuffer()
      resp.end(buffer)
      return
    } catch (error) {
      error
    }

    const bucket = getStorage().bucket()

    const [file] = await bucket.file(fileId).download({ validation: false })

    const resizedImage = sharp(file).resize({
      width: width,
      height: height ?? undefined,
      fit: height !== null ? sharp.fit.cover : undefined,
    })

    const shapeImage = resizedImage.png({ quality })

    const buffer = await shapeImage.toBuffer()

    await shapeImage.toFile(tmpPath)

    resp.end(buffer)
  } catch (error) {
    resp.status(500).end()
  }
}

export default apiHandler
