import { gql } from "@apollo/client"

export default gql`
  query SearchLabels($offset: Int, $limit: Int, $where: LabelsWhereInput) {
    labels(offset: $offset, limit: $limit, where: $where) {
      id
      name
      nameJA
      count
      works {
        id
        createdAt
        title
        fileId
        imageURL
        thumbnailURL
        squareThumbnailURL
        likesCount
        prompt
        model
        annotationAdult
        annotationMedical
        annotationViolence
        annotationRacy
        annotationSpoof
        colors
        webColors
        isLiked
        isBookmarked
        labels {
          id
          name
          nameJA
          count
        }
        user {
          id
          name
          avatarImageURL
          isFollowee
        }
      }
    }
  }
`
