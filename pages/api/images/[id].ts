import "reflect-metadata"
import { NextApiHandler } from "next"
import { container } from "tsyringe"
import { ReadImageQuery } from "service"

const apiHandler: NextApiHandler = async (req, resp) => {
  try {
    if (typeof req.query.w !== "string") {
      return resp.status(500).end()
    }

    if (typeof req.query.id !== "string") {
      return resp.status(500).end()
    }

    if (typeof req.query.h !== "undefined" && typeof req.query.h !== "string") {
      return resp.status(500).end()
    }

    const fileId = req.query.id

    const readFileQuery = container.resolve(ReadImageQuery)

    const width = parseInt(req.query.w)

    const height =
      typeof req.query.h === "string" ? parseInt(req.query.h) : null

    const quality = typeof req.query.q == "string" ? parseInt(req.query.q) : 100

    const file = await readFileQuery.execute({ fileId, width, height, quality })

    if (file instanceof Error) {
      return resp.status(500).end()
    }

    resp.setHeader("Cache-control", "public, max-age=86400")

    resp.end(file)
  } catch (error) {
    resp.end()
  }
}

export default apiHandler
