import { z } from "zod"
import { Id } from "core/valueObjects"

const zProps = z.object({
  id: z.instanceof(Id),
  name: z.string().nullable(),
})

type Props = z.infer<typeof zProps>

/**
 * 投稿
 */
export class TagEntity {
  /**
   * ID
   */
  readonly id!: Props["id"]

  /**
   * タイトル
   */
  readonly name!: Props["name"]

  constructor(public props: Props) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }
}
