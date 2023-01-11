import type { Prompt } from "@prisma/client"
import db from "db"
import type { PromptNode } from "interface/__generated__/node"
import type { PrismaResolvers } from "interface/resolvers/types/prismaResolvers"

export const PromptNodeResolvers: PrismaResolvers<PromptNode, Prompt> = {
  id(parent) {
    return parent.id
  },
  createdAt(parent) {
    return Math.floor(parent.createdAt.getTime() / 1000)
  },
  updatedAt(parent) {
    return Math.floor(parent.updatedAt.getTime() / 1000)
  },
  text(parent) {
    return parent.text
  },
  texts(parent) {
    return parent.texts
  },
  title(parent) {
    return parent.title
  },
  titleJA(parent) {
    return parent.titleJA
  },
  description(parent) {
    return parent.description
  },
  user(_, __, context) {
    return db.user.findUnique({ where: { id: context.currentUser?.uid } })
  },
  likesCount(parent) {
    return db.like.count({ where: { promptId: parent.id } })
  },
  isPublic(parent) {
    return parent.isPublic
  },
  isNsfw(parent) {
    return parent.isNsfw
  },
  isDeleted(parent) {
    return parent.isDeleted
  },
  isSingle(parent) {
    return parent.isSingle
  },
  isBase(parent) {
    return parent.isBase
  },
  firstWork(parent) {
    return db.prompt.findUnique({ where: { id: parent.id } }).firstPost()
  },
  secondWork(parent) {
    return db.prompt.findUnique({ where: { id: parent.id } }).secondPost()
  },
  async works(parent) {
    const works = await db.prompt
      .findUnique({ where: { id: parent.id } })
      .posts()
    return works || []
  },
}
