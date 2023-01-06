import { readFile } from "fs/promises"
import type { BlitzPage } from "@blitzjs/auth"
import { Card, Divider, HStack, Stack, Text } from "@chakra-ui/react"
import type { GetStaticProps } from "next"
import { MarkdownDocument } from "app/components/BoxMarkdown"
import { MainStackJA } from "app/components/MainStackJa"

type Props = {
  text: string
}

const PrivacyPage: BlitzPage<Props> = (props) => {
  const description = `Nocker株式会社（以下，「当社」といいます。）は，本ウェブサイト上で提供するサービス（以下,「本サービス」といいます。）における，ユーザーの個人情報の取扱いについて，以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。`

  return (
    <MainStackJA
      pageTitle={"プライバシーポリシー"}
      pageDescription={null}
      fileId={null}
    >
      <HStack justifyContent={"center"} px={{ base: 4, md: 8 }}>
        <Stack w={"100%"} maxW={"container.md"} spacing={{ base: 4, md: 8 }}>
          <Stack pt={{ base: 4, md: 8 }}>
            <Text fontWeight={"bold"} fontSize={"xl"}>
              {"プライバシーポリシー"}
            </Text>
            <Text fontSize={"sm"}>{description}</Text>
          </Stack>
          <Divider />
          <Card
            variant={"filled"}
            p={6}
            w={"100%"}
            maxW={"container.md"}
            borderRadius={"xl"}
          >
            <MarkdownDocument>{props.text}</MarkdownDocument>
          </Card>
        </Stack>
      </HStack>
    </MainStackJA>
  )
}

export const getStaticProps: GetStaticProps<Props, {}> = async () => {
  const text = await readFile("interface/texts/privacy.md", "utf-8")
  return {
    props: { text },
    revalidate: 60,
  }
}

PrivacyPage.getLayout = (page) => {
  return <>{page}</>
}

export default PrivacyPage
