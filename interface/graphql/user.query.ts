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
      isFollowee
    }
  }
`
