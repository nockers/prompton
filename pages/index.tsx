import { BlitzPage } from "@blitzjs/auth"
import { HomeLabelList } from "app/components/HomeLabelList"
import { HomePostList } from "app/components/HomePostList"
import { MainStack } from "app/components/MainStack"

const RootPage: BlitzPage = () => {
  return (
    <MainStack title={null} description={null} fileId={null}>
      <HomeLabelList />
      <HomePostList />
    </MainStack>
  )
}

RootPage.getLayout = (page) => {
  return <>{page}</>
}

export default RootPage
