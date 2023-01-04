import { gql } from "@apollo/client"

export default gql`
  query Works($offset: Int, $limit: Int, $where: WorksWhereInput) {
    works(offset: $offset, limit: $limit, where: $where) {
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
