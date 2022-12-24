import type { z } from "zod"
import type { zPrismaPostAnnotationsUpdatedEvent } from "infrastructure/validations/post/prismaPostAnnotationsUpdatedEvent"
import type { zPrismaPostCreatedEvent } from "infrastructure/validations/post/prismaPostCreatedEvent"
import type { zPrismaPostDeletedEvent } from "infrastructure/validations/post/prismaPostDeletedEvent"
import type { zPrismaPostUpdatedEvent } from "infrastructure/validations/post/prismaPostUpdatedEvent"

export type PrismaPostEvent =
  | z.infer<typeof zPrismaPostAnnotationsUpdatedEvent>
  | z.infer<typeof zPrismaPostCreatedEvent>
  | z.infer<typeof zPrismaPostDeletedEvent>
  | z.infer<typeof zPrismaPostUpdatedEvent>
