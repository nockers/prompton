import type { PaymentEntity } from "core"
import db from "db"
import { catchError } from "infrastructure/utils/catchError"

export class PaymentRepository {
  async persist(entity: PaymentEntity) {
    try {
      await db.payment.upsert({
        where: {
          id: entity.id.value,
        },
        update: {
          isError: entity.isError,
        },
        create: {
          id: entity.id.value,
          userId: entity.userId.value,
          purpose: entity.purpose,
          amount: entity.amount,
          isError: entity.isError,
          transactionId: entity.transactionId,
        },
      })

      return null
    } catch (error) {
      return catchError(error)
    }
  }
}
