import { gql } from "@apollo/client"

export default gql`
  mutation AcceptRequest($input: AcceptRequestInput!) {
    acceptRequest(input: $input) {
      id
      isPending
      isAccepted
    }
  }
`
