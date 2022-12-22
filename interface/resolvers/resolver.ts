import { createUserResolver } from "interface/resolvers/createUserResolver"
import { createWorkLikeResolver } from "interface/resolvers/createWorkLikeResolver"
import { createWorkResolver } from "interface/resolvers/createWorkResolver"
import { deleteWorkLikeResolver } from "interface/resolvers/deleteWorkLikeResolver"
import { followUserResolver } from "interface/resolvers/followUserResolver"
import { LabelNodeResolvers } from "interface/resolvers/labelNodeResolvers"
import { QueryResolvers } from "interface/resolvers/queryResolvers"
import { unfollowUserResolver } from "interface/resolvers/unfollowUserResolver"
import { updateUserResolver } from "interface/resolvers/updateUserResolver"
import { updateWorkResolver } from "interface/resolvers/updateWorkResolver"
import { UserNodeResolvers } from "interface/resolvers/userNodeResolvers"
import { WorkNodeResolvers } from "interface/resolvers/workNodeResolvers"

const Mutation = {
  createUser: createUserResolver,
  createWork: createWorkResolver,
  createWorkLike: createWorkLikeResolver,
  deleteWorkLike: deleteWorkLikeResolver,
  followUser: followUserResolver,
  unfollowUser: unfollowUserResolver,
  updateUser: updateUserResolver,
  updateWork: updateWorkResolver,
}

export const resolvers = {
  Mutation,
  Query: QueryResolvers,
  WorkNode: WorkNodeResolvers,
  UserNode: UserNodeResolvers,
  LabelNode: LabelNodeResolvers,
}
