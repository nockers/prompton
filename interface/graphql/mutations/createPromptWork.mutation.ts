import { gql } from "@apollo/client"

export default gql`
  mutation createPromptWork($input: CreatePromptWorkInput!) {
    createPromptWork(input: $input) {
      id
      text
      texts
      createdAt
      description
      likesCount
      title
      titleJA
      isPublic
      isNsfw
      isDeleted
      isSingle
      isBase
      firstWork {
        ...PromptWorkFields
      }
      secondWork {
        ...PromptWorkFields
      }
      works {
        ...PromptWorkFields
      }
    }
  }
`
