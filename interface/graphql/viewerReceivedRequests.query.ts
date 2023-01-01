import { gql } from "@apollo/client"

export default gql`
  query ViewerReceivedRequests {
    viewer {
      receivedRequests {
        id
        sender {
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
        isCanceledBySender
        isCanceledByRecipient
        isTimeout
      }
    }
  }
`
