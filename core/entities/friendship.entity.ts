import { z } from "zod"
import { Id } from "core/valueObjects"

const zProps = z.object({
  id: z.instanceof(Id),
  followeeId: z.instanceof(Id),
  followerId: z.instanceof(Id),
})

/**
 * フォロー関係
 */
export class FriendshipEntity {
  /**
   * ID
   */
  readonly id!: Id

  /**
   * フォローされているユーザのID
   */
  readonly followeeId!: Id

  /**
   * フォローしているユーザのID
   */
  readonly followerId!: Id

  constructor(public props: z.infer<typeof zProps>) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }
}
