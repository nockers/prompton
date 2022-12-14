import Stripe from "stripe"
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
    return parent.name || "-"
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
    return parent.description || ""
  },
  works(parent) {
    return db.user.findUnique({ where: { id: parent.id } }).posts({
      orderBy: { createdAt: "desc" },
      where: { isDeleted: false },
      take: 4,
    })
  },
  followersCount(parent) {
    return db.friendship.count({ where: { followeeId: parent.id } })
  },
  followeesCount(parent) {
    return db.friendship.count({ where: { followerId: parent.id } })
  },
  requestsCount(parent) {
    return db.request.count({ where: { senderId: parent.id } })
  },
  receivedRequestsCount(parent) {
    return db.request.count({ where: { recipientId: parent.id } })
  },
  worksCount(parent) {
    return db.post.count({ where: { userId: parent.id, isDeleted: false } })
  },
  minimumFee(parent) {
    return parent.minimumFee
  },
  maximumFee(parent) {
    return parent.maximumFee
  },
  isRequestable(parent) {
    return parent.isRequestable
  },
  isRequestableForFree(parent) {
    return parent.isRequestableForFree
  },
  async paymentMethod(_, __, ctx) {
    if (ctx.currentUser === null) return null
    const stripe = new Stripe(Env.stripeSecretKey, {
      apiVersion: "2022-11-15",
    })
    const resp = await stripe.customers.search({
      query: `metadata['userId']:'${ctx.currentUser.uid}'`,
      expand: ["data.default_source"],
    })
    const [customer = null] = resp.data
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customer?.id,
    })
    const [paymentMethod = null] = paymentMethods.data
    return paymentMethod
  },
  /**
   * ????????????????????????????????????????????????
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
   * ?????????????????????????????????????????????
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
