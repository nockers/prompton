import { User } from "@sentry/node"
import db from "db"
import { UserNode } from "interface/__generated__/node"
import { NodeResolver } from "interface/resolvers/types/nodeResolver"

export const UserNodeResolver: NodeResolver<UserNode, User> = {
  id(parent: User) {
    return parent.id
  },
  createdAt(parent: User) {
    return Math.floor(parent.createdAt.getTime() / 1000)
  },
  login(parent: User) {
    return parent.id
  },
  name(parent: User) {
    return parent.name
  },
  avatarImageURL(parent: User) {
    return parent.avatarImageURL
  },
  avatarImageId(parent: User) {
    return parent.avatarImageId
  },
  headerImageId(parent: User) {
    return parent.headerImageId
  },
  biography(parent: User) {
    return parent.biography ?? ""
  },
  posts(parent: User) {
    return db.user
      .findUnique({ where: { id: parent.id } })
      .posts({ orderBy: { createdAt: "desc" } })
  },
}
