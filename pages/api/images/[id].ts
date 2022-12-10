import "reflect-metadata"
import { NextApiHandler } from "next"
import { container } from "tsyringe"
import { ReadImageQuery } from "service"

const apiHandler: NextApiHandler = async (req, resp) => {
  try {
    if (typeof req.query.w !== "string" || typeof req.query.q !== "string") {
      return resp.status(500).end()
    }

    if (typeof req.query.id !== "string") {
      return resp.status(500).end()
    }

    const fileId = req.query.id

    const readFileQuery = container.resolve(ReadImageQuery)

    const width = parseInt(req.query.w)

    const quality = parseInt(req.query.q)

    const file = await readFileQuery.execute({ fileId, width, quality })

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
