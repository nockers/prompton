import { createPostLikeResolver } from "interface/resolvers/createPostLikeResolver"
import { createUserResolver } from "interface/resolvers/createUserResolver"
import { createWorkResolver } from "interface/resolvers/createWorkResolver"
import { deletePostLikeResolver } from "interface/resolvers/deletePostLikeResolver"
import { followUserResolver } from "interface/resolvers/followUserResolver"
import { LabelNodeResolvers } from "interface/resolvers/labelNodeResolvers"
import { QueryResolvers } from "interface/resolvers/queryResolvers"
import { unfollowUserResolver } from "interface/resolvers/unfollowUserResolver"
import { updateWorkResolver } from "interface/resolvers/updatePostResolver"
import { updateUserResolver } from "interface/resolvers/updateUserResolver"
import { UserNodeResolvers } from "interface/resolvers/userNodeResolvers"
import { WorkNodeResolvers } from "interface/resolvers/workNodeResolvers"

const Mutation = {
  createUser: createUserResolver,
  createWork: createWorkResolver,
  updateUser: updateUserResolver,
  updateWork: updateWorkResolver,
  createPostLike: createPostLikeResolver,
  deletePostLike: deletePostLikeResolver,
  unfollowUser: unfollowUserResolver,
  followUser: followUserResolver,
}

export const resolvers = {
  Mutation,
  Query: QueryResolvers,
  WorkNode: WorkNodeResolvers,
  UserNode: UserNodeResolvers,
  LabelNode: LabelNodeResolvers,
}
