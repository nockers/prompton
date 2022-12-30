import { gql } from "@apollo/client"

export default gql`
  query ViewerUser {
    viewer {
      user {
        id
        name
        avatarImageURL
        avatarImageId
        headerImageId
        biography
        minimumFee
        maximumFee
        createdAt
        isFollowee
        isRequestable
      }
    }
  }
`
