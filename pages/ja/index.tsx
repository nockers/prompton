import type { BlitzPage } from "@blitzjs/auth"
import { Stack } from "@chakra-ui/react"
import { HomeLabelList } from "app/components/HomeLabelList"
import { HomePostList } from "app/components/HomePostList"
import { MainStackJa } from "app/components/MainStackJa"

const RootPage: BlitzPage = () => {
  return (
    <MainStackJa title={null} description={null} fileId={null}>
      <Stack spacing={0} w={"100%"}>
        <HomeLabelList />
        <HomePostList />
      </Stack>
    </MainStackJa>
  )
}

RootPage.getLayout = (page) => {
  return <>{page}</>
}

export default RootPage
