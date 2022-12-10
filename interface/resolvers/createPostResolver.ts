import { ApolloServerErrorCode } from "@apollo/server/errors"
import { GraphQLError } from "graphql"
import { container } from "tsyringe"
import db from "db"
import { MutationResolvers, PostNode } from "interface/__generated__/node"
import { CreatePostCommand } from "service"

export const createPostResolver: MutationResolvers["createPost"] = async (
  _,
  args,
  ctx,
) => {
  if (ctx.currentUser === null) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  const command = container.resolve(CreatePostCommand)

  const output = await command.execute({
    userId: ctx.currentUser.uid,
    postFileId: args.input.fileId,
  })

  if (output instanceof Error) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  const post = await db.post.findUnique({
    where: { id: output.userId },
    include: { user: true },
  })

  if (post === null) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  const node: PostNode = {
    id: post.id,
    createdAt: Math.floor(post.createdAt.getTime() / 1000),
    fileId: post.fileId,
    title: post.title,
    likeCount: 0,
    user: {
      id: post.user.id,
      name: post.user.name,
      avatarImageURL: post.user.avatarImageURL ?? null,
      posts: {
        totalCount: 0,
        edges: [],
        pageInfo: {
          endCursor: null,
          hasNextPage: false,
        },
      },
    },
  }

  return node
}
