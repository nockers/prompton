import { gql } from "@apollo/client"

export const WorkUserFields = gql`
  fragment WorkUserFields on UserNode {
    id
    name
    avatarImageURL
    isFollowee
  }
`
