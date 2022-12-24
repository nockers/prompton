import type { z } from "zod"
import type { zPrismaLabelCreatedEvent } from "infrastructure/validations/label/prismaLabelCreatedEvent"
import type { zPrismaLabelNameUpdatedEvent } from "infrastructure/validations/label/prismaLabelNameUpdatedEvent"

export type PrismaLabelEvent =
  | z.infer<typeof zPrismaLabelCreatedEvent>
  | z.infer<typeof zPrismaLabelNameUpdatedEvent>
