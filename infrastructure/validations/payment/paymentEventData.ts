import type { z } from "zod"
import type { zPaymentCreatedEventData } from "infrastructure/validations/payment/paymentCreatedEventData"

export type PaymentEventData = z.infer<typeof zPaymentCreatedEventData>
