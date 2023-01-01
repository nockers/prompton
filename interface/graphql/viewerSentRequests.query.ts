import { gql } from "@apollo/client"

export default gql`
  query ViewerSentRequests {
    viewer {
      sentRequests {
        id
        recipient {
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
