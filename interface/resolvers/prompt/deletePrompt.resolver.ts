import { ApolloServerErrorCode } from "@apollo/server/errors"
import { GraphQLError } from "graphql"
import db from "db"
import type {
  MutationDeletePromptArgs,
  RequireFields,
  Resolver,
} from "interface/__generated__/node"
import type { ApolloContext } from "types"

type Resolvers = Resolver<
  unknown,
  unknown,
  ApolloContext,
  RequireFields<MutationDeletePromptArgs, "input">
>

export const deletePromptResolver: Resolvers = async (_, args, ctx) => {
  if (ctx.currentUser === null) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  await db.prompt.update({
    where: { id: args.input.promptId },
    data: { isDeleted: true },
  })

  return db.prompt.findUnique({ where: { id: args.input.promptId } })
}
