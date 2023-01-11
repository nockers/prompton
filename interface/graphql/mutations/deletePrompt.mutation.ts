import { gql } from "@apollo/client"

export default gql`
  mutation deletePrompt($input: DeletePromptInput!) {
    deletePrompt(input: $input) {
      id
    }
  }
`
