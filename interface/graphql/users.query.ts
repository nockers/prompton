import { gql } from "@apollo/client"

export default gql`
  query Users($offset: Int, $limit: Int) {
    users(offset: $offset, limit: $limit) {
      id
      name
      avatarImageURL
      avatarImageId
      headerImageId
      biography
      createdAt
      isFollowee
      isRequestable
    }
  }
`
