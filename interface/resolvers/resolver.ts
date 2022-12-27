import { createUserResolver } from "interface/resolvers/createUserResolver"
import { createWorkBookmarkResolver } from "interface/resolvers/createWorkBookmarkResolver"
import { createWorkLikeResolver } from "interface/resolvers/createWorkLikeResolver"
import { createWorkResolver } from "interface/resolvers/createWorkResolver"
import { deleteWorkBookmarkResolver } from "interface/resolvers/deleteWorkBookmarkResolver"
import { deleteWorkLikeResolver } from "interface/resolvers/deleteWorkLikeResolver"
import { followUserResolver } from "interface/resolvers/followUserResolver"
import { LabelNodeResolvers } from "interface/resolvers/labelNodeResolvers"
import { QueryResolvers } from "interface/resolvers/queryResolvers"
import { unfollowUserResolver } from "interface/resolvers/unfollowUserResolver"
import { updateUserResolver } from "interface/resolvers/updateUserResolver"
import { updateWorkResolver } from "interface/resolvers/updateWorkResolver"
import { UserNodeResolvers } from "interface/resolvers/userNodeResolvers"
import { ViewerResolvers } from "interface/resolvers/viewerResolvers"
import { WorkNodeResolvers } from "interface/resolvers/workNodeResolvers"

const MutationResolvers = {
  createUser: createUserResolver,
  createWork: createWorkResolver,
  createWorkLike: createWorkLikeResolver,
  deleteWorkLike: deleteWorkLikeResolver,
  createWorkBookmark: createWorkBookmarkResolver,
  deleteWorkBookmark: deleteWorkBookmarkResolver,
  followUser: followUserResolver,
  unfollowUser: unfollowUserResolver,
  updateUser: updateUserResolver,
  updateWork: updateWorkResolver,
}

export const resolvers = {
  Mutation: MutationResolvers,
  Query: QueryResolvers,
  UserNode: UserNodeResolvers,
  WorkNode: WorkNodeResolvers,
  LabelNode: LabelNodeResolvers,
  Viewer: ViewerResolvers,
}
