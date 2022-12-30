import type { Request } from "@prisma/client"
import db from "db"
import type { RequestNode } from "interface/__generated__/node"
import type { PrismaResolvers } from "interface/resolvers/types/prismaResolvers"

export const RequestNodeResolvers: PrismaResolvers<RequestNode, Request> = {
  id(parent) {
    return parent.id
  },
  createdAt(parent) {
    return Math.floor(parent.createdAt.getTime() / 1000)
  },
  creator(parent) {
    return db.user.findUnique({ where: { id: parent.creatorId } })
  },
  fee(parent) {
    return parent.fee
  },
  files(parent) {
    return db.file.findMany({ where: { requestId: parent.id } })
  },

  user(parent) {
    return db.user.findUnique({ where: { id: parent.userId } })
  },
  isPending(parent) {
    return (
      !parent.isAccepted &&
      !parent.isRejected &&
      !parent.isCompleted &&
      !parent.isCanceled &&
      !parent.isCanceledBySystem &&
      !parent.isCanceledByCreator &&
      !parent.isTimeout
    )
  },
  isAccepted(parent) {
    return parent.isAccepted
  },
  isRejected(parent) {
    return parent.isRejected
  },
  isCompleted(parent) {
    return parent.isCompleted
  },
  isCanceled(parent) {
    return parent.isCanceled
  },
  isCanceledBySystem(parent) {
    return parent.isCanceledBySystem
  },
  isCanceledByCreator(parent) {
    return parent.isCanceledByCreator
  },
  isTimeout(parent) {
    return parent.isTimeout
  },
  note(parent) {
    return parent.note
  },
  payment(parent) {
    return db.payment.findUnique({ where: { requestId: parent.id } })
  },
  plan(parent) {
    if (parent.planId === null) return null
    return db.plan.findUnique({ where: { id: parent.planId } })
  },
  folderId() {
    return null
  },
  hasSignature(parent) {
    return parent.hasSignature
  },
  signature(parent) {
    return parent.signature
  },
  works() {
    return []
  },
}
