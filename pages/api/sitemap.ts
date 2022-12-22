import "reflect-metadata"
import type { NextApiHandler } from "next"
import db from "db"
import { Env } from "infrastructure/env"

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
      return `${Env.appURL}/works/${post.id}`
    })

    const labelURLs = labels.map((label) => {
      return `${Env.appURL}/labels/${label.name}`
    })

    const userURLs = users.map((user) => {
      return `${Env.appURL}/${user.id}`
    })

    const text = [Env.appURL, ...workURLs, ...labelURLs, ...userURLs].join("\n")

    resp.end(text)
  } catch (error) {
    resp.status(500).end()
  }
}

export default apiHandler
