import type { User } from "db"
import db from "db"
import { Env } from "infrastructure/env"
import type { UserNode } from "interface/__generated__/node"
import type { PrismaResolvers } from "interface/resolvers/types/prismaResolvers"

export const UserNodeResolvers: PrismaResolvers<UserNode, User> = {
  id(parent) {
    return parent.id
  },
  createdAt(parent) {
    return Math.floor(parent.createdAt.getTime() / 1000)
  },
  login(parent) {
    return parent.id
  },
  name(parent) {
    return parent.name
  },
  avatarImageURL(parent) {
    if (parent.avatarFileId !== null) {
      return `${Env.imageUrl}/${parent.avatarFileId}?w=160&h=160`
    }
    return parent.avatarImageURL
  },
  avatarImageId(parent) {
    return parent.avatarFileId
  },
  headerImageId() {
    return null
  },
  biography(parent) {
    return parent.description
  },
  works(parent) {
    return db.user.findUnique({ where: { id: parent.id } }).posts({
      orderBy: { createdAt: "desc" },
      where: { isDeleted: false },
    })
  },
  followersCount(parent) {
    return db.friendship.count({ where: { followeeId: parent.id } })
  },
  followeesCount(parent) {
    return db.friendship.count({ where: { followerId: parent.id } })
  },
  isRequestable(parent) {
    return parent.isRequestable
  },
  /**
   * 自分がフォローされているかどうか
   */
  async isFollower(parent, _, ctx) {
    if (ctx.currentUser === null) return false
    const friendships = await db.friendship.findUnique({
      where: {
        followerId_followeeId: {
          followerId: parent.id,
          followeeId: ctx.currentUser!.uid,
        },
      },
    })
    return friendships !== null
  },
  /**
   * 自分がフォローしているかどうか
   */
  async isFollowee(parent, _, ctx) {
    if (ctx.currentUser === null) return false
    const friendship = await db.friendship.findUnique({
      where: {
        followerId_followeeId: {
          followerId: ctx.currentUser!.uid,
          followeeId: parent.id,
        },
      },
    })
    return friendship !== null
  },
}
