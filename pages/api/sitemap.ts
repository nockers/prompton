import "reflect-metadata"
import type { NextApiHandler } from "next"

const apiHandler: NextApiHandler = async (req, resp) => {
  try {
    const text = ""

    resp.end(text)
  } catch (error) {
    resp.end()
  }
}

export default apiHandler
