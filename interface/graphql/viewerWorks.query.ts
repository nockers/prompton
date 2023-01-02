import { gql } from "@apollo/client"

export default gql`
  query ViewerWorks($offset: Int, $limit: Int) {
    viewer {
      works(offset: $offset, limit: $limit) {
        id
        createdAt
        title
        fileId
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
  }
`
