import { createPostResolver } from "interface/resolvers/createPostResolver"
import { createUserResolver } from "interface/resolvers/createUserResolver"
import { LabelNodeResolvers } from "interface/resolvers/labelNodeResolvers"
import { PostNodeResolvers } from "interface/resolvers/postNodeResolvers"
import { QueryResolvers } from "interface/resolvers/queryResolvers"
import { updatePostResolver } from "interface/resolvers/updatePostResolver"
import { updateUserResolver } from "interface/resolvers/updateUserResolver"
import { UserNodeResolvers } from "interface/resolvers/userNodeResolvers"

const Mutation = {
  createUser: createUserResolver,
  createPost: createPostResolver,
  updateUser: updateUserResolver,
  updatePost: updatePostResolver,
}

export const resolvers = {
  Mutation,
  Query: QueryResolvers,
  PostNode: PostNodeResolvers,
  UserNode: UserNodeResolvers,
  LabelNode: LabelNodeResolvers,
}
