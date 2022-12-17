import { ApolloServerErrorCode } from "@apollo/server/errors"
import { GraphQLError } from "graphql"
import { container } from "tsyringe"
import db from "db"
import {
  MutationCreateWorkArgs,
  RequireFields,
} from "interface/__generated__/node"
import { CreatePostCommand } from "service"
import { Context } from "types"

export const createWorkResolver = async (
  _: unknown,
  args: RequireFields<MutationCreateWorkArgs, "input">,
  ctx: Context,
) => {
  if (ctx.currentUser === null) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  const command = container.resolve(CreatePostCommand)

  const output = await command.execute({
    userId: ctx.currentUser.uid,
    postFileId: args.input.fileId,
  })

  if (output instanceof Error) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  return db.post.findUnique({
    where: { id: output.postId },
  })
}
