import { gql } from "@apollo/client"

export default gql`
  mutation CreateWorkLike($input: CreatePostLikeInput!) {
    createPostLike(input: $input) {
      id
      likesCount
      isLike
    }
  }
`
