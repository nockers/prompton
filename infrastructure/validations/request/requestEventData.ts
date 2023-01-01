import type { z } from "zod"
import type { zRequestCreatedEventData } from "infrastructure/validations/request/requestCreatedEventData"
import type { zRequestMarkedAsAcceptedEventData } from "infrastructure/validations/request/requestMarkedAsAcceptedEventData"
import type { zRequestMarkedAsCanceledByRecipientEventData } from "infrastructure/validations/request/requestMarkedAsCanceledByRecipientEventData"
import type { zRequestMarkedAsCanceledBySenderEventData } from "infrastructure/validations/request/requestMarkedAsCanceledBySenderEventData"
import type { zRequestMarkedAsCanceledEventData } from "infrastructure/validations/request/requestMarkedAsCanceledEventData"
import type { zRequestMarkedAsCompletedEventData } from "infrastructure/validations/request/requestMarkedAsCompletedEventData"
import type { zRequestMarkedAsRejectedEventData } from "infrastructure/validations/request/requestMarkedAsRejectedEventData"

export type RequestEventData =
  | z.infer<typeof zRequestCreatedEventData>
  | z.infer<typeof zRequestMarkedAsAcceptedEventData>
  | z.infer<typeof zRequestMarkedAsCanceledByRecipientEventData>
  | z.infer<typeof zRequestMarkedAsCanceledBySenderEventData>
  | z.infer<typeof zRequestMarkedAsCanceledEventData>
  | z.infer<typeof zRequestMarkedAsCompletedEventData>
  | z.infer<typeof zRequestMarkedAsRejectedEventData>
