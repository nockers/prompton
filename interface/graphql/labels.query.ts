import { gql } from "@apollo/client"

export default gql`
  query Labels($after: ID) {
    labels(after: $after) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          name
          count
          posts {
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
  }
`
