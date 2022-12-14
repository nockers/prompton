import { ApolloServerErrorCode } from "@apollo/server/errors"
import { GraphQLError } from "graphql"
import { container } from "tsyringe"
import db from "db"
import type {
  MutationCreateDeliverableArgs,
  RequireFields,
  Resolver,
} from "interface/__generated__/node"
import { CreatePostCommand } from "service"
import type { ApolloContext } from "types"

type Resolvers = Resolver<
  unknown,
  unknown,
  ApolloContext,
  RequireFields<MutationCreateDeliverableArgs, "input">
>

export const createDeliverableResolver: Resolvers = async (_, args, ctx) => {
  if (ctx.currentUser === null) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  const command = container.resolve(CreatePostCommand)

  const event = await command.execute({
    userId: ctx.currentUser.uid,
    postFileId: args.input.fileId,
    postFileName: "",
    isPublic: false,
    requestId: args.input.requestId,
  })

  if (event instanceof Error) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  return db.post.findUnique({
    where: { id: event.postId.value },
  })
}
