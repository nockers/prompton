import { Id, RequestEntity } from "core"
import db from "db"
import { catchError } from "infrastructure/utils/catchError"

export class RequestRepository {
  async find(requestId: Id) {
    try {
      const request = await db.request.findUnique({
        where: { id: requestId.value },
        include: {
          posts: {
            where: { isDeleted: false },
            select: { id: true },
          },
          files: { select: { id: true } },
          payments: { select: { id: true } },
        },
      })

      if (request === null) {
        return null
      }

      const entity = new RequestEntity({
        id: new Id(request.id),
        senderId: new Id(request.senderId),
        recipientId: new Id(request.recipientId),
        note: request.note,
        commission: request.commission,
        fee: request.fee,
        folderId: request.folderId !== null ? new Id(request.folderId) : null,
        isAccepted: request.isAccepted,
        isCompleted: request.isCompleted,
        isRejected: request.isRejected,
        isCanceled: request.isCanceled,
        isCanceledBySender: request.isCanceledBySender,
        isCanceledByRecipient: request.isCanceledByRecipient,
        isTimeout: request.isTimeout,
        planId: request.planId !== null ? new Id(request.planId) : null,
        fileIds: request.files.map((file) => {
          return new Id(file.id)
        }),
        paymentIds: request.payments.map((payment) => {
          return new Id(payment.id)
        }),
        deliverableIds: request.posts.map((post) => {
          return new Id(post.id)
        }),
        title: null,
      })

      return entity
    } catch (error) {
      return catchError(error)
    }
  }

  async persist(entity: RequestEntity) {
    try {
      await db.request.upsert({
        where: {
          id: entity.id.value,
        },
        update: {
          note: entity.note,
          isAccepted: entity.isAccepted,
          isCompleted: entity.isCompleted,
          isRejected: entity.isRejected,
          isCanceled: entity.isCanceled,
          isCanceledBySender: entity.isCanceledBySender,
          isCanceledByRecipient: entity.isCanceledByRecipient,
          isTimeout: entity.isTimeout,
          payments: {
            connect: entity.paymentIds.map((paymentId) => {
              return { id: paymentId.value }
            }),
          },
        },
        create: {
          id: entity.id.value,
          senderId: entity.senderId.value,
          recipientId: entity.recipientId.value,
          note: entity.note,
          commission: entity.commission,
          fee: entity.fee,
          folderId: entity.folderId?.value,
          isAccepted: false,
          isCompleted: false,
          isRejected: false,
          planId: entity.planId?.value,
          files: {
            connect: entity.fileIds.map((id) => {
              return { id: id.value }
            }),
          },
          payments: {
            connect: entity.paymentIds.map((id) => {
              return { id: id.value }
            }),
          },
          posts: {
            connect: entity.deliverableIds.map((id) => {
              return { id: id.value }
            }),
          },
        },
      })

      return null
    } catch (error) {
      return catchError(error)
    }
  }
}
