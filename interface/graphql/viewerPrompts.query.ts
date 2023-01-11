import { gql } from "@apollo/client"
import { PromptWorkFields } from "./fragments/promptWorkFields.fragment"

export default gql`
  ${PromptWorkFields}
  query ViewerPrompts($offset: Int, $limit: Int) {
    viewer {
      prompts(offset: $offset, limit: $limit) {
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
  }
`
