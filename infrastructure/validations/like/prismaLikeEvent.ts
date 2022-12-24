import type { z } from "zod"
import type { zPrismaLikeCreatedEvent } from "infrastructure/validations/like/prismaLikeCreatedEvent"
import type { zPrismaLikeDeletedEvent } from "infrastructure/validations/like/prismaLikeDeletedEvent"

export type PrismaLikeEvent =
  | z.infer<typeof zPrismaLikeCreatedEvent>
  | z.infer<typeof zPrismaLikeDeletedEvent>
