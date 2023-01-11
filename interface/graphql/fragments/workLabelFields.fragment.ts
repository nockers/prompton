import { gql } from "@apollo/client"

export const WorkLabelFields = gql`
  fragment WorkLabelFields on LabelNode {
    id
    name
    nameJA
    count
  }
`
