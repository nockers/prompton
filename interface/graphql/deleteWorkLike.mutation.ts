import { gql } from "@apollo/client"

export default gql`
  mutation DeleteWorkLike($input: DeleteWorkLikeInput!) {
    deleteWorkLike(input: $input) {
      id
      likesCount
      isLiked
    }
  }
`
