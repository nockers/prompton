import db from "db"
import type {
  Viewer,
  ViewerFolloweesArgs,
  ViewerLikedWorksArgs,
  ViewerWorksArgs,
} from "interface/__generated__/node"
import type { PrismaResolvers } from "interface/resolvers/types/prismaResolvers"

type Resolvers = PrismaResolvers<Viewer, {}>

export const ViewerResolvers: Resolvers = {
  user(_, __, context) {
    return db.user.findUnique({
      where: { id: context.currentUser!.uid! },
    })
  },
  works(_, args: Partial<ViewerWorksArgs>, context) {
    const take = args.limit || 9 * 4
    const skip = args.offset || 0
    return db.post.findMany({
      orderBy: { createdAt: "desc" },
      take: take,
      skip: skip,
      where: {
        isDeleted: false,
        userId: context.currentUser!.uid!,
      },
    })
  },
  likedWorks(_, args: Partial<ViewerLikedWorksArgs>, context) {
    const take = args.limit || 9 * 4
    const skip = args.offset || 0
    return db.post.findMany({
      orderBy: { createdAt: "desc" },
      take: take,
      skip: skip,
      where: {
        isDeleted: false,
        likes: { some: { userId: context.currentUser!.uid! } },
      },
    })
  },
  bookmarkedWorks(_, args: Partial<ViewerLikedWorksArgs>, context) {
    const take = args.limit || 9 * 4
    const skip = args.offset || 0
    return db.post.findMany({
      orderBy: { createdAt: "desc" },
      take: take,
      skip: skip,
      where: {
        isDeleted: false,
        bookmarks: { some: { userId: context.currentUser!.uid! } },
      },
    })
  },
  followees(_, args: Partial<ViewerFolloweesArgs>, context) {
    const take = args.limit || 9 * 4
    const skip = args.offset || 0
    return db.user.findMany({
      orderBy: { createdAt: "desc" },
      take: take,
      skip: skip,
      where: {
        followers: {
          some: { followerId: context.currentUser!.uid! },
        },
      },
    })
  },
  plans() {
    return []
  },
  requests(_, __, context) {
    return db.request.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        OR: [
          { senderId: context.currentUser!.uid! },
          { recipientId: context.currentUser!.uid! },
        ],
      },
    })
  },
  sentRequests(_, __, context) {
    return db.request.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        senderId: context.currentUser!.uid!,
      },
    })
  },
  receivedRequests(_, __, context) {
    return db.request.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        recipientId: context.currentUser!.uid!,
      },
    })
  },
  deliverables(_, __, context) {
    return db.post.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        userId: context.currentUser!.uid!,
        isDeleted: false,
        requestId: { not: null },
      },
    })
  },
  prompts(_, __, context) {
    return db.prompt.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        userId: context.currentUser!.uid!,
        isDeleted: false,
      },
    })
  },
}
