import { gql } from "@apollo/client"

export default gql`
  mutation CancelRequest($input: CancelRequestInput!) {
    cancelRequest(input: $input) {
      id
      isPending
      isCanceled
      isCanceledByRecipient
      isCanceledBySender
    }
  }
`
