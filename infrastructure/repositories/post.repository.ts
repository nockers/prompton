import { captureException } from "@sentry/node"
import { Id, PostEntity } from "core"
import db from "db"

export class PostRepository {
  async find(id: Id) {
    try {
      const post = await db.post.findUnique({
        where: { id: id.value },
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
