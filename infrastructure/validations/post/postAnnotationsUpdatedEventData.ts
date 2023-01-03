import { z } from "zod"

export const zPostAnnotationsUpdatedEventData = z.object({
  postId: z.string(),
  userId: z.string(),
  colors: z.array(z.string()),
  webColors: z.array(z.string()),
  annotationAdult: z.string().nullable(),
  annotationMedical: z.string().nullable(),
  annotationRacy: z.string().nullable(),
  annotationSpoof: z.string().nullable(),
  annotationViolence: z.string().nullable(),
  labelIds: z.array(z.string()),
  resizableImageURL: z.string().nullable(),
})
