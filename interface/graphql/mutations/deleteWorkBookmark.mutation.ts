import { gql } from "@apollo/client"

export default gql`
  mutation DeleteWorkBookmark($input: DeleteWorkBookmarkInput!) {
    deleteWorkBookmark(input: $input) {
      id
      likesCount
      isBookmarked
    }
  }
`
