import { gql } from "@apollo/client"

export default gql`
  query Work($id: ID!) {
    work(id: $id) {
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
        id
        name
        nameJA
        count
      }
      user {
        id
        name
        avatarImageURL
        isFollowee
      }
    }
  }
`
