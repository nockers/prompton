import { gql } from "@apollo/client"

export default gql`
  mutation CreateDeliverable($input: CreateDeliverableInput!) {
    createDeliverable(input: $input) {
      id
    }
  }
`
