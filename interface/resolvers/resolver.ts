import { createPostResolver } from "interface/resolvers/createPostResolver"
import { createUserResolver } from "interface/resolvers/createUserResolver"
import { LabelNodeResolver } from "interface/resolvers/labelNodeResolver"
import { PostNodeResolver } from "interface/resolvers/postNodeResolver"
import { QueryResolver } from "interface/resolvers/queryResolver"
import { updatePostResolver } from "interface/resolvers/updatePostResolver"
import { updateUserResolver } from "interface/resolvers/updateUserResolver"
import { UserNodeResolver } from "interface/resolvers/userNodeResolver"

const Mutation = {
  createUser: createUserResolver,
  createPost: createPostResolver,
  updateUser: updateUserResolver,
  updatePost: updatePostResolver,
}

export const resolvers = {
  Mutation,
  Query: QueryResolver,
  PostNode: PostNodeResolver,
  UserNode: UserNodeResolver,
  LabelNode: LabelNodeResolver,
}
