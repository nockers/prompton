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
      deliverables {
        id
        createdAt
        title
        fileId
        imageURL
        thumbnailURL
        squareThumbnailURL
        annotationAdult
        annotationMedical
        annotationViolence
        annotationRacy
        annotationSpoof
        isDeleted
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
