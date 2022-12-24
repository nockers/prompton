import type { z } from "zod"
import type { zPrismaBookmarkCreatedEvent } from "infrastructure/validations/bookmark/prismaBookmarkCreatedEvent"
import type { zPrismaBookmarkDeletedEvent } from "infrastructure/validations/bookmark/prismaBookmarkDeletedEvent"

export type PrismaBookmarkEvent =
  | z.infer<typeof zPrismaBookmarkCreatedEvent>
  | z.infer<typeof zPrismaBookmarkDeletedEvent>
