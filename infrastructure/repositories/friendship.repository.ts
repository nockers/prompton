import { FriendshipEntity } from "core"
import { Id } from "core/valueObjects"
import db from "db"
import { catchError } from "interface/utils/catchError"

export class FriendshipRepository {
  async find(followerId: Id, followeeId: Id) {
    try {
      const friendship = await db.friendship.findUnique({
        where: {
          followerId_followeeId: {
            followerId: followerId.value,
            followeeId: followeeId.value,
          },
        },
      })

      if (friendship === null) {
        return null
      }

      return new FriendshipEntity({
        id: new Id(friendship.id),
        followeeId: new Id(friendship.followeeId),
        followerId: new Id(friendship.followerId),
      })
    } catch (error) {
      return catchError(error)
    }
  }

  async findManyByFolloweeId(followeeId: Id) {
    try {
      const prismaFriendships = await db.friendship.findMany({
        where: { followeeId: followeeId.value },
        take: 20000,
      })

      const friendships = prismaFriendships.map((friendship) => {
        return new FriendshipEntity({
          id: new Id(friendship.id),
          followeeId: new Id(friendship.followeeId),
          followerId: new Id(friendship.followerId),
        })
      })

      return friendships
    } catch (error) {
      return catchError(error)
    }
  }

  async follow(friendship: FriendshipEntity) {
    try {
      await db.$transaction([
        db.user.update({
          data: {
            followers: {
              create: {
                id: friendship.id.value,
                follower: { connect: { id: friendship.followerId.value } },
              },
            },
            followersCount: { increment: 1 },
          },
          where: { id: friendship.followeeId.value },
        }),
        db.user.update({
          data: { followeesCount: { increment: 1 } },
          where: { id: friendship.followerId.value },
        }),
      ])

      return null
    } catch (error) {
      return catchError(error)
    }
  }

  async unfollow(friendship: FriendshipEntity) {
    try {
      await db.$transaction([
        db.user.update({
          data: {
            followers: {
              delete: {
                followerId_followeeId: {
                  followerId: friendship.followerId.value,
                  followeeId: friendship.followeeId.value,
                },
              },
            },
            followersCount: { decrement: 1 },
          },
          where: { id: friendship.followeeId.value },
        }),
        db.user.update({
          data: { followeesCount: { decrement: 1 } },
          where: { id: friendship.followerId.value },
        }),
      ])

      return null
    } catch (error) {
      return catchError(error)
    }
  }
}
