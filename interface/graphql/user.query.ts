import { gql } from "@apollo/client"

export default gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      avatarImageURL
      avatarImageId
      headerImageId
      biography
      createdAt
      posts {
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
          }
        }
      }
    }
  }
`
