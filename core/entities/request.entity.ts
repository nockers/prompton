import { z } from "zod"
import { Id } from "core/valueObjects"

const zProps = z.object({
  id: z.instanceof(Id),
  userId: z.instanceof(Id),
  creatorId: z.instanceof(Id),
  title: z.string().nullable(),
  isAccepted: z.boolean(),
  isRejected: z.boolean(),
  isCompleted: z.boolean(),
  isCanceled: z.boolean(),
  isCanceledBySystem: z.boolean(),
  isCanceledByCreator: z.boolean(),
  isTimeout: z.boolean(),
  commission: z.number(),
  fee: z.number(),
  note: z.string().nullable(),
  fileIds: z.array(z.instanceof(Id)),
  deliverableIds: z.array(z.instanceof(Id)),
  planId: z.instanceof(Id),
  folderId: z.instanceof(Id).nullable(),
  postIds: z.array(z.instanceof(Id)),
  paymentId: z.instanceof(Id).nullable(),
})

type Props = z.infer<typeof zProps>

/**
 * リクエスト
 */
export class RequestEntity implements Props {
  /**
   * ID
   */
  readonly id!: Props["id"]

  /**
   * ユーザのID
   */
  readonly userId!: Props["userId"]

  /**
   * タイトル
   */
  readonly title!: Props["title"]

  /**
   * 依頼先のユーザのID
   */
  readonly creatorId!: Props["creatorId"]

  /**
   * 依頼が受け入れられたかどうか
   */
  readonly isAccepted!: Props["isAccepted"]

  /**
   * 拒否されたかどうか
   */
  readonly isRejected!: Props["isRejected"]

  /**
   * 依頼が完了したかどうか
   */
  readonly isCompleted!: Props["isCompleted"]

  readonly isCanceled!: Props["isCanceled"]

  readonly isCanceledBySystem!: Props["isCanceledBySystem"]

  readonly isCanceledByCreator!: Props["isCanceledByCreator"]

  readonly isTimeout!: Props["isTimeout"]

  /**
   * 関連するプラン
   */
  readonly planId!: Props["planId"]

  /**
   * 値段
   */
  readonly fee!: Props["fee"]

  /**
   * 手数料
   */
  readonly commission!: Props["commission"]

  /**
   * ノート
   */
  readonly note!: Props["note"]

  /**
   * 依頼に使用するファイルのID
   */
  readonly fileIds!: Props["fileIds"]

  /**
   * 納品物のID
   */
  readonly deliverableIds!: Props["deliverableIds"]

  /**
   * 関連するフォルダ
   */
  readonly folderId!: Props["folderId"]

  readonly postIds!: Props["postIds"]

  readonly paymentId!: Props["paymentId"]

  constructor(public props: z.infer<typeof zProps>) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }
}
