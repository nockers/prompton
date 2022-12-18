import { gql } from "@apollo/client"

export default gql`
  mutation DeletePostLike($input: DeletePostLikeInput!) {
    deletePostLike(input: $input) {
      id
      likesCount
      isLike
    }
  }
`
