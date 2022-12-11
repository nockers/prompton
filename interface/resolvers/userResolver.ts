import { ApolloServerErrorCode } from "@apollo/server/errors"
import { GraphQLError } from "graphql"
import db from "db"
import {
  LabelNode,
  PostNode,
  QueryResolvers,
  UserNode,
} from "interface/__generated__/node"

export const userResolver: QueryResolvers["user"] = async (_, args) => {
  const user = await db.user.findUnique({
    where: { id: args.id },
  })

  if (user === null) {
    throw new GraphQLError("ERROR", {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  }

  const posts = await db.post.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { labels: { include: { _count: { select: { posts: true } } } } },
  })

  const postNodes = posts.map((post): PostNode => {
    const labels: LabelNode[] = post.labels.map((label) => {
      return {
        id: label.id,
        name: label.name,
        posts: [],
        count: label._count.posts,
      }
    })
    return {
      id: post.id,
      createdAt: Math.floor(post.createdAt.getTime() / 1000),
      fileId: post.fileId,
      title: post.title,
      model: post.model,
      prompt: post.prompt,
      likeCount: 0,
      annotationAdult: post.annotationAdult,
      annotationMedical: post.annotationMedical,
      annotationViolence: post.annotationViolence,
      annotationRacy: post.annotationRacy,
      annotationSpoof: post.annotationSpoof,
      colors: post.colors,
      webColors: post.webColors,
      labels: labels,
      user: {
        id: user.id,
        name: user.name,
        createdAt: Math.floor(user.createdAt.getTime() / 1000),
        avatarImageURL: user.avatarImageURL,
        avatarImageId: user.avatarFileId,
        login: null,
        headerImageId: null,
        biography: "",
        posts: [],
      },
    }
  })

  const node: UserNode = {
    id: user.id,
    name: user.name,
    login: null,
    createdAt: Math.floor(user.createdAt.getTime() / 1000),
    avatarImageURL: user.avatarImageURL,
    avatarImageId: user.avatarFileId,
    headerImageId: null,
    biography: "",
    posts: postNodes,
  }

  return node
}
