import type { BlitzPage } from "@blitzjs/auth"
import { HomeLabelList } from "app/components/HomeLabelList"
import { HomePostList } from "app/components/HomePostList"
import { MainStackJa } from "app/components/MainStackJa"

const RootPage: BlitzPage = () => {
  return (
    <MainStackJa title={null} description={null} fileId={null}>
      <HomeLabelList />
      <HomePostList />
    </MainStackJa>
  )
}

RootPage.getLayout = (page) => {
  return <>{page}</>
}

export default RootPage
