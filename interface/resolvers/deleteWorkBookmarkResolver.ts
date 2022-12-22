import { ApolloServerErrorCode } from "@apollo/server/errors"
import { GraphQLError } from "graphql"
import { container } from "tsyringe"
import db from "db"
import type {
  MutationDeleteWorkBookmarkArgs,
  RequireFields,
} from "interface/__generated__/node"
import { DeletePostBookmarkCommand } from "service"
import type { ApolloContext } from "types"

export const deleteWorkBookmarkResolver = async (
  _: unknown,
  args: RequireFields<MutationDeleteWorkBookmarkArgs, "input">,
  ctx: ApolloContext,
) => {
  if (ctx.currentUser === null) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  const command = container.resolve(DeletePostBookmarkCommand)

  const output = await command.execute({
    userId: ctx.currentUser.uid,
    postId: args.input.workId,
  })

  if (output instanceof Error) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  return db.post.findUnique({ where: { id: args.input.workId } })
}
