import { gql } from "@apollo/client"

export default gql`
  mutation CloseRequest($input: CloseRequestInput!) {
    closeRequest(input: $input) {
      id
      isPending
      isCompleted
    }
  }
`
