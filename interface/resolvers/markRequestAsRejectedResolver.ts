import { ApolloServerErrorCode } from "@apollo/server/errors"
import { GraphQLError } from "graphql"
import type {
  MutationMarkRequestAsRejectedArgs,
  RequireFields,
  Resolver,
} from "interface/__generated__/node"
import type { ApolloContext } from "types"

type Resolvers = Resolver<
  unknown,
  unknown,
  ApolloContext,
  RequireFields<MutationMarkRequestAsRejectedArgs, "input">
>

export const markRequestAsRejectedResolver: Resolvers = async (
  _,
  args,
  ctx,
) => {
  if (ctx.currentUser === null) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  return null
}
