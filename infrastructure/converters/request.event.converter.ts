import type { Event } from "@prisma/client"
import type { z } from "zod"
import type { RequestEvent } from "core"
import {
  RequestMarkedAsCanceledByRecipientEvent,
  RequestMarkedAsCanceledBySenderEvent,
  RequestMarkedAsCanceledEvent,
  RequestMarkedAsCompletedEvent,
  RequestMarkedAsRejectedEvent,
  RequestMarkedAsAcceptedEvent,
  RequestCreatedEvent,
  Id,
} from "core"
import type { RequestEventData } from "infrastructure/validations"
import {
  zRequestMarkedAsCanceledByRecipientEventData,
  zRequestMarkedAsCanceledBySenderEventData,
  zRequestMarkedAsCanceledEventData,
  zRequestMarkedAsAcceptedEventData,
  zRequestMarkedAsCompletedEventData,
  zRequestMarkedAsRejectedEventData,
  zRequestCreatedEventData,
} from "infrastructure/validations"

export class RequestEventConverter {
  static toData(event: RequestEvent): RequestEventData {
    if (event instanceof RequestCreatedEvent) {
      const data: z.infer<typeof zRequestCreatedEventData> = {
        commission: event.commission,
        recipientId: event.recipientId.value,
        fee: event.fee,
        fileIds: event.fileIds.map((id) => {
          return id.value
        }),
        folderId: event.folderId?.value ?? null,
        note: event.note,
        paymentId: event.paymentId?.value ?? null,
        planId: event.planId?.value ?? null,
        requestId: event.requestId.value,
        title: event.title,
        senderId: event.senderId.value,
      }
      return zRequestCreatedEventData.parse(data)
    }

    if (event instanceof RequestMarkedAsAcceptedEvent) {
      const data: z.infer<typeof zRequestMarkedAsAcceptedEventData> = {
        requestId: event.requestId.value,
        senderId: event.senderId.value,
        recipientId: event.recipientId.value,
        paymentId: event.paymentId?.value ?? null,
      }
      return zRequestCreatedEventData.parse(data)
    }

    if (event instanceof RequestMarkedAsRejectedEvent) {
      const data: z.infer<typeof zRequestMarkedAsRejectedEventData> = {
        requestId: event.requestId.value,
        senderId: event.senderId.value,
        recipientId: event.recipientId.value,
      }
      return zRequestMarkedAsRejectedEventData.parse(data)
    }

    if (event instanceof RequestMarkedAsCanceledEvent) {
      const data: z.infer<typeof zRequestMarkedAsCanceledEventData> = {
        requestId: event.requestId.value,
        senderId: event.senderId.value,
        recipientId: event.recipientId.value,
      }
      return zRequestCreatedEventData.parse(data)
    }

    if (event instanceof RequestMarkedAsCanceledBySenderEvent) {
      const data: z.infer<typeof zRequestMarkedAsCanceledBySenderEventData> = {
        requestId: event.requestId.value,
        senderId: event.senderId.value,
        recipientId: event.recipientId.value,
      }
      return zRequestCreatedEventData.parse(data)
    }

    if (event instanceof RequestMarkedAsCanceledByRecipientEvent) {
      const data: z.infer<typeof zRequestMarkedAsCanceledByRecipientEventData> =
        {
          requestId: event.requestId.value,
          senderId: event.senderId.value,
          recipientId: event.recipientId.value,
        }
      return zRequestCreatedEventData.parse(data)
    }

    if (event instanceof RequestMarkedAsCompletedEvent) {
      const data: z.infer<typeof zRequestMarkedAsCompletedEventData> = {
        requestId: event.requestId.value,
        senderId: event.senderId.value,
        recipientId: event.recipientId.value,
      }
      return zRequestMarkedAsCompletedEventData.parse(data)
    }

    return event
  }

  static toEntity(event: Event): RequestEvent {
    if (event.type === RequestCreatedEvent.type) {
      const data = zRequestCreatedEventData.parse(event.data)
      return new RequestCreatedEvent({
        id: new Id(event.id),
        timestamp: Math.floor(event.timestamp.getTime() / 1000),
        commission: data.commission,
        senderId: new Id(data.senderId),
        recipientId: new Id(data.recipientId),
        fee: data.fee,
        fileIds: data.fileIds.map((id) => {
          return new Id(id)
        }),
        folderId: data.folderId ? new Id(data.folderId) : null,
        note: data.note,
        paymentId: data.paymentId ? new Id(data.paymentId) : null,
        planId: data.planId ? new Id(data.planId) : null,
        requestId: new Id(data.requestId),
        title: data.title,
      })
    }

    if (event.type === RequestMarkedAsAcceptedEvent.type) {
      const data = zRequestMarkedAsAcceptedEventData.parse(event.data)
      return new RequestMarkedAsAcceptedEvent({
        id: new Id(event.id),
        timestamp: Math.floor(event.timestamp.getTime() / 1000),
        senderId: new Id(data.senderId),
        recipientId: new Id(data.recipientId),
        paymentId: data.paymentId ? new Id(data.paymentId) : null,
        requestId: new Id(data.requestId),
      })
    }

    if (event.type === RequestMarkedAsCanceledEvent.type) {
      const data = zRequestMarkedAsCanceledEventData.parse(event.data)
      return new RequestMarkedAsCanceledEvent({
        id: new Id(event.id),
        timestamp: Math.floor(event.timestamp.getTime() / 1000),
        senderId: new Id(data.senderId),
        recipientId: new Id(data.recipientId),
        requestId: new Id(data.requestId),
      })
    }

    if (event.type === RequestMarkedAsCanceledBySenderEvent.type) {
      const data = zRequestMarkedAsCanceledBySenderEventData.parse(event.data)
      return new RequestMarkedAsCanceledBySenderEvent({
        id: new Id(event.id),
        timestamp: Math.floor(event.timestamp.getTime() / 1000),
        senderId: new Id(data.senderId),
        recipientId: new Id(data.recipientId),
        requestId: new Id(data.requestId),
      })
    }

    if (event.type === RequestMarkedAsCanceledByRecipientEvent.type) {
      const data = zRequestMarkedAsCanceledByRecipientEventData.parse(
        event.data,
      )
      return new RequestMarkedAsCanceledByRecipientEvent({
        id: new Id(event.id),
        timestamp: Math.floor(event.timestamp.getTime() / 1000),
        senderId: new Id(data.senderId),
        recipientId: new Id(data.recipientId),
        requestId: new Id(data.requestId),
      })
    }

    if (event.type === RequestMarkedAsCompletedEvent.type) {
      const data = zRequestMarkedAsCompletedEventData.parse(event.data)
      return new RequestMarkedAsCompletedEvent({
        id: new Id(event.id),
        timestamp: Math.floor(event.timestamp.getTime() / 1000),
        senderId: new Id(data.senderId),
        recipientId: new Id(data.recipientId),
        requestId: new Id(data.requestId),
      })
    }

    if (event.type === RequestMarkedAsRejectedEvent.type) {
      const data = zRequestMarkedAsRejectedEventData.parse(event.data)
      return new RequestMarkedAsRejectedEvent({
        id: new Id(event.id),
        timestamp: Math.floor(event.timestamp.getTime() / 1000),
        senderId: new Id(data.senderId),
        recipientId: new Id(data.recipientId),
        requestId: new Id(data.requestId),
      })
    }

    throw new Error()
  }
}
