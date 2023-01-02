import { LabelNodeResolvers } from "interface/resolvers/labelNode.resolver"
import { acceptRequestResolver } from "interface/resolvers/mutations/acceptRequest.resolver"
import { cancelRequestResolver } from "interface/resolvers/mutations/cancelRequest.resolver"
import { closeRequestResolver } from "interface/resolvers/mutations/closeRequest.resolver"
import { createDeliverableResolver } from "interface/resolvers/mutations/createDeliverable.resolver"
import { createPaymentMethodResolver } from "interface/resolvers/mutations/createPaymentMethod.resolver"
import { createPlanResolver } from "interface/resolvers/mutations/createPlan.resolver"
import { createRequestResolver } from "interface/resolvers/mutations/createRequest.resolver"
import { createUserResolver } from "interface/resolvers/mutations/createUser.resolver"
import { createWorkResolver } from "interface/resolvers/mutations/createWork.resolver"
import { createWorkBookmarkResolver } from "interface/resolvers/mutations/createWorkBookmark.resolver"
import { createWorkLikeResolver } from "interface/resolvers/mutations/createWorkLike.resolver"
import { deleteDeliverableResolver } from "interface/resolvers/mutations/deleteDeliverable.resolver"
import { deletePaymentMethodResolver } from "interface/resolvers/mutations/deletePaymentMethod.resolver"
import { deletePlanResolver } from "interface/resolvers/mutations/deletePlanSort.resolver"
import { deleteWorkResolver } from "interface/resolvers/mutations/deleteWork.resolver"
import { deleteWorkBookmarkResolver } from "interface/resolvers/mutations/deleteWorkBookmark.resolver"
import { deleteWorkLikeResolver } from "interface/resolvers/mutations/deleteWorkLike.resolver"
import { followUserResolver } from "interface/resolvers/mutations/followUser.resolver"
import { rejectRequestResolver } from "interface/resolvers/mutations/rejectRequest.resolver"
import { unfollowUserResolver } from "interface/resolvers/mutations/unfollowUser.resolver"
import { updateDeliverableResolver } from "interface/resolvers/mutations/updateDeliverable.resolver"
import { updatePlanResolver } from "interface/resolvers/mutations/updatePlan.resolver"
import { updatePlanSortResolver } from "interface/resolvers/mutations/updatePlanSort.resolver"
import { updateUserProfileResolver } from "interface/resolvers/mutations/updateUserProfile.resolver"
import { updateUserRequestSettingsResolver } from "interface/resolvers/mutations/updateUserRequestSettings.resolver"
import { updateWorkResolver } from "interface/resolvers/mutations/updateWork.resolver"
import { PaymentMethodNodeResolvers } from "interface/resolvers/paymentMethodNode.resolver"
import { QueryResolvers } from "interface/resolvers/query.resolver"
import { RequestNodeResolvers } from "interface/resolvers/requestNode.resolver"
import { UserNodeResolvers } from "interface/resolvers/userNode.resolvers"
import { ViewerResolvers } from "interface/resolvers/viewer.resolver"
import { WorkNodeResolvers } from "interface/resolvers/workNode.resolver"

const MutationResolvers = {
  createDeliverable: createDeliverableResolver,
  createPlan: createPlanResolver,
  createRequest: createRequestResolver,
  createUser: createUserResolver,
  createWork: createWorkResolver,
  createWorkBookmark: createWorkBookmarkResolver,
  createWorkLike: createWorkLikeResolver,
  deleteDeliverable: deleteDeliverableResolver,
  deletePlan: deletePlanResolver,
  deleteWork: deleteWorkResolver,
  deleteWorkBookmark: deleteWorkBookmarkResolver,
  deleteWorkLike: deleteWorkLikeResolver,
  followUser: followUserResolver,
  acceptRequest: acceptRequestResolver,
  rejectRequest: rejectRequestResolver,
  closeRequest: closeRequestResolver,
  cancelRequest: cancelRequestResolver,
  unfollowUser: unfollowUserResolver,
  updateDeliverable: updateDeliverableResolver,
  updatePlan: updatePlanResolver,
  updatePlanSort: updatePlanSortResolver,
  updateUserProfile: updateUserProfileResolver,
  updateUserRequestSettings: updateUserRequestSettingsResolver,
  updateWork: updateWorkResolver,
  createPaymentMethod: createPaymentMethodResolver,
  deletePaymentMethod: deletePaymentMethodResolver,
}

export const resolvers = {
  Mutation: MutationResolvers,
  Query: QueryResolvers,
  UserNode: UserNodeResolvers,
  WorkNode: WorkNodeResolvers,
  LabelNode: LabelNodeResolvers,
  RequestNode: RequestNodeResolvers,
  PaymentMethodNode: PaymentMethodNodeResolvers,
  Viewer: ViewerResolvers,
}
