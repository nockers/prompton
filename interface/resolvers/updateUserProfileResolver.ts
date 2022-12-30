import { ApolloServerErrorCode } from "@apollo/server/errors"
import { GraphQLError } from "graphql"
import { container } from "tsyringe"
import db from "db"
import type {
  MutationUpdateUserProfileArgs,
  RequireFields,
  Resolver,
} from "interface/__generated__/node"
import { UpdateUserProfileCommand } from "service"
import type { ApolloContext } from "types"

type Resolvers = Resolver<
  unknown,
  unknown,
  ApolloContext,
  RequireFields<MutationUpdateUserProfileArgs, "input">
>

export const updateUserProfileResolver: Resolvers = async (_, args, ctx) => {
  if (ctx.currentUser === null) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  const command = container.resolve(UpdateUserProfileCommand)

  const output = await command.execute({
    userId: ctx.currentUser.uid,
    userAvatarFileId: args.input.avatarFileId,
    userName: args.input.name,
    userBiography: args.input.biography,
  })

  if (output instanceof Error) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  return db.user.findUnique({ where: { id: ctx.currentUser.uid } })
}
