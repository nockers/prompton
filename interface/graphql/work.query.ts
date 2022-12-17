import { gql } from "@apollo/client"

export default gql`
  query Post($id: ID!) {
    work(id: $id) {
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
`
