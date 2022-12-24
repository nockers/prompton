import type { z } from "zod"
import type { zPrismaUserCreatedEvent } from "infrastructure/validations/user/prismaUserCreatedEvent"
import type { zPrismaUserLoginUpdatedEvent } from "infrastructure/validations/user/prismaUserLoginUpdatedEvent"
import type { zPrismaUserProfileUpdatedEvent } from "infrastructure/validations/user/prismaUserProfileUpdatedEvent"

export type PrismaUserEvent =
  | z.infer<typeof zPrismaUserCreatedEvent>
  | z.infer<typeof zPrismaUserLoginUpdatedEvent>
  | z.infer<typeof zPrismaUserProfileUpdatedEvent>
