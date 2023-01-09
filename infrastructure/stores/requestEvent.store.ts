import { injectable } from "tsyringe"
import type { RequestEvent } from "core"
import {
  RequestMarkedAsAcceptedEvent,
  RequestMarkedAsCanceledByRecipientEvent,
  RequestMarkedAsCanceledBySenderEvent,
  RequestMarkedAsCanceledEvent,
  RequestMarkedAsCompletedEvent,
  RequestMarkedAsRejectedEvent,
  RequestEntity,
  RequestCreatedEvent,
} from "core"
import { RequestRepository } from "infrastructure/repositories"

@injectable()
export class RequestEventStore {
  constructor(private repository: RequestRepository) {}

  execute(event: RequestEvent) {
    if (event instanceof RequestCreatedEvent) {
      return this.created(event)
    }

    if (event instanceof RequestMarkedAsAcceptedEvent) {
      return this.markedAsAcceptedEvent(event)
    }

    if (event instanceof RequestMarkedAsCanceledEvent) {
      return this.markedAsCanceledEvent(event)
    }

    if (event instanceof RequestMarkedAsCanceledByRecipientEvent) {
      return this.markedAsCanceledByRecipientEvent(event)
    }

    if (event instanceof RequestMarkedAsCanceledBySenderEvent) {
      return this.markedAsCanceledBySenderEvent(event)
    }

    if (event instanceof RequestMarkedAsCompletedEvent) {
      return this.markedAsCompletedEvent(event)
    }

    if (event instanceof RequestMarkedAsRejectedEvent) {
      return this.markedAsRejectedEvent(event)
    }

    return null
  }

  async created(event: RequestCreatedEvent) {
    const draftRequest = new RequestEntity({
      id: event.requestId,
      deliverableIds: [],
      fileIds: event.fileIds,
      folderId: event.folderId,
      isAccepted: false,
      isCompleted: false,
      isCanceled: false,
      isRejected: false,
      recipientId: event.recipientId,
      senderId: event.senderId,
      isCanceledByRecipient: false,
      isCanceledBySender: false,
      isTimeout: false,
      note: event.note,
      paymentIds: event.paymentId ? [event.paymentId] : [],
      commission: event.commission,
      planId: event.planId,
      fee: event.fee,
      title: event.title,
    })

    return this.repository.persist(draftRequest)
  }

  async markedAsAcceptedEvent(event: RequestMarkedAsAcceptedEvent) {
    const request = await this.repository.find(event.requestId)

    if (request instanceof Error) {
      return new Error()
    }

    if (request === null) {
      return new Error()
    }

    const draftRequest = request.markAsAccepted()

    return this.repository.persist(draftRequest)
  }

  async markedAsCanceledEvent(event: RequestMarkedAsCanceledEvent) {
    const request = await this.repository.find(event.requestId)

    if (request instanceof Error) {
      return new Error()
    }

    if (request === null) {
      return new Error()
    }

    const draftRequest = request.markAsCanceled()

    return this.repository.persist(draftRequest)
  }

  async markedAsCanceledByRecipientEvent(
    event: RequestMarkedAsCanceledByRecipientEvent,
  ) {
    const request = await this.repository.find(event.requestId)

    if (request instanceof Error) {
      return new Error()
    }

    if (request === null) {
      return new Error()
    }

    const draftRequest = request.markAsCanceledByRecipient()

    return this.repository.persist(draftRequest)
  }

  async markedAsCanceledBySenderEvent(
    event: RequestMarkedAsCanceledBySenderEvent,
  ) {
    const request = await this.repository.find(event.requestId)

    if (request instanceof Error) {
      return new Error()
    }

    if (request === null) {
      return new Error()
    }

    const draftRequest = request.markAsCanceledBySender()

    return this.repository.persist(draftRequest)
  }

  async markedAsCompletedEvent(event: RequestMarkedAsCompletedEvent) {
    const request = await this.repository.find(event.requestId)

    if (request instanceof Error) {
      return new Error()
    }

    if (request === null) {
      return new Error()
    }

    const draftRequest = request.markAsCompleted()

    return this.repository.persist(draftRequest)
  }

  async markedAsRejectedEvent(event: RequestMarkedAsRejectedEvent) {
    const request = await this.repository.find(event.requestId)

    if (request instanceof Error) {
      return new Error()
    }

    if (request === null) {
      return new Error()
    }

    const draftRequest = request.markAsRejected()

    return this.repository.persist(draftRequest)
  }
}
