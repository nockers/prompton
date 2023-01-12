import { ApolloServerErrorCode } from "@apollo/server/errors"
import { GraphQLError } from "graphql"
import { container } from "tsyringe"
import db from "db"
import type {
  MutationCreatePromptWorkArgs,
  RequireFields,
  Resolver,
} from "interface/__generated__/node"
import { CreatePostCommand } from "service"
import type { ApolloContext } from "types"

type Resolvers = Resolver<
  unknown,
  unknown,
  ApolloContext,
  RequireFields<MutationCreatePromptWorkArgs, "input">
>

export const createPromptWorkResolver: Resolvers = async (_, args, ctx) => {
  if (ctx.currentUser === null) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  const command = container.resolve(CreatePostCommand)

  const event = await command.execute({
    userId: ctx.currentUser.uid,
    postFileId: args.input.fileId,
    postFileName: args.input.fileName,
    isPublic: false,
    requestId: null,
  })

  if (event instanceof Error) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  return db.prompt.findUnique({ where: { id: args.input.promptId } })
}
