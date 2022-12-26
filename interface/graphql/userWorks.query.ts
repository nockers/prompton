import { gql } from "@apollo/client"

export default gql`
  query UserWorks($offset: Int, $limit: Int, $userId: String!) {
    works(offset: $offset, limit: $limit, where: { userId: $userId }) {
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
        nameJA
        count
      }
    }
  }
`
