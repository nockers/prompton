import { captureException } from "@sentry/node"
import { Id, PostEntity } from "core"
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
        colors: post.colors,
        annotationAdult: post.annotationAdult,
        annotationMedical: post.annotationMedical,
        annotationRacy: post.annotationRacy,
        annotationSpoof: post.annotationSpoof,
        annotationViolence: post.annotationViolence,
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
          colors: entity.colors,
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
        },
        where: { id: entity.id.value },
      })
    } catch (error) {
      captureException(error)
      return new Error()
    }
  }
}
