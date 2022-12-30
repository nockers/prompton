import { gql } from "@apollo/client"

export default gql`
  mutation UpdateUserRequestSettings($input: UpdateUserRequestSettingsInput!) {
    updateUserRequestSettings(input: $input) {
      id
      isRequestable
      minimumFee
      maximumFee
    }
  }
`
