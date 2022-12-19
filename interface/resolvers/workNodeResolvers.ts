import type { Post } from "@prisma/client"
import db from "db"
import type { WorkNode } from "interface/__generated__/node"
import type { PrismaResolvers } from "interface/resolvers/types/prismaResolvers"

export const WorkNodeResolvers: PrismaResolvers<WorkNode, Post> = {
  id(parent) {
    return parent.id
  },
  createdAt(parent) {
    return Math.floor(parent.createdAt.getTime() / 1000)
  },
  title(parent) {
    return parent.title
  },
  fileId(parent) {
    return parent.fileId
  },
  prompt(parent) {
    return parent.prompt
  },
  model(parent) {
    return parent.model
  },
  likesCount(parent) {
    return parent.likesCount
  },
  colors(parent) {
    return parent.colors
  },
  webColors(parent) {
    return parent.webColors
  },
  annotationAdult(parent) {
    return parent.annotationAdult
  },
  annotationMedical(parent) {
    return parent.annotationMedical
  },
  annotationRacy(parent) {
    return parent.annotationRacy
  },
  annotationSpoof(parent) {
    return parent.annotationSpoof
  },
  annotationViolence(parent) {
    return parent.annotationViolence
  },
  user(parent) {
    return db.post.findUnique({ where: { id: parent.id } }).user()
  },
  labels(parent) {
    return db.post.findUnique({ where: { id: parent.id } }).labels()
  },
  async isLike(parent, _, ctx) {
    if (ctx.currentUser === null) return false
    const like = await db.like.findUnique({
      where: {
        userId_postId: {
          userId: ctx.currentUser!.uid,
          postId: parent.id,
        },
      },
    })
    return like !== null
  },
}
