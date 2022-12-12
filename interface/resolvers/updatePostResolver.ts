import { ApolloServerErrorCode } from "@apollo/server/errors"
import { GraphQLError } from "graphql"
import { container } from "tsyringe"
import db from "db"
import {
  MutationUpdatePostArgs,
  RequireFields,
} from "interface/__generated__/node"
import { UpdatePostCommand } from "service"
import { Context } from "types"

export const updatePostResolver = async (
  _: unknown,
  args: RequireFields<MutationUpdatePostArgs, "input">,
  ctx: Context,
) => {
  if (ctx.currentUser === null) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  const command = container.resolve(UpdatePostCommand)

  const output = await command.execute({
    userId: ctx.currentUser.uid,
    postId: args.input.postId,
    postPrompt: args.input.prompt,
  })

  if (output instanceof Error) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  return db.post.findUnique({
    where: { id: args.input.postId },
  })
}
