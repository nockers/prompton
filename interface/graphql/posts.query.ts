import { gql } from "@apollo/client"

export default gql`
  query Posts($after: ID) {
    posts(after: $after) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          createdAt
          title
          fileId
          likeCount
          user {
            id
            name
            avatarImageURL
          }
        }
      }
    }
  }
`
