import db, { User } from "db"
import { UserNode } from "interface/__generated__/node"
import { PrismaResolvers } from "interface/resolvers/types/prismaResolvers"

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
      return `/api/images/${parent.avatarFileId}?w=160&h=160`
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
}
