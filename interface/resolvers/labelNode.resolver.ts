import type { Label } from "@prisma/client"
import db from "db"
import type { LabelNode } from "interface/__generated__/node"
import type { PrismaResolvers } from "interface/resolvers/types/prismaResolvers"

export const LabelNodeResolvers: PrismaResolvers<LabelNode, Label> = {
  id(parent) {
    return parent.id
  },
  name(parent) {
    return parent.name
  },
  nameJA(parent) {
    return parent.nameJA
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
        take: 4,
      })
    return posts ?? []
  },
}
