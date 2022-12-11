import { gql } from "@apollo/client"

export default gql`
  query Posts($after: ID, $labelName: String, $color: String) {
    posts(after: $after, labelName: $labelName, color: $color) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          createdAt
          title
          fileId
          likeCount
          prompt
          model
          annotationAdult
          annotationMedical
          annotationViolence
          annotationRacy
          annotationSpoof
          colors
          webColors
          labels {
            id
            name
            count
          }
          user {
            id
            name
            avatarImageURL
          }
        }
      }
    }
  }
`
