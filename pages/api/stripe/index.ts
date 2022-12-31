import type { NextApiHandler } from "next"

const apiStripe: NextApiHandler = async (req, resp) => {
  if (req.method !== "POST") {
    resp.status(405).json({})
    return
  }

  try {
    console.log(req.body)

    resp.json({})
  } catch (error) {
    resp.status(500).json({})
  }
}

export default apiStripe
