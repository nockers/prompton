import { gql } from "@apollo/client"

export default gql`
  query Work($id: ID!) {
    work(id: $id) {
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
      labels {
        id
        name
        count
      }
      user {
        id
        name
        avatarImageURL
        isFollower
      }
    }
  }
`
