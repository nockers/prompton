import { gql } from "@apollo/client"

export default gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      avatarImageURL
      avatarImageId
      headerImageId
      biography
      createdAt
      isFollower
      works {
        id
        createdAt
        title
        fileId
        prompt
        likesCount
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
          nameJA
          count
        }
      }
    }
  }
`
