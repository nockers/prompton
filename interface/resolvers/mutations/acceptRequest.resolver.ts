import { ApolloServerErrorCode } from "@apollo/server/errors"
import { GraphQLError } from "graphql"
import { container } from "tsyringe"
import db from "db"
import type {
  MutationAcceptRequestArgs,
  RequireFields,
  Resolver,
} from "interface/__generated__/node"
import { markRequestAsAcceptedCommand } from "service"
import type { ApolloContext } from "types"

type Resolvers = Resolver<
  unknown,
  unknown,
  ApolloContext,
  RequireFields<MutationAcceptRequestArgs, "input">
>

export const acceptRequestResolver: Resolvers = async (_, args, ctx) => {
  if (ctx.currentUser === null) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  const command = container.resolve(markRequestAsAcceptedCommand)

  const event = await command.execute({
    userId: ctx.currentUser.uid,
    requestId: args.input.requestId,
  })

  if (event instanceof Error) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  return await db.request.findUnique({ where: { id: args.input.requestId } })
}
