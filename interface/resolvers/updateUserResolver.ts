import { ApolloServerErrorCode } from "@apollo/server/errors"
import { getAuth } from "firebase-admin/auth"
import { GraphQLError } from "graphql"
import { container } from "tsyringe"
import { MutationResolvers } from "interface/__generated__/node"
import { UpdateUserCommand } from "service"

export const updateUserResolver: MutationResolvers["updateUser"] = async (
  _,
  args,
  ctx,
) => {
  if (ctx.currentUser === null) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  const command = container.resolve(UpdateUserCommand)

  const output = await command.execute({
    userId: ctx.currentUser.uid,
    userAvatarFileId: args.input.avatarFileId ?? null,
    userName: args.input.name,
  })

  if (output instanceof Error) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  await getAuth().updateUser(ctx.currentUser.uid, {
    displayName: args.input.name,
  })

  return true
}
