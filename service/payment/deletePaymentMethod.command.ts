import { captureException } from "@sentry/node"
import { injectable } from "tsyringe"
import { Id } from "core"
import { PaymentAdapter, UserRepository } from "infrastructure"

type Props = {
  userId: string
}

@injectable()
export class DeletePaymentMethodCommand {
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

      const result = await this.stripeAdapter.deletePaymentMethod(user.id)

      if (result instanceof Error) {
        return new Error()
      }

      return null
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
