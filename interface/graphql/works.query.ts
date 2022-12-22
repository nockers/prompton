import { gql } from "@apollo/client"

export default gql`
  query Works($offset: Int, $limit: Int, $where: WorksWhereInput) {
    works(offset: $offset, limit: $limit, where: $where) {
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
