import { injectable } from "tsyringe"
import type { RequestEvent } from "core"
import { RequestEntity, RequestCreatedEvent } from "core"
import { RequestRepository } from "infrastructure/repositories"

@injectable()
export class RequestEventStore {
  constructor(private repository: RequestRepository) {}

  execute(event: RequestEvent) {
    if (event instanceof RequestCreatedEvent) {
      return this.created(event)
    }

    return null
  }

  async created(event: RequestCreatedEvent) {
    const draftRequest = new RequestEntity({
      id: event.requestId,
      deliverableIds: [],
      fileIds: event.fileIs,
      folderId: event.folderId,
      isAccepted: false,
      isCompleted: false,
      isCanceled: false,
      isRejected: false,
      creatorId: event.creatorId,
      isCanceledByCreator: false,
      isCanceledBySystem: false,
      isTimeout: false,
      note: event.note,
      paymentId: event.paymentId,
      commission: event.commission,
      planId: event.planId,
      postIds: [],
      price: event.price,
      title: event.title,
      userId: event.userId,
    })

    return this.repository.persist(draftRequest)
  }
}
