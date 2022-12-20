import { gql } from "@apollo/client"

export default gql`
  mutation DeleteWorkLike($input: DeletePostLikeInput!) {
    deletePostLike(input: $input) {
      id
      likesCount
      isLike
    }
  }
`
