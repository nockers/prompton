import { BlitzPage } from "@blitzjs/auth"
import { Stack, Text } from "@chakra-ui/react"
import UserLayout from "app/[login]/layout"

const LabelPage: BlitzPage = () => {
  return (
    <Stack as={"main"} px={4} spacing={4} pb={4}>
      <Text>{"name"}</Text>
    </Stack>
  )
}

LabelPage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}

export default LabelPage
