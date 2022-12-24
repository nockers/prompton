import type { z } from "zod"
import type { zPrismaFriendshipCreatedEvent } from "infrastructure/validations/friendship/prismaFriendshipCreatedEvent"
import type { zPrismaFriendshipDeletedEvent } from "infrastructure/validations/friendship/prismaFriendshipDeletedEvent"

export type PrismaFriendshipEvent =
  | z.infer<typeof zPrismaFriendshipCreatedEvent>
  | z.infer<typeof zPrismaFriendshipDeletedEvent>
