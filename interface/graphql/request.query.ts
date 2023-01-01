import { gql } from "@apollo/client"

export default gql`
  query Request($id: ID!) {
    request(id: $id) {
      id
      sender {
        id
        name
        avatarImageURL
      }
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
`
