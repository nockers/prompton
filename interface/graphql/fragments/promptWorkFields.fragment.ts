import { gql } from "@apollo/client"
import { WorkLabelFields } from "interface/graphql/fragments/workLabelFields.fragment"
import { WorkUserFields } from "interface/graphql/fragments/workUserFields.fragment"

export const PromptWorkFields = gql`
  ${WorkLabelFields}
  ${WorkUserFields}
  fragment PromptWorkFields on WorkNode {
    id
    createdAt
    title
    fileId
    imageURL
    thumbnailURL
    squareThumbnailURL
    likesCount
    prompt
    detectedPrompt
    software
    detectedSoftware
    seed
    detectedSeed
    annotationAdult
    annotationMedical
    annotationViolence
    annotationRacy
    annotationSpoof
    colors
    webColors
    isLiked
    isBookmarked
    isDeleted
    labels {
      ...WorkLabelFields
    }
    user {
      ...WorkUserFields
    }
  }
`
