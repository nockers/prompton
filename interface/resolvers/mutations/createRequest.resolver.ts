import { ApolloServerErrorCode } from "@apollo/server/errors"
import { GraphQLError } from "graphql"
import { container } from "tsyringe"
import db from "db"
import type {
  MutationCreateRequestArgs,
  RequireFields,
  Resolver,
} from "interface/__generated__/node"
import { CreateRequestCommand } from "service"
import type { ApolloContext } from "types"

type Resolvers = Resolver<
  unknown,
  unknown,
  ApolloContext,
  RequireFields<MutationCreateRequestArgs, "input">
>

export const createRequestResolver: Resolvers = async (_, args, ctx) => {
  if (ctx.currentUser === null) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  const command = container.resolve(CreateRequestCommand)

  const event = await command.execute({
    recipientId: args.input.recipientId,
    senderId: ctx.currentUser.uid,
    fee: args.input.fee,
    note: args.input.note,
    planId: args.input.planId,
  })

  if (event instanceof Error) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  return await db.request.findUnique({ where: { id: event.requestId.value } })
}
