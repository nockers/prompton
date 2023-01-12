import { z } from "zod"

export const zPostPromptCreatedEventData = z.object({
  postId: z.string(),
  userId: z.string(),
  fileId: z.string(),
  detectedSoftware: z.string().nullable(),
  detectedPrompt: z.string().nullable(),
  detectedSeed: z.string().nullable(),
  software: z.string().nullable(),
  seed: z.string().nullable(),
  isPublic: z.boolean(),
  promptId: z.string(),
  imageURL: z.string(),
})
