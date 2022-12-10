import { BlitzPage } from "@blitzjs/auth"
import { Box } from "@chakra-ui/react"
import { HomePostList } from "app/components/HomePostList"

const RootPage: BlitzPage = () => {
  return (
    <Box as={"main"} px={4} pb={4}>
      <HomePostList />
    </Box>
  )
}

RootPage.getLayout = (page) => {
  return <>{page}</>
}

export default RootPage
