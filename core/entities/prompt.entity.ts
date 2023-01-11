import { z } from "zod"
import { Id } from "core/valueObjects"

const zProps = z.object({
  id: z.instanceof(Id),
  userId: z.instanceof(Id),
  text: z.string(),
  texts: z.array(z.string()),
  title: z.string(),
  description: z.string().nullable(),
  isPublic: z.boolean(),
  isNsfw: z.boolean(),
  categorySlug: z.string().nullable(),
  isDeleted: z.boolean(),
  isSingle: z.boolean(),
  isBase: z.boolean(),
})

type Props = z.infer<typeof zProps>

/**
 * 投稿
 */
export class PromptEntity implements Props {
  /**
   * ID
   */
  readonly id!: Props["id"]

  readonly userId!: Props["userId"]

  readonly text!: Props["text"]

  readonly texts!: Props["texts"]

  /**
   * タイトル
   */
  readonly title!: Props["title"]

  /**
   * 説明
   */
  readonly description!: Props["description"]

  readonly isPublic!: Props["isPublic"]

  readonly isNsfw!: Props["isNsfw"]

  readonly categorySlug!: Props["categorySlug"]

  readonly isDeleted!: Props["isDeleted"]

  readonly isSingle!: Props["isSingle"]

  readonly isBase!: Props["isBase"]

  constructor(public props: Props) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }
}
