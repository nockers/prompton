import { gql } from "@apollo/client"
import { PublicWorkFields } from "interface/graphql/fragments/publicWorkFields.fragment"

export default gql`
  ${PublicWorkFields}
  query ViewerBookmarkedWorks($offset: Int, $limit: Int) {
    viewer {
      bookmarkedWorks(offset: $offset, limit: $limit) {
        ...PublicWorkFields
      }
    }
  }
`
