import { gql } from "@apollo/client"

export default gql`
  mutation createPrompt($input: CreatePromptInput!) {
    createPrompt(input: $input) {
      id
    }
  }
`
