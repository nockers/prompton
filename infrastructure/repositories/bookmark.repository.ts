import { BookmarkEntity, Id } from "core"
import db from "db"
import { catchError } from "infrastructure/utils/catchError"

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

  async upsert(bookmark: BookmarkEntity) {
    try {
      await db.post.update({
        data: {
          bookmarks: {
            create: {
              id: bookmark.id.value,
              userId: bookmark.userId.value,
            },
          },
        },
        where: { id: bookmark.postId.value },
      })

      return null
    } catch (error) {
      return catchError(error)
    }
  }

  async delete(id: Id) {
    try {
      await db.bookmark.delete({
        where: { id: id.value },
      })

      return null
    } catch (error) {
      return catchError(error)
    }
  }
}
