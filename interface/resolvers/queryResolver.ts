import db from "db"
import {
  QueryLabelsArgs,
  QueryPostsArgs,
  QueryUserArgs,
} from "interface/__generated__/node"

export const QueryResolver = {
  labels(_: unknown, args: Partial<QueryLabelsArgs>) {
    return db.label.findMany({
      orderBy: { posts: { _count: "desc" } },
      take: 16,
    })
  },
  posts(_: unknown, args: Partial<QueryPostsArgs>) {
    if (typeof args.where?.labelName === "string") {
      return db.post.findMany({
        orderBy: { createdAt: "desc" },
        where: {
          isDeleted: false,
          labels: { some: { name: args.where?.labelName! } },
        },
      })
    }
    if (typeof args.where?.color === "string") {
      return db.post.findMany({
        orderBy: { createdAt: "desc" },
        where: {
          isDeleted: false,
          webColors: { has: `#${args.where?.color}` },
        },
      })
    }
    return db.post.findMany({
      orderBy: { createdAt: "desc" },
      where: { isDeleted: false },
    })
  },
  user(_: unknown, args: Partial<QueryUserArgs>) {
    return db.user.findUnique({
      where: { id: args.id },
    })
  },
}
