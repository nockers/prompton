import { NotificationEntity } from "core"
import db from "db"
import { catchError } from "interface/utils/catchError"

export class NotificationRepository {
  async upsert(notification: NotificationEntity) {
    try {
      if (notification.type.value === "FRIENDSHIP") {
        return this.upsertFollowNotification(notification)
      }

      if (notification.type.value === "LIKE") {
        return this.upsertPostLikeNotification(notification)
      }

      return null
    } catch (error) {
      return catchError(error)
    }
  }

  private async upsertPostLikeNotification(notification: NotificationEntity) {
    try {
      if (
        notification.userId === null ||
        notification.likeId === null ||
        notification.postId === null ||
        notification.relatedUserId === null
      ) {
        return new Error()
      }

      // userId + postId + senderId
      const uniqueId =
        notification.postId.value + notification.relatedUserId.value

      await db.notification.upsert({
        create: {
          id: notification.id.value,
          likeId: notification.likeId.value,
          type: "LIKE",
          uniqueId,
          userId: notification.userId.value,
        },
        update: {
          likeId: notification.likeId.value,
        },
        where: {
          userId_type_uniqueId: {
            type: "LIKE",
            uniqueId,
            userId: notification.userId.value,
          },
        },
      })

      return null
    } catch (error) {
      return catchError(error)
    }
  }

  private async upsertFollowNotification(notification: NotificationEntity) {
    try {
      if (
        notification.userId === null ||
        notification.friendshipId === null ||
        notification.relatedUserId === null
      ) {
        return new Error()
      }

      // userId + senderId
      const uniqueId = notification.relatedUserId.value

      await db.notification.upsert({
        create: {
          id: notification.id.value,
          friendshipId: notification.friendshipId.value,
          type: "FRIENDSHIP",
          uniqueId,
          userId: notification.userId.value,
        },
        update: {
          friendship: { connect: { id: notification.friendshipId.value } },
        },
        where: {
          userId_type_uniqueId: {
            type: "FRIENDSHIP",
            uniqueId,
            userId: notification.userId.value,
          },
        },
      })

      return null
    } catch (error) {
      return catchError(error)
    }
  }
}
