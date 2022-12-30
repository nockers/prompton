import { gql } from "@apollo/client"

export default gql`
  query ViewerSentRequests {
    viewer {
      sentRequests {
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
