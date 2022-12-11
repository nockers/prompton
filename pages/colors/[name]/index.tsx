import { BlitzPage } from "@blitzjs/auth"
import { Stack, Text } from "@chakra-ui/react"
import UserLayout from "app/[login]/layout"

const ColorPage: BlitzPage = () => {
  return (
    <Stack as={"main"} px={4} spacing={4} pb={4}>
      <Text>{"color"}</Text>
    </Stack>
  )
}

ColorPage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}

export default ColorPage
