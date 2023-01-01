import { z } from "zod"
import { Id } from "core/valueObjects"

const zProps = z.object({
  id: z.instanceof(Id),
  recipientId: z.instanceof(Id),
  senderId: z.instanceof(Id),
  title: z.string().nullable(),
  isAccepted: z.boolean(),
  isRejected: z.boolean(),
  isCompleted: z.boolean(),
  isCanceled: z.boolean(),
  isCanceledBySender: z.boolean(),
  isCanceledByRecipient: z.boolean(),
  isTimeout: z.boolean(),
  commission: z.number(),
  fee: z.number(),
  note: z.string().nullable(),
  fileIds: z.array(z.instanceof(Id)),
  deliverableIds: z.array(z.instanceof(Id)),
  planId: z.instanceof(Id).nullable(),
  folderId: z.instanceof(Id).nullable(),
  postIds: z.array(z.instanceof(Id)),
  paymentIds: z.array(z.instanceof(Id)),
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
   * タイトル
   */
  readonly title!: Props["title"]

  /**
   * 依頼先のユーザのID
   */
  readonly recipientId!: Props["recipientId"]

  /**
   * 依頼先のユーザのID
   */
  readonly senderId!: Props["senderId"]

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

  /**
   * 送り側によるキャンセルが発生したかどうか
   */
  readonly isCanceledBySender!: Props["isCanceledBySender"]

  /**
   * 受け取り側によるキャンセルが発生したかどうか
   */
  readonly isCanceledByRecipient!: Props["isCanceledByRecipient"]

  /**
   * 時間切れかどうか
   */
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

  readonly paymentIds!: Props["paymentIds"]

  constructor(public props: z.infer<typeof zProps>) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }

  markAsAccepted() {
    return new RequestEntity({
      ...this.props,
      isAccepted: true,
    })
  }

  markAsCanceled() {
    return new RequestEntity({
      ...this.props,
      isCanceled: true,
    })
  }

  markAsCanceledByRecipient() {
    return new RequestEntity({
      ...this.props,
      isCanceledByRecipient: true,
    })
  }

  markAsCanceledBySender() {
    return new RequestEntity({
      ...this.props,
      isCanceledBySender: true,
    })
  }

  markAsCompleted() {
    return new RequestEntity({
      ...this.props,
      isCompleted: true,
    })
  }

  markAsRejected() {
    return new RequestEntity({
      ...this.props,
      isRejected: true,
    })
  }
}
