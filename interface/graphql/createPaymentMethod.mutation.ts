import { gql } from "@apollo/client"

export default gql`
  mutation CreatePaymentMethod($input: CreatePaymentMethodInput!) {
    createPaymentMethod(input: $input) {
      checkoutURL
    }
  }
`
