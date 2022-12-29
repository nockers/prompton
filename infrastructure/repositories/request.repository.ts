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
          note: entity.note,
          commission: entity.commission,
          fee: entity.fee,
          folderId: entity.folderId?.value ?? undefined,
          isAccepted: false,
          isCompleted: false,
          isRejected: false,
          planId: entity.planId.value,
        },
      })

      return null
    } catch (error) {
      return catchError(error)
    }
  }
}
