import type { Id, PlanEntity } from "core"
import db from "db"
import { catchError } from "infrastructure/utils/catchError"

export class PlanRepository {
  async persist(entity: PlanEntity) {
    try {
      await db.plan.upsert({
        where: {
          id: entity.id.value,
        },
        update: {
          name: entity.name,
          description: entity.description,
          price: entity.price,
        },
        create: {
          id: entity.id.value,
          userId: entity.userId.value,
          name: entity.name,
          description: entity.description,
          price: entity.price,
        },
      })

      return null
    } catch (error) {
      return catchError(error)
    }
  }

  async delete(planId: Id) {
    try {
      await db.plan.delete({
        where: {
          id: planId.value,
        },
      })

      return null
    } catch (error) {
      return catchError(error)
    }
  }
}
