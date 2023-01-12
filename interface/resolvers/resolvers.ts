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
import { deletePaymentMethodResolver } from "interface/resolvers/mutations/deletePaymentMethod.resolver"
import { deletePlanResolver } from "interface/resolvers/mutations/deletePlan.resolver"
import { deleteWorkResolver } from "interface/resolvers/mutations/deleteWork.resolver"
import { deleteWorkBookmarkResolver } from "interface/resolvers/mutations/deleteWorkBookmark.resolver"
import { deleteWorkLikeResolver } from "interface/resolvers/mutations/deleteWorkLike.resolver"
import { followUserResolver } from "interface/resolvers/mutations/followUser.resolver"
import { rejectRequestResolver } from "interface/resolvers/mutations/rejectRequest.resolver"
import { unfollowUserResolver } from "interface/resolvers/mutations/unfollowUser.resolver"
import { updatePlanResolver } from "interface/resolvers/mutations/updatePlan.resolver"
import { updatePlanSortResolver } from "interface/resolvers/mutations/updatePlanSort.resolver"
import { updateUserProfileResolver } from "interface/resolvers/mutations/updateUserProfile.resolver"
import { updateUserRequestSettingsResolver } from "interface/resolvers/mutations/updateUserRequestSettings.resolver"
import { updateWorkResolver } from "interface/resolvers/mutations/updateWork.resolver"
import { PaymentMethodNodeResolvers } from "interface/resolvers/paymentMethodNode.resolver"
import {
  createPromptResolver,
  createPromptWorkResolver,
  deletePromptResolver,
  updatePromptResolver,
} from "interface/resolvers/prompt"
import { PromptNodeResolvers } from "interface/resolvers/promptNode.resolver"
import { QueryResolvers } from "interface/resolvers/query.resolver"
import { RequestNodeResolvers } from "interface/resolvers/requestNode.resolver"
import { UserNodeResolvers } from "interface/resolvers/userNode.resolvers"
import { ViewerResolvers } from "interface/resolvers/viewer.resolver"
import { WorkNodeResolvers } from "interface/resolvers/workNode.resolver"

const MutationResolvers = {
  acceptRequest: acceptRequestResolver,
  cancelRequest: cancelRequestResolver,
  closeRequest: closeRequestResolver,
  createDeliverable: createDeliverableResolver,
  createPaymentMethod: createPaymentMethodResolver,
  createPlan: createPlanResolver,
  createPrompt: createPromptResolver,
  createPromptWork: createPromptWorkResolver,
  createRequest: createRequestResolver,
  createUser: createUserResolver,
  createWork: createWorkResolver,
  createWorkBookmark: createWorkBookmarkResolver,
  createWorkLike: createWorkLikeResolver,
  deletePaymentMethod: deletePaymentMethodResolver,
  deletePlan: deletePlanResolver,
  deletePrompt: deletePromptResolver,
  deleteWork: deleteWorkResolver,
  deleteWorkBookmark: deleteWorkBookmarkResolver,
  deleteWorkLike: deleteWorkLikeResolver,
  followUser: followUserResolver,
  rejectRequest: rejectRequestResolver,
  unfollowUser: unfollowUserResolver,
  updatePlan: updatePlanResolver,
  updatePlanSort: updatePlanSortResolver,
  updatePrompt: updatePromptResolver,
  updateUserProfile: updateUserProfileResolver,
  updateUserRequestSettings: updateUserRequestSettingsResolver,
  updateWork: updateWorkResolver,
}

export const resolvers = {
  LabelNode: LabelNodeResolvers,
  Mutation: MutationResolvers,
  PaymentMethodNode: PaymentMethodNodeResolvers,
  PromptNode: PromptNodeResolvers,
  Query: QueryResolvers,
  RequestNode: RequestNodeResolvers,
  UserNode: UserNodeResolvers,
  Viewer: ViewerResolvers,
  WorkNode: WorkNodeResolvers,
}
