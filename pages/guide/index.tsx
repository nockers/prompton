import { readFile } from "fs/promises"
import type { BlitzPage } from "@blitzjs/auth"
import { Card, Divider, HStack, Stack, Text } from "@chakra-ui/react"
import type { GetStaticProps } from "next"
import { MarkdownDocument } from "app/components/BoxMarkdown"
import { MainStackJA } from "app/components/MainStackJa"

type Props = {
  text: string
}

const GuidePage: BlitzPage<Props> = (props) => {
  const description = `Nocker株式会社（以下、当社）は、ガイドラインに基づき、下記のような規定を行います。規約とポリシーのすべての内容に目を通していただく必要がありますがその中でも重要な点をまとめました。また、ガイドラインは当社の判断で任意に変更されます。継続的にこれを保証するものではありませんのであらかじめご了承ください。`

  return (
    <MainStackJA
      pageTitle={"ガイドライン"}
      pageDescription={null}
      fileId={null}
    >
      <HStack justifyContent={"center"} px={{ base: 4, md: 8 }}>
        <Stack w={"100%"} maxW={"container.md"} spacing={{ base: 4, md: 8 }}>
          <Stack pt={{ base: 4, md: 8 }}>
            <Text fontWeight={"bold"} fontSize={"xl"}>
              {"ガイドライン"}
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
  const text = await readFile("interface/texts/guide.md", "utf-8")
  return {
    props: { text },
    revalidate: 60,
  }
}

GuidePage.getLayout = (page) => {
  return <>{page}</>
}

export default GuidePage
