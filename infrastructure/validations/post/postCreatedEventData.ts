import { z } from "zod"

export const zPostCreatedEventData = z.object({
  postId: z.string(),
  userId: z.string(),
  fileId: z.string(),
  detectedSoftware: z.string().nullable().optional(),
  detectedPrompt: z.string().nullable().optional(),
  detectedSeed: z.string().nullable().optional(),
  software: z.string().nullable().optional(),
  prompt: z.string().nullable().optional(),
  seed: z.string().nullable().optional(),
  isPublic: z.boolean().optional(),
  requestId: z.string().nullable().optional(),
  promptId: z.string().nullable().optional(),
})
