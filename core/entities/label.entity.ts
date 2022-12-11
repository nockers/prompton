import { z } from "zod"
import { Id } from "core/valueObjects"

const zProps = z.object({
  id: z.instanceof(Id),
  name: z.string(),
})

type Props = z.infer<typeof zProps>

/**
 * ラベル
 */
export class LabelEntity {
  /**
   * ID
   */
  readonly id!: Props["id"]

  /**
   * 名前
   */
  readonly name!: Props["name"]

  constructor(public props: Props) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }
}
