import { Id, LikeEntity } from "core"
import db from "db"
import { catchError } from "infrastructure/utils/catchError"

export class LikeRepository {
  async find(userId: Id, postId: Id) {
    try {
      const like = await db.like.findUnique({
        where: {
          userId_postId: {
            userId: userId.value,
            postId: postId.value,
          },
        },
      })

      if (like === null) {
        return null
      }

      return new LikeEntity({
        id: new Id(like.id),
        postId: new Id(like.postId),
        userId: new Id(like.userId),
      })
    } catch (error) {
      return catchError(error)
    }
  }

  async upsert(like: LikeEntity) {
    try {
      await db.post.update({
        data: {
          likes: {
            create: {
              id: like.id.value,
              userId: like.userId.value,
            },
          },
          likesCount: { increment: 1 },
        },
        where: { id: like.postId.value },
      })

      return null
    } catch (error) {
      return catchError(error)
    }
  }

  async delete(like: LikeEntity) {
    try {
      await db.post.update({
        where: { id: like.postId.value },
        data: {
          likes: {
            delete: {
              userId_postId: {
                userId: like.userId.value,
                postId: like.postId.value,
              },
            },
          },
          likesCount: { decrement: 1 },
        },
      })

      return null
    } catch (error) {
      return catchError(error)
    }
  }
}
