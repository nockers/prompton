import { acceptRequestResolver } from "interface/resolvers/acceptRequestResolver"
import { cancelRequestResolver } from "interface/resolvers/cancelRequestResolver"
import { closeRequestResolver } from "interface/resolvers/closeRequestResolver"
import { createDeliverableResolver } from "interface/resolvers/createDeliverableResolver"
import { createPaymentMethodResolver } from "interface/resolvers/createPaymentMethodResolver"
import { createPlanResolver } from "interface/resolvers/createPlanResolver"
import { createRequestResolver } from "interface/resolvers/createRequestResolver"
import { createUserResolver } from "interface/resolvers/createUserResolver"
import { createWorkBookmarkResolver } from "interface/resolvers/createWorkBookmarkResolver"
import { createWorkLikeResolver } from "interface/resolvers/createWorkLikeResolver"
import { createWorkResolver } from "interface/resolvers/createWorkResolver"
import { deleteDeliverableResolver } from "interface/resolvers/deleteDeliverableResolver"
import { deletePaymentMethodResolver } from "interface/resolvers/deletePaymentMethodResolver"
import { deletePlanResolver } from "interface/resolvers/deletePlanSortResolver"
import { deleteWorkBookmarkResolver } from "interface/resolvers/deleteWorkBookmarkResolver"
import { deleteWorkLikeResolver } from "interface/resolvers/deleteWorkLikeResolver"
import { deleteWorkResolver } from "interface/resolvers/deleteWorkResolver"
import { followUserResolver } from "interface/resolvers/followUserResolver"
import { LabelNodeResolvers } from "interface/resolvers/labelNodeResolvers"
import { PaymentMethodNodeResolvers } from "interface/resolvers/paymentMethodNodeResolvers"
import { QueryResolvers } from "interface/resolvers/queryResolvers"
import { rejectRequestResolver } from "interface/resolvers/rejectRequestResolver"
import { RequestNodeResolvers } from "interface/resolvers/requestNodeResolvers"
import { unfollowUserResolver } from "interface/resolvers/unfollowUserResolver"
import { updateDeliverableResolver } from "interface/resolvers/updateDeliverableResolver"
import { updatePlanResolver } from "interface/resolvers/updatePlanResolver"
import { updatePlanSortResolver } from "interface/resolvers/updatePlanSortResolver"
import { updateUserProfileResolver } from "interface/resolvers/updateUserProfileResolver"
import { updateUserRequestSettingsResolver } from "interface/resolvers/updateUserRequestSettingsResolver"
import { updateWorkResolver } from "interface/resolvers/updateWorkResolver"
import { UserNodeResolvers } from "interface/resolvers/userNodeResolvers"
import { ViewerResolvers } from "interface/resolvers/viewerResolvers"
import { WorkNodeResolvers } from "interface/resolvers/workNodeResolvers"

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
