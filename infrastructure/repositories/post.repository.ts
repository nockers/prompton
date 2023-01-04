import { captureException } from "@sentry/node"
import { Id, PostEntity, SoftwareFactory, Url } from "core"
import db from "db"

export class PostRepository {
  async find(id: Id) {
    try {
      const post = await db.post.findUnique({
        where: { id: id.value },
        include: { labels: true },
      })

      if (post === null) {
        return null
      }

      return new PostEntity({
        id: new Id(post.id),
        title: post.title,
        fileId: new Id(post.fileId),
        userId: new Id(post.userId),
        prompt: post.prompt,
        detectedPrompt: post.detectedPrompt,
        software:
          post.software !== null
            ? SoftwareFactory.fromText(post.software)
            : null,
        detectedSoftware:
          post.detectedSoftware !== null
            ? SoftwareFactory.fromText(post.detectedSoftware)
            : null,
        seed: post.seed,
        detectedSeed: post.detectedSeed,
        colors: post.colors,
        webColors: post.webColors,
        annotationAdult: post.annotationAdult,
        annotationMedical: post.annotationMedical,
        annotationRacy: post.annotationRacy,
        annotationSpoof: post.annotationSpoof,
        annotationViolence: post.annotationViolence,
        resizableImageURL:
          post.resizableImageURL !== null
            ? new Url(post.resizableImageURL)
            : null,
        labelIds: post.labels.map((label) => {
          return new Id(label.id)
        }),
      })
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }

  async persist(entity: PostEntity) {
    try {
      return db.post.upsert({
        create: {
          id: entity.id.value,
          title: entity.title,
          dateText: "",
          fileId: entity.fileId.value,
          userId: entity.userId.value,
          prompt: entity.prompt,
          detectedPrompt: entity.detectedPrompt,
          software: entity.software?.value ?? null,
          detectedSoftware: entity.detectedSoftware?.value ?? null,
          seed: entity.seed,
          detectedSeed: entity.detectedSeed,
          colors: entity.colors,
          webColors: entity.webColors,
          annotationAdult: entity.annotationAdult,
          annotationMedical: entity.annotationMedical,
          annotationRacy: entity.annotationRacy,
          annotationSpoof: entity.annotationSpoof,
          annotationViolence: entity.annotationViolence,
          labels: {
            connect: entity.labelIds.map((labelId) => {
              return { id: labelId.value }
            }),
          },
        },
        update: {
          title: entity.title,
          prompt: entity.prompt,
          detectedPrompt: entity.detectedPrompt,
          software: entity.software?.value ?? null,
          detectedSoftware: entity.detectedSoftware?.value ?? null,
          seed: entity.seed,
          detectedSeed: entity.detectedSeed,
          colors: entity.colors,
          webColors: entity.webColors,
          annotationAdult: entity.annotationAdult,
          annotationMedical: entity.annotationMedical,
          annotationRacy: entity.annotationRacy,
          annotationSpoof: entity.annotationSpoof,
          annotationViolence: entity.annotationViolence,
          resizableImageURL: entity.resizableImageURL?.value,
          labels: {
            connect: entity.labelIds.map((labelId) => {
              return { id: labelId.value }
            }),
          },
        },
        where: { id: entity.id.value },
      })
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }

  async delete(postId: Id) {
    try {
      return db.post.update({
        data: { isDeleted: true },
        where: { id: postId.value },
      })
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
