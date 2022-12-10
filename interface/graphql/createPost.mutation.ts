import { gql } from "@apollo/client"

export default gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      createdAt
      title
      fileId
      likeCount
    }
  }
`
