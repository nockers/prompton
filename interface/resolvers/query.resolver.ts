import { ApolloServerErrorCode } from "@apollo/server/errors"
import { AuthorizationError } from "blitz"
import { GraphQLError } from "graphql"
import db from "db"
import type {
  Query,
  QueryLabelArgs,
  QueryLabelsArgs,
  QueryRequestArgs,
  QueryUserArgs,
  QueryUsersArgs,
  QueryWorkArgs,
  QueryWorksArgs,
} from "interface/__generated__/node"
import type { PrismaResolvers } from "interface/resolvers/types/prismaResolvers"

type Resolvers = PrismaResolvers<Query, {}>

export const QueryResolvers: Resolvers = {
  labels(_: unknown, args: Partial<QueryLabelsArgs>) {
    const take = args.limit || 9 * 4
    const skip = args.offset || 0
    if (typeof args.where?.search === "string") {
      return db.label.findMany({
        orderBy: { posts: { _count: "desc" } },
        take: 16,
        where: {
          isDeleted: false,
          OR: [
            { name: { contains: args.where.search } },
            { nameJA: { contains: args.where.search } },
          ],
        },
      })
    }
    return db.label.findMany({
      orderBy: { posts: { _count: "desc" } },
      take: take,
      skip: skip,
      where: { isDeleted: false },
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
    const take = args.limit || 9 * 4
    const skip = args.offset || 0
    if (typeof args.where?.search === "string") {
      return db.post.findMany({
        orderBy: { createdAt: "desc" },
        take: take,
        skip: skip,
        where: {
          isDeleted: false,
          OR: [
            {
              labels: { some: { name: { search: args.where.search } } },
            },
            {
              title: { search: args.where.search },
            },
            {
              prompt: { search: args.where.search },
            },
          ],
        },
      })
    }
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
  work(_: unknown, args: QueryWorkArgs) {
    return db.post.findFirst({
      where: {
        id: args.id,
        isDeleted: false,
      },
    })
  },
  user(_: unknown, args: QueryUserArgs) {
    return db.user.findUnique({ where: { id: args.id } })
  },
  async users(_: unknown, args: QueryUsersArgs, context) {
    const take = args.limit || 9 * 4
    const skip = args.offset || 0
    if (typeof args.where?.search === "string") {
      return db.user.findMany({
        orderBy: { createdAt: "desc" },
        take: take,
        skip: skip,
        where: {
          isDeleted: false,
          id: { not: context.currentUser?.uid },
          OR: [
            {
              name: { search: args.where.search },
            },
            {
              id: { search: args.where.search },
            },
          ],
        },
      })
    }
    return db.user.findMany({
      orderBy: {
        posts: { _count: "desc" },
      },
      take: take,
      skip: skip,
      where: {
        isDeleted: false,
        id: { not: context.currentUser?.uid },
      },
    })
  },
  plan() {
    return null
  },
  plans() {
    return []
  },
  async request(_: unknown, args: QueryRequestArgs, context) {
    return db.request.findFirst({
      where: {
        OR: [
          { id: args.id, isPublic: true },
          { id: args.id, senderId: context.currentUser?.uid },
          { id: args.id, recipientId: context.currentUser?.uid },
        ],
      },
    })
  },
  requests() {
    return db.request.findFirst({
      orderBy: { createdAt: "desc" },
    })
  },
  viewer(_: unknown, __: unknown, context) {
    if (context.currentUser === null) {
      throw new GraphQLError(AuthorizationError.name, {
        extensions: { code: ApolloServerErrorCode.BAD_REQUEST },
      })
    }
    return {}
  },
}
