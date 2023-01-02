import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { Id } from "core"
import { Env, PaymentAdapter, UserRepository } from "infrastructure"

type Props = {
  userId: string
  requestRecipientId: string | null
}

@injectable()
export class CreatePaymentMethodCommand {
  constructor(
    private userRepository: UserRepository,
    private stripeAdapter: PaymentAdapter,
  ) {}

  async execute(props: Props) {
    try {
      const user = await this.userRepository.find(new Id(props.userId))

      if (user instanceof Error) {
        return new Error()
      }

      if (user === null) {
        return new Error()
      }

      const result = await this.stripeAdapter.updateCustomer({
        userId: user.id,
        email: user.email,
      })

      if (result instanceof Error) {
        return new Error()
      }

      const pageURL =
        props.requestRecipientId !== null
          ? `${Env.appURL}/${props.requestRecipientId}/requests/new`
          : `${Env.appURL}/viewer/payments`

      const session = await this.stripeAdapter.createPaymentMethod({
        userId: user.id,
        pageURL: pageURL,
      })

      if (session instanceof Error) {
        return new Error()
      }

      return session
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
