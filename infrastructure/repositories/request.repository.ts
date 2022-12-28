import type { RequestEntity } from "core"
import db from "db"
import { catchError } from "infrastructure/utils/catchError"

export class RequestRepository {
  async persist(entity: RequestEntity) {
    try {
      await db.request.upsert({
        where: {
          id: entity.id.value,
        },
        update: {
          title: entity.title,
          note: entity.note,
          isAccepted: entity.isAccepted,
          isCompleted: entity.isCompleted,
          isRejected: entity.isRejected,
          isCanceled: entity.isCanceled,
          isCanceledBySystem: entity.isCanceledBySystem,
          isCanceledByCreator: entity.isCanceledByCreator,
          isTimeout: entity.isTimeout,
        },
        create: {
          id: entity.id.value,
          userId: entity.userId.value,
          creatorId: entity.creatorId.value,
          title: entity.title,
          note: entity.note,
          commission: entity.commission,
          price: entity.price,
          folderId: entity.folderId?.value ?? undefined,
          isAccepted: false,
          isCompleted: false,
          isRejected: false,
        },
      })

      return null
    } catch (error) {
      return catchError(error)
    }
  }
}
