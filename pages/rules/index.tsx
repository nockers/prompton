import type { BlitzPage } from "@blitzjs/auth"
import { Text } from "@chakra-ui/react"
import { MainStackJA } from "app/components/MainStackJa"

const RulesPage: BlitzPage = () => {
  return (
    <MainStackJA title={"ガイドライン"} description={null} fileId={null}>
      <Text>{"ガイドライン"}</Text>
    </MainStackJA>
  )
}

RulesPage.getLayout = (page) => {
  return <>{page}</>
}

export default RulesPage
