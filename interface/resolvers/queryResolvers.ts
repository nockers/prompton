import { ApolloServerErrorCode } from "@apollo/server/errors"
import { GraphQLError } from "graphql"
import db from "db"
import {
  QueryLabelArgs,
  QueryLabelsArgs,
  QueryUserArgs,
  QueryWorkArgs,
  QueryWorksArgs,
} from "interface/__generated__/node"

export const QueryResolvers = {
  labels(_: unknown, args: Partial<QueryLabelsArgs>) {
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
  works(_: unknown, args: Partial<QueryWorksArgs>) {
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
  work(_: unknown, args: Partial<QueryWorkArgs>) {
    return db.post.findUnique({ where: { id: args.id } })
  },
  user(_: unknown, args: Partial<QueryUserArgs>) {
    return db.user.findUnique({ where: { id: args.id } })
  },
}
