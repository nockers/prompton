import { z } from "zod"
import { Id } from "core/valueObjects"

const zProps = z.object({
  id: z.instanceof(Id),
  title: z.string().nullable(),
  description: z.string().nullable(),
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
  readonly title!: Props["title"]

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

  /**
   * 投稿のID
   */
  readonly postId!: Props["postId"]

  constructor(public props: z.infer<typeof zProps>) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }

  updateTitle(title: string) {
    return new DeliverableEntity({ ...this.props, title })
  }

  updateDescription(description: string) {
    return new DeliverableEntity({ ...this.props, description })
  }

  updatePostId(postId: Id) {
    return new DeliverableEntity({ ...this.props, postId })
  }
}
