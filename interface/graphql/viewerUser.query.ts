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
        isRequestableForFree
        paymentMethod {
          id
          type
          cardBrand
          cardLast4
          cardExpMonth
          cardExpYear
          cardFunding
          isLiveMode
        }
      }
    }
  }
`
