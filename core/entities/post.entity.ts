import { z } from "zod"
import { Id } from "core/valueObjects"

const zProps = z.object({
  id: z.instanceof(Id),
  title: z.string().nullable(),
  fileId: z.instanceof(Id),
  userId: z.instanceof(Id),
})

type Props = z.infer<typeof zProps>

/**
 * 投稿
 */
export class PostEntity {
  /**
   * ID
   */
  readonly id!: Props["id"]

  /**
   * タイトル
   */
  readonly title!: Props["title"]

  /**
   * ファイルID
   */
  readonly fileId!: Props["fileId"]

  /**
   * ユーザーID
   */
  readonly userId!: Props["userId"]

  constructor(public props: Props) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }
}
