import "reflect-metadata"
import type { NextApiHandler } from "next"
import db from "db"

const apiHandler: NextApiHandler = async (req, resp) => {
  try {
    const posts = await db.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 2000,
    })

    const labels = await db.label.findMany({
      orderBy: { posts: { _count: "desc" } },
      take: 2000,
    })

    const users = await db.user.findMany({
      orderBy: { posts: { _count: "desc" } },
      take: 2000,
    })

    const workURLs = posts.map((post) => {
      return `${process.env.NEXT_PUBLIC_APP_URL}/works/${post.id}`
    })

    const labelURLs = labels.map((label) => {
      return `${process.env.NEXT_PUBLIC_APP_URL}/labels/${label.id}`
    })

    const userURLs = users.map((user) => {
      return `${process.env.NEXT_PUBLIC_APP_URL}/${user.id}`
    })

    const text = [
      process.env.NEXT_PUBLIC_APP_URL,
      ...workURLs,
      ...labelURLs,
      ...userURLs,
    ].join("\n")

    resp.end(text)
  } catch (error) {
    resp.status(500).end()
  }
}

export default apiHandler
