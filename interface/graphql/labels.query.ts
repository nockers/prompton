import { gql } from "@apollo/client"

export default gql`
  query Labels($offset: Int, $limit: Int) {
    labels(offset: $offset, limit: $limit) {
      id
      name
      count
      works {
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
`
