import type { LikeEntity } from "core"
import { BookmarkEntity, Id } from "core"
import db from "db"
import { catchError } from "interface/utils/catchError"

export class BookmarkRepository {
  async find(userId: Id, postId: Id) {
    try {
      const bookmark = await db.bookmark.findUnique({
        where: {
          userId_postId: {
            userId: userId.value,
            postId: postId.value,
          },
        },
      })

      if (bookmark === null) {
        return null
      }

      return new BookmarkEntity({
        id: new Id(bookmark.id),
        postId: new Id(bookmark.postId),
        userId: new Id(bookmark.userId),
      })
    } catch (error) {
      return catchError(error)
    }
  }

  async upsert(like: LikeEntity) {
    try {
      await db.post.update({
        data: {
          bookmarks: {
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
          bookmarks: {
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
