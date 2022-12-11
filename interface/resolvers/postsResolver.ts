import db from "db"
import {
  LabelNode,
  PostEdge,
  QueryResolvers,
  UserNode,
} from "interface/__generated__/node"

export const postsResolver: QueryResolvers["posts"] = async (_, args) => {
  console.log("args", args)

  const posts = await db.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      labels: {
        include: { _count: { select: { posts: true } } },
        orderBy: { posts: { _count: "desc" } },
      },
    },
    where: args.labelName
      ? {
          labels: {
            some: { name: args.labelName! },
          },
        }
      : args.color
      ? {
          webColors: {
            has: `#${args.color}`,
          },
        }
      : undefined,
  })

  // for (const post of posts) {
  //   if (post.webColors.length !== 0) continue
  //   const command = container.resolve(UpdatePostColorsCommand)
  //   command.execute({ postId: post.id })
  // }

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
      posts: [],
    }
    const labels: LabelNode[] = post.labels.map((label) => {
      return {
        id: label.id,
        name: label.name,
        count: label._count.posts,
        posts: [],
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
        webColors: post.webColors,
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
