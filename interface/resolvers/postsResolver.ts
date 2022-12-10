import db from "db"
import {
  PostEdge,
  QueryResolvers,
  UserNode,
} from "interface/__generated__/node"

export const postsResolver: QueryResolvers["posts"] = async (_, args) => {
  const posts = await db.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true },
  })

  const postEdges = posts.map((post): PostEdge => {
    const user: UserNode = {
      id: post.user.id,
      name: post.user.name,
      createdAt: Math.floor(post.user.createdAt.getTime() / 1000),
      avatarImageURL: post.user.avatarImageURL ?? null,
      avatarImageId: post.user.avatarFileId ?? null,
      headerImageId: null,
      biography: "",
      posts: {
        totalCount: 0,
        edges: [],
        pageInfo: {
          endCursor: null,
          hasNextPage: false,
        },
      },
    }
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
