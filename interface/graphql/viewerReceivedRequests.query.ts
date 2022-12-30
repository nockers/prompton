import { gql } from "@apollo/client"

export default gql`
  query ViewerReceivedRequests {
    viewer {
      receivedRequests {
        id
        user {
          id
          name
          avatarImageURL
        }
        createdAt
        note
        fee
        isPending
        isAccepted
        isRejected
        isCompleted
        isCanceled
        isCanceledBySystem
        isCanceledByCreator
        isTimeout
      }
    }
  }
`
