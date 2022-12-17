import { createUserResolver } from "interface/resolvers/createUserResolver"
import { createWorkResolver } from "interface/resolvers/createWorkResolver"
import { LabelNodeResolvers } from "interface/resolvers/labelNodeResolvers"
import { QueryResolvers } from "interface/resolvers/queryResolvers"
import { updateWorkResolver } from "interface/resolvers/updatePostResolver"
import { updateUserResolver } from "interface/resolvers/updateUserResolver"
import { UserNodeResolvers } from "interface/resolvers/userNodeResolvers"
import { WorkNodeResolvers } from "interface/resolvers/workNodeResolvers"

const Mutation = {
  createUser: createUserResolver,
  createWork: createWorkResolver,
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
