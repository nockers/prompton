import type { BlitzPage } from "@blitzjs/auth"
import { Stack, Text } from "@chakra-ui/react"
import { MarkdownDocument } from "app/components/BoxMarkdown"
import { MainStack } from "app/components/MainStack"

const UsagePage: BlitzPage = () => {
  const text = ``

  return (
    <MainStack title={"使い方"} description={null} fileId={null}>
      <Text>{"使い方"}</Text>
      <Stack spacing={4}>
        <MarkdownDocument>{text}</MarkdownDocument>
      </Stack>
    </MainStack>
  )
}

UsagePage.getLayout = (page) => {
  return <>{page}</>
}

export default UsagePage
