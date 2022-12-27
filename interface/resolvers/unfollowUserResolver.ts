import { ApolloServerErrorCode } from "@apollo/server/errors"
import { GraphQLError } from "graphql"
import { container } from "tsyringe"
import db from "db"
import type {
  MutationUnfollowUserArgs,
  RequireFields,
} from "interface/__generated__/node"
import { DeleteFriendshipCommand } from "service"
import type { ApolloContext } from "types"

export const unfollowUserResolver = async (
  _: unknown,
  args: RequireFields<MutationUnfollowUserArgs, "input">,
  ctx: ApolloContext,
) => {
  if (ctx.currentUser === null) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  const command = container.resolve(DeleteFriendshipCommand)

  const output = await command.execute({
    followeeId: args.input.userId,
    followerId: ctx.currentUser.uid,
  })

  if (output instanceof Error) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  return db.user.findUnique({ where: { id: args.input.userId } })
}
