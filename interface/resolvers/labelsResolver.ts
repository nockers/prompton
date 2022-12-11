import db from "db"
import {
  LabelEdge,
  PostNode,
  QueryResolvers,
} from "interface/__generated__/node"

export const labelsResolver: QueryResolvers["labels"] = async (_, args) => {
  const labels = await db.label.findMany({
    orderBy: {
      posts: {
        _count: "desc",
      },
    },
    include: {
      _count: { select: { posts: true } },
      posts: {
        include: { user: true },
      },
    },
    take: 16,
  })

  const edges = labels.map((label): LabelEdge => {
    const posts: PostNode[] = label.posts.map((post) => {
      return {
        id: post.id,
        createdAt: Math.floor(post.createdAt.getTime() / 1000),
        fileId: post.fileId,
        title: post.title,
        prompt: post.prompt,
        model: post.model,
        likeCount: 0,
        annotationAdult: post.annotationAdult,
        annotationMedical: post.annotationMedical,
        annotationViolence: post.annotationViolence,
        annotationRacy: post.annotationRacy,
        annotationSpoof: post.annotationSpoof,
        colors: post.colors,
        webColors: post.webColors,
        labels: [],
        user: {
          id: post.user.id,
          name: post.user.name,
          createdAt: Math.floor(post.user.createdAt.getTime() / 1000),
          avatarImageURL: post.user.avatarImageURL,
          avatarImageId: post.user.avatarFileId,
          login: null,
          headerImageId: null,
          biography: "",
          posts: [],
        },
      }
    })
    return {
      cursor: "",
      node: {
        id: label.id,
        name: label.name,
        posts: posts,
        count: label._count.posts,
      },
    }
  })

  return {
    totalCount: labels.length,
    edges: edges,
    pageInfo: {
      endCursor: "",
      hasNextPage: false,
    },
  }
}
