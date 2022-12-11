import { MutationResolvers, QueryResolvers } from "interface/__generated__/node"
import { createPostResolver } from "interface/resolvers/createPostResolver"
import { createUserResolver } from "interface/resolvers/createUserResolver"
import { labelsResolver } from "interface/resolvers/labelsResolver"
import { postsResolver } from "interface/resolvers/postsResolver"
import { updatePostResolver } from "interface/resolvers/updatePostResolver"
import { updateUserResolver } from "interface/resolvers/updateUserResolver"
import { userResolver } from "interface/resolvers/userResolver"

const Mutation: MutationResolvers = {
  createUser: createUserResolver,
  createPost: createPostResolver,
  updateUser: updateUserResolver,
  updatePost: updatePostResolver,
}

const Query: QueryResolvers = {
  user: userResolver,
  posts: postsResolver,
  labels: labelsResolver,
}

export const resolvers = {
  Mutation,
  Query,
}
