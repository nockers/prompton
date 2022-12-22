import { ApolloServerErrorCode } from "@apollo/server/errors"
import { GraphQLError } from "graphql"
import { container } from "tsyringe"
import db from "db"
import type {
  MutationFollowUserArgs,
  RequireFields,
} from "interface/__generated__/node"
import { CreateFriendshipCommand } from "service"
import type { ApolloContext } from "types"

export const followUserResolver = async (
  _: unknown,
  args: RequireFields<MutationFollowUserArgs, "input">,
  ctx: ApolloContext,
) => {
  if (ctx.currentUser === null) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  const command = container.resolve(CreateFriendshipCommand)

  const output = await command.execute({
    followeeId: ctx.currentUser.uid,
    followerId: args.input.userId,
  })

  if (output instanceof Error) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  return db.user.findUnique({ where: { id: args.input.userId } })
}
