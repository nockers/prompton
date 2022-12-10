import { gql } from "@apollo/client"

export default gql`
  mutation UpdatePost($input: UpdatePostInput!) {
    updatePost(input: $input) {
      id
      createdAt
      title
      fileId
      likeCount
      prompt
    }
  }
`
