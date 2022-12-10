import { MutationResolvers, QueryResolvers } from "interface/__generated__/node"
import { createPostResolver } from "interface/resolvers/createPostResolver"
import { createUserResolver } from "interface/resolvers/createUserResolver"
import { postsResolver } from "interface/resolvers/postsResolver"
import { updateUserResolver } from "interface/resolvers/updateUserResolver"
import { userResolver } from "interface/resolvers/userResolver"

const Mutation: MutationResolvers = {
  createUser: createUserResolver,
  createPost: createPostResolver,
  updateUser: updateUserResolver,
}

const Query: QueryResolvers = {
  user: userResolver,
  posts: postsResolver,
}

export const resolvers = {
  Mutation,
  Query,
}
