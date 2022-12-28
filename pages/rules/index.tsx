import type { BlitzPage } from "@blitzjs/auth"
import { Text } from "@chakra-ui/react"
import { MainStack } from "app/components/MainStack"

const RulesPage: BlitzPage = () => {
  return (
    <MainStack title={"ガイドライン"} description={null} fileId={null}>
      <Text>{"ガイドライン"}</Text>
    </MainStack>
  )
}

RulesPage.getLayout = (page) => {
  return <>{page}</>
}

export default RulesPage
