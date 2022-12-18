import { gql } from "@apollo/client"

export default gql`
  mutation CreatePostLike($input: CreatePostLikeInput!) {
    createPostLike(input: $input) {
      id
      likesCount
      isLike
    }
  }
`
