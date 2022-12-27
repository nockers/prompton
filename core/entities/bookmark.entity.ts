import { z } from "zod"
import { Id } from "core/valueObjects"

const zProps = z.object({
  id: z.instanceof(Id),
  userId: z.instanceof(Id),
  postId: z.instanceof(Id).nullable(),
})

/**
 * ブックマーク
 */
export class BookmarkEntity {
  /**
   * ID
   */
  readonly id!: Id

  /**
   * ブックマークした投稿のID
   */
  readonly postId!: Id

  /**
   * ブックマークしたユーザのID
   */
  readonly userId!: Id

  constructor(public props: z.infer<typeof zProps>) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }
}
