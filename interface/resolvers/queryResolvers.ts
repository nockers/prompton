import { ApolloServerErrorCode } from "@apollo/server/errors"
import { GraphQLError } from "graphql"
import db from "db"
import type {
  QueryLabelArgs,
  QueryUserArgs,
  QueryWorkArgs,
  QueryWorksArgs,
} from "interface/__generated__/node"

export const QueryResolvers = {
  labels() {
    return db.label.findMany({
      orderBy: { posts: { _count: "desc" } },
      take: 16,
    })
  },
  label(_: unknown, args: Partial<QueryLabelArgs>) {
    if (typeof args.name === "undefined") {
      return db.label.findUnique({ where: { name: args.name } })
    }
    if (typeof args.id === "undefined") {
      return db.label.findUnique({ where: { id: args.id } })
    }
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.BAD_REQUEST },
    })
  },
  async works(_: unknown, args: Partial<QueryWorksArgs>) {
    const take = args.limit || 2 * 9
    const skip = args.offset || 0
    if (typeof args.where?.userId === "string") {
      return db.post.findMany({
        orderBy: { createdAt: "desc" },
        take: take,
        skip: skip,
        where: {
          isDeleted: false,
          userId: args.where.userId!,
        },
      })
    }
    if (typeof args.where?.labelName === "string") {
      return db.post.findMany({
        orderBy: { createdAt: "desc" },
        take: take,
        skip: skip,
        where: {
          isDeleted: false,
          labels: { some: { name: args.where.labelName! } },
        },
      })
    }
    if (typeof args.where?.color === "string") {
      return db.post.findMany({
        orderBy: { createdAt: "desc" },
        take: take,
        skip: skip,
        where: {
          isDeleted: false,
          webColors: { has: `#${args.where?.color}` },
        },
      })
    }
    return db.post.findMany({
      orderBy: { createdAt: "desc" },
      take: take,
      skip: skip,
      where: { isDeleted: false },
    })
  },
  work(_: unknown, args: Partial<QueryWorkArgs>) {
    return db.post.findUnique({ where: { id: args.id } })
  },
  user(_: unknown, args: Partial<QueryUserArgs>) {
    return db.user.findUnique({ where: { id: args.id } })
  },
}
