import { z } from "zod"
import { PrototypeEvent } from "core/events/prototype.event"
import type { inferEventProps } from "core/types"
import { Id } from "core/valueObjects"

const zProps = z.object({
  paymentId: z.instanceof(Id),
  userId: z.instanceof(Id),
  requestId: z.instanceof(Id).nullable(),
  purpose: z.string(),
  amount: z.number(),
  isError: z.boolean(),
  transactionId: z.string().nullable(),
})

type Props = inferEventProps<typeof zProps>

export class PaymentCreatedEvent extends PrototypeEvent implements Props {
  static readonly type = "PAYMENT_CREATED" as const

  get type() {
    return PaymentCreatedEvent.type
  }

  readonly collectionId = "PAYMENTS" as const

  readonly paymentId!: Props["paymentId"]

  readonly userId!: Props["userId"]

  readonly requestId!: Props["requestId"]

  readonly purpose!: Props["purpose"]

  readonly amount!: Props["amount"]

  readonly isError!: Props["isError"]

  readonly transactionId!: Props["transactionId"]

  constructor(props: Props) {
    super({ ...props, documentId: props.paymentId })
    Object.assign(this, zProps.parse(props))
    Object.freeze(this)
  }
}
