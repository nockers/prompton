import { z } from "zod"
import { Id } from "core/valueObjects"

const zProps = z.object({
  id: z.instanceof(Id),
  userId: z.instanceof(Id),
  name: z.string(),
  description: z.string(),
  price: z.number(),
})

type Props = z.infer<typeof zProps>

/**
 * 依頼のプラン
 */
export class PlanEntity implements Props {
  /**
   * ID
   */
  readonly id!: Props["id"]

  /**
   * 名前
   */
  readonly name!: Props["name"]

  /**
   * 説明
   */
  readonly description!: Props["description"]

  /**
   * ユーザのID
   */
  readonly userId!: Props["userId"]

  /**
   * 価格
   */
  readonly price!: Props["price"]

  constructor(public props: z.infer<typeof zProps>) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }
}
