import { gql } from "@apollo/client"

export default gql`
  mutation RejectRequest($input: RejectRequestInput!) {
    rejectRequest(input: $input) {
      id
      isPending
      isRejected
    }
  }
`
