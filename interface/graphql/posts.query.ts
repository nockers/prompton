import { gql } from "@apollo/client"

export default gql`
  query Posts($after: ID) {
    posts(after: $after) {
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
