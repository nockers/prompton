import type { DeliverableEntity } from "core"
import db from "db"
import { catchError } from "infrastructure/utils/catchError"

export class DeliverableRepository {
  async persist(entity: DeliverableEntity) {
    try {
      await db.deliverable.upsert({
        where: {
          id: entity.id.value,
        },
        update: {
          name: entity.name,
          description: entity.description,
          postId: entity.postId?.value,
        },
        create: {
          id: entity.id.value,
          name: entity.name,
          description: entity.description,
          userId: entity.userId.value,
          fileId: entity.fileId.value,
          requestId: entity.requestId.value,
          postId: entity.postId?.value,
        },
      })

      return null
    } catch (error) {
      return catchError(error)
    }
  }
}
