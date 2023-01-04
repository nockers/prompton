import { gql } from "@apollo/client"

export default gql`
  query Users($offset: Int, $limit: Int) {
    users(offset: $offset, limit: $limit) {
      id
      name
      avatarImageURL
      avatarImageId
      headerImageId
      biography
      createdAt
      isFollowee
      isRequestable
      isRequestableForFree
      works {
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
        user {
          id
          name
          avatarImageURL
          isFollowee
        }
      }
    }
  }
`
