import { gql } from "@apollo/client"

export default gql`
  mutation CreateRequest($input: CreateRequestInput!) {
    createRequest(input: $input) {
      id
    }
  }
`
