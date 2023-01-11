import { gql } from "@apollo/client"
import { PublicWorkFields } from "interface/graphql/fragments/publicWorkFields.fragment"

export default gql`
  ${PublicWorkFields}
  query ViewerWorks($offset: Int, $limit: Int) {
    viewer {
      works(offset: $offset, limit: $limit) {
        ...PublicWorkFields
      }
    }
  }
`
