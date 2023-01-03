import { gql } from "@apollo/client"

export default gql`
  query ViewerLikedWorks($offset: Int, $limit: Int) {
    viewer {
      likedWorks(offset: $offset, limit: $limit) {
        id
        createdAt
        title
        fileId
        imageURL
        thumbnailURL
        squareThumbnailURL
        likesCount
        prompt
        model
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
