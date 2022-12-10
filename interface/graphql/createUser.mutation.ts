import { gql } from "@apollo/client"

export default gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input)
  }
`
