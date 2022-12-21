import type { User } from "db"
import db from "db"
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
      return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${parent.avatarFileId}?w=160&h=160`
    }
    return parent.avatarImageURL
  },
  avatarImageId(parent) {
    return parent.avatarFileId
  },
  headerImageId() {
    return null
  },
  biography() {
    return ""
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
  async isFollower(parent, _, ctx) {
    if (ctx.currentUser === null) return false
    const friendships = await db.friendship.findUnique({
      where: {
        followerId_followeeId: {
          followerId: ctx.currentUser!.uid,
          followeeId: parent.id,
        },
      },
    })
    return friendships !== null
  },
  async isFollowee(parent, _, ctx) {
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
}
