import { z } from "zod"

export const zPrismaUserLoginUpdatedEvent = z.object({
  userId: z.string(),
  login: z.string(),
})
