import type { Event } from "@prisma/client"
import type { z } from "zod"
import type { PaymentEvent } from "core"
import { PaymentCreatedEvent, Id } from "core"
import type { PaymentEventData } from "infrastructure/validations"
import { zPaymentCreatedEventData } from "infrastructure/validations"

export class PaymentEventConverter {
  static toData(event: PaymentEvent): PaymentEventData {
    if (event instanceof PaymentCreatedEvent) {
      const data: z.infer<typeof zPaymentCreatedEventData> = {
        amount: event.amount,
        isError: event.isError,
        paymentId: event.paymentId?.value ?? null,
        purpose: event.purpose,
        requestId: event.requestId?.value ?? null,
        transactionId: event.transactionId,
        userId: event.userId.value,
      }
      return zPaymentCreatedEventData.parse(data)
    }

    return event
  }

  static toEntity(event: Event): PaymentEvent {
    if (event.type === PaymentCreatedEvent.type) {
      const data = zPaymentCreatedEventData.parse(event.data)
      return new PaymentCreatedEvent({
        id: new Id(event.id),
        timestamp: Math.floor(event.timestamp.getTime() / 1000),
        amount: data.amount,
        isError: data.isError,
        paymentId: new Id(data.paymentId),
        purpose: data.purpose,
        requestId: data.requestId ? new Id(data.requestId) : null,
        transactionId: data.transactionId,
        userId: new Id(data.userId),
      })
    }

    throw new Error()
  }
}
