import type { z } from "zod"
import type { zPrismaNotificationCreatedEvent } from "infrastructure/validations/notification/prismaNotificationCreatedEvent"

export type PrismaNotificationEvent = z.infer<
  typeof zPrismaNotificationCreatedEvent
>
