import { injectable } from "tsyringe"
import type { PaymentEvent } from "core"
import { PaymentCreatedEvent, PaymentEntity } from "core"
import { PaymentRepository } from "infrastructure/repositories"

@injectable()
export class PaymentEventStore {
  constructor(private repository: PaymentRepository) {}

  execute(event: PaymentEvent) {
    if (event instanceof PaymentCreatedEvent) {
      return this.created(event)
    }

    return null
  }

  async created(event: PaymentCreatedEvent) {
    const draftPayment = new PaymentEntity({
      id: event.paymentId,
      amount: event.amount,
      isError: event.isError,
      purpose: event.purpose,
      requestId: event.requestId,
      transactionId: event.transactionId,
      userId: event.userId,
    })

    return this.repository.persist(draftPayment)
  }
}
