import { gql } from "@apollo/client"

export default gql`
  query ViewerFollowees($offset: Int, $limit: Int) {
    viewer {
      followees(offset: $offset, limit: $limit) {
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
  }
`
