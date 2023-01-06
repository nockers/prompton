import { readFile } from "fs/promises"
import type { BlitzPage } from "@blitzjs/auth"
import { Card, Divider, HStack, Stack, Text } from "@chakra-ui/react"
import type { GetStaticProps } from "next"
import { MarkdownDocument } from "app/components/BoxMarkdown"
import { MainStackJA } from "app/components/MainStackJa"

type Props = {
  text: string
}

const TermsPage: BlitzPage<Props> = (props) => {
  const description = `この利用規約（以下、「本規約」といいます。）は、Nocker株式会社（以下、「当社」といいます。）がこのウェブサイト上で提供するサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下、「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。`

  return (
    <MainStackJA pageTitle={"利用規約"} pageDescription={null} fileId={null}>
      <HStack justifyContent={"center"} px={{ base: 4, md: 8 }}>
        <Stack w={"100%"} maxW={"container.md"} spacing={{ base: 4, md: 8 }}>
          <Stack pt={{ base: 4, md: 8 }}>
            <Text fontWeight={"bold"} fontSize={"xl"}>
              {"利用規約"}
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
  const text = await readFile("interface/texts/terms.md", "utf-8")
  return {
    props: { text },
    revalidate: 60,
  }
}

TermsPage.getLayout = (page) => {
  return <>{page}</>
}

export default TermsPage
