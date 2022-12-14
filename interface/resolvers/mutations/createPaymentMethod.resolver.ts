import { ApolloServerErrorCode } from "@apollo/server/errors"
import { GraphQLError } from "graphql"
import { container } from "tsyringe"
import type {
  MutationCreatePaymentMethodArgs,
  RequireFields,
} from "interface/__generated__/node"
import { CreatePaymentMethodCommand } from "service"
import type { ApolloContext } from "types"

export const createPaymentMethodResolver = async (
  _: unknown,
  args: RequireFields<MutationCreatePaymentMethodArgs, "input">,
  ctx: ApolloContext,
) => {
  if (ctx.currentUser === null) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  const command = container.resolve(CreatePaymentMethodCommand)

  const output = await command.execute({
    userId: ctx.currentUser.uid,
    requestRecipientId: args.input.requestRecipientId,
  })

  if (output instanceof Error) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  return {
    checkoutURL: output.url,
  }
}
