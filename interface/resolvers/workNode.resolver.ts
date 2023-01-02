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
  async likesCount(parent) {
    const post = await db.post.findUnique({
      where: { id: parent.id },
      select: { _count: { select: { likes: true } } },
    })
    return post?._count.likes ?? 0
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
    return db.post.findUnique({ where: { id: parent.id } }).labels({
      where: { isDeleted: false },
    })
  },
  isDeleted(parent) {
    return parent.isDeleted
  },
  async isLiked(parent, _, ctx) {
    if (ctx.currentUser === null) return false
    const likes = await db.post.findUnique({ where: { id: parent.id } }).likes({
      take: 1,
      where: { userId: ctx.currentUser!.uid },
    })
    const [like = null] = likes ?? []
    return like !== null
  },
  async isBookmarked(parent, _, ctx) {
    if (ctx.currentUser === null) return false
    const bookmarks = await db.post
      .findUnique({ where: { id: parent.id } })
      .bookmarks({
        take: 1,
        where: { userId: ctx.currentUser!.uid },
      })
    const [bookmark = null] = bookmarks ?? []
    return bookmark !== null
  },
}
