import { ApolloServerErrorCode } from "@apollo/server/errors"
import { GraphQLError } from "graphql"
import db from "db"
import {
  PostEdge,
  QueryResolvers,
  UserNode,
} from "interface/__generated__/node"

export const userResolver: QueryResolvers["user"] = async (_, args) => {
  const user = await db.user.findUnique({
    where: { id: args.id },
  })

  if (user === null) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  const posts = await db.post.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  })

  const postEdges = posts.map((post): PostEdge => {
    return {
      cursor: "",
      node: {
        id: post.id,
        createdAt: Math.floor(post.createdAt.getTime() / 1000),
        fileId: post.fileId,
        title: post.title,
        likeCount: 0,
        user: {
          id: user.id,
          name: user.name,
          createdAt: Math.floor(user.createdAt.getTime() / 1000),
          avatarImageURL: user.avatarImageURL ?? null,
          avatarImageId: user.avatarFileId ?? null,
          headerImageId: null,
          biography: "",
          posts: {
            totalCount: 0,
            edges: [],
            pageInfo: {
              endCursor: null,
              hasNextPage: false,
            },
          },
        },
      },
    }
  })

  const postsConnection = {
    totalCount: posts.length,
    edges: postEdges,
    pageInfo: {
      endCursor: "",
      hasNextPage: false,
    },
  }

  const node: UserNode = {
    id: user.id,
    name: user.name,
    createdAt: Math.floor(user.createdAt.getTime() / 1000),
    avatarImageURL: user.avatarImageURL ?? null,
    avatarImageId: user.avatarFileId ?? null,
    headerImageId: null,
    biography: "",
    posts: postsConnection,
  }

  return node
}
