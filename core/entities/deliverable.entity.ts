import { z } from "zod"
import { Id } from "core/valueObjects"

const zProps = z.object({
  id: z.instanceof(Id),
  name: z.string(),
  description: z.string(),
  userId: z.instanceof(Id),
  fileId: z.instanceof(Id),
  requestId: z.instanceof(Id),
  postId: z.instanceof(Id).nullable(),
})

type Props = z.infer<typeof zProps>

/**
 * 成果物
 */
export class DeliverableEntity implements Props {
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
   * ファイルのID
   */
  readonly fileId!: Props["fileId"]

  /**
   * ファイルのID
   */
  readonly requestId!: Props["requestId"]

  readonly postId!: Props["postId"]

  constructor(public props: z.infer<typeof zProps>) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }
}
