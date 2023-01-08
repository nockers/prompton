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
  recipient(parent) {
    return db.request.findUnique({ where: { id: parent.id } }).recipient()
  },
  sender(parent) {
    return db.request.findUnique({ where: { id: parent.id } }).sender()
  },
  commission(parent) {
    return parent.commission
  },
  fee(parent) {
    return parent.fee
  },
  files(parent) {
    return db.request.findUnique({ where: { id: parent.id } }).files()
  },
  isPending(parent) {
    return (
      !parent.isAccepted &&
      !parent.isRejected &&
      !parent.isCompleted &&
      !parent.isCanceled &&
      !parent.isCanceledBySender &&
      !parent.isCanceledByRecipient &&
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
  isCanceledBySender(parent) {
    return parent.isCanceledBySender
  },
  isCanceledByRecipient(parent) {
    return parent.isCanceledByRecipient
  },
  isTimeout(parent) {
    return parent.isTimeout
  },
  note(parent) {
    return parent.note
  },
  payments(parent) {
    return db.request.findUnique({ where: { id: parent.id } }).payments()
  },
  plan(parent) {
    if (parent.planId === null) return null
    return db.request.findUnique({ where: { id: parent.id } }).plan()
  },
  folder(parent) {
    return db.request.findUnique({ where: { id: parent.id } }).folder()
  },
  hasSignature(parent) {
    return parent.hasSignature
  },
  signature(parent) {
    return parent.signature
  },
  works(parent) {
    return db.request.findUnique({ where: { id: parent.id } }).posts()
  },
  deliverables(parent) {
    return db.request.findUnique({ where: { id: parent.id } }).deliverables()
  },
}
