import { Post } from "@prisma/client"
import db from "db"
import { WorkNode } from "interface/__generated__/node"
import { PrismaResolvers } from "interface/resolvers/types/prismaResolvers"

export const WorkNodeResolvers: PrismaResolvers<WorkNode, Post> = {
  id(parent: Post) {
    return parent.id
  },
  createdAt(parent: Post) {
    return Math.floor(parent.createdAt.getTime() / 1000)
  },
  title(parent: Post) {
    return parent.title
  },
  fileId(parent: Post) {
    return parent.fileId
  },
  prompt(parent: Post) {
    return parent.prompt
  },
  model(parent: Post) {
    return parent.model
  },
  likeCount() {
    return 0
  },
  colors(parent: Post) {
    return parent.colors
  },
  webColors(parent: Post) {
    return parent.webColors
  },
  annotationAdult(parent: Post) {
    return parent.annotationAdult
  },
  annotationMedical(parent: Post) {
    return parent.annotationMedical
  },
  annotationRacy(parent: Post) {
    return parent.annotationRacy
  },
  annotationSpoof(parent: Post) {
    return parent.annotationSpoof
  },
  annotationViolence(parent: Post) {
    return parent.annotationViolence
  },
  async user(parent: Post) {
    return db.post.findUnique({ where: { id: parent.id } }).user()
  },
  async labels(parent: Post) {
    return db.post.findUnique({ where: { id: parent.id } }).labels()
  },
}
