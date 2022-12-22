import { gql } from "@apollo/client"

export default gql`
  mutation UnfollowUser($input: UnfollowUserInput!) {
    unfollowUser(input: $input) {
      id
      isFollower
    }
  }
`
