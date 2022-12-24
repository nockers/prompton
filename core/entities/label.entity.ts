import { z } from "zod"
import { Id } from "core/valueObjects"

const zProps = z.object({
  id: z.instanceof(Id),
  name: z.string(),
  nameJA: z.string().nullable(),
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

  /**
   * 名前（日本語）
   */
  readonly nameJA!: Props["nameJA"]

  constructor(public props: Props) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }
}
