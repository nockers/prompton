import { BlitzPage } from "@blitzjs/auth"
import { Stack } from "@chakra-ui/react"
import { HomeLabelList } from "app/components/HomeLabelList"
import { HomePostList } from "app/components/HomePostList"

const RootPage: BlitzPage = () => {
  return (
    <Stack as={"main"} px={4} pb={4} spacing={0}>
      <HomeLabelList />
      <HomePostList />
    </Stack>
  )
}

RootPage.getLayout = (page) => {
  return <>{page}</>
}

export default RootPage
