import { gql } from "@apollo/client"

export default gql`
  query ViewerBookmarkedWorks($offset: Int, $limit: Int) {
    viewer {
      bookmarkedWorks(offset: $offset, limit: $limit) {
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
