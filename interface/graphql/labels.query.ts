import { gql } from "@apollo/client"

export default gql`
  query Labels($offset: Int, $limit: Int) {
    labels(offset: $offset, limit: $limit) {
      id
      name
      nameJA
      count
    }
  }
`
