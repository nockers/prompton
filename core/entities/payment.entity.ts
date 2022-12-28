import { z } from "zod"
import { Id } from "core/valueObjects"

const zProps = z.object({
  id: z.instanceof(Id),
  userId: z.instanceof(Id),
  purpose: z.string(),
  requestId: z.instanceof(Id).nullable(),
  amount: z.number(),
  isError: z.boolean(),
  transactionId: z.string().nullable(),
})

type Props = z.infer<typeof zProps>

/**
 * 決済
 */
export class PaymentEntity implements Props {
  /**
   * ID
   */
  readonly id!: Props["id"]

  /**
   * ユーザのID
   */
  readonly userId!: Props["userId"]

  /**
   * 決済の種類
   */
  readonly purpose!: Props["purpose"]

  /**
   * 関連するリクエスト
   */
  readonly requestId!: Props["requestId"]

  /**
   * 金額
   */
  readonly amount!: Props["amount"]

  readonly isError!: Props["isError"]

  readonly transactionId!: Props["transactionId"]

  constructor(public props: z.infer<typeof zProps>) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }
}
