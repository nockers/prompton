import { gql } from "@apollo/client"

export default gql`
  query Posts($offset: Int, $limit: Int, $where: PostsWhereInput) {
    posts(offset: $offset, limit: $limit, where: $where) {
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
