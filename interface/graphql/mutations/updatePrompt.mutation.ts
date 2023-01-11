import { gql } from "@apollo/client"

export default gql`
  mutation updatePrompt($input: UpdatePromptInput!) {
    updatePrompt(input: $input) {
      id
    }
  }
`
