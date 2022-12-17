import { Label } from "@prisma/client"
import db from "db"
import { LabelNode } from "interface/__generated__/node"
import { PrismaResolvers } from "interface/resolvers/types/prismaResolvers"

export const LabelNodeResolvers: PrismaResolvers<LabelNode, Label> = {
  id(parent) {
    return parent.id
  },
  name(parent) {
    return parent.name
  },
  async count(parent) {
    const label = await db.label.findUnique({
      where: { id: parent.id },
      include: { _count: { select: { posts: true } } },
    })
    return label?._count?.posts ?? 0
  },
  async works(parent) {
    const posts = await db.label
      .findUnique({ where: { id: parent.id } })
      .posts({
        orderBy: { createdAt: "desc" },
        where: { isDeleted: false },
      })
    return posts ?? []
  },
}
