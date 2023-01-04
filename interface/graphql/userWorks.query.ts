import { gql } from "@apollo/client"

export default gql`
  query UserWorks($offset: Int, $limit: Int, $userId: String!) {
    works(offset: $offset, limit: $limit, where: { userId: $userId }) {
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
      labels {
        id
        name
        nameJA
        count
      }
    }
  }
`
