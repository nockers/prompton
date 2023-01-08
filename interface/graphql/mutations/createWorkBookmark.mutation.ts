import { gql } from "@apollo/client"

export default gql`
  mutation CreateWorkBookmark($input: CreateWorkBookmarkInput!) {
    createWorkBookmark(input: $input) {
      id
      likesCount
      isBookmarked
    }
  }
`
