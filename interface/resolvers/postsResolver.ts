import db from "db"
import {
  LabelNode,
  PostEdge,
  QueryResolvers,
  UserNode,
} from "interface/__generated__/node"

export const postsResolver: QueryResolvers["posts"] = async (_, args) => {
  const posts = await db.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true, labels: true },
  })

  const postEdges = posts.map((post): PostEdge => {
    const user: UserNode = {
      id: post.user.id,
      name: post.user.name,
      createdAt: Math.floor(post.user.createdAt.getTime() / 1000),
      avatarImageURL: post.user.avatarImageURL,
      avatarImageId: post.user.avatarFileId,
      headerImageId: null,
      biography: "",
      login: null,
      posts: {
        totalCount: 0,
        edges: [],
        pageInfo: {
          endCursor: null,
          hasNextPage: false,
        },
      },
    }
    const labels: LabelNode[] = post.labels.map((label) => {
      return {
        id: label.id,
        name: label.name,
      }
    })
    return {
      cursor: "",
      node: {
        id: post.id,
        createdAt: Math.floor(post.createdAt.getTime() / 1000),
        fileId: post.fileId,
        title: post.title,
        prompt: post.prompt,
        model: post.model,
        likeCount: 0,
        user: user,
        annotationAdult: post.annotationAdult,
        annotationMedical: post.annotationMedical,
        annotationViolence: post.annotationViolence,
        annotationRacy: post.annotationRacy,
        annotationSpoof: post.annotationSpoof,
        colors: post.colors,
        labels: labels,
      },
    }
  })

  return {
    totalCount: posts.length,
    edges: postEdges,
    pageInfo: {
      endCursor: "",
      hasNextPage: false,
    },
  }
}
