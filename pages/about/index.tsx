import type { BlitzPage } from "@blitzjs/auth"
import { Divider, HStack, Image, Stack, Text } from "@chakra-ui/react"
import { MainStackJA } from "app/components/MainStackJa"

const AboutPage: BlitzPage = () => {
  return (
    <MainStackJA title={null} description={null} fileId={null}>
      <HStack justifyContent={"center"} px={{ base: 4, md: 8 }}>
        <Stack w={"100%"} maxW={"container.md"} spacing={{ base: 4, md: 8 }}>
          <Stack pt={{ base: 4, md: 8 }}>
            <Text as={"h1"} fontWeight={"bold"} fontSize={"xl"}>
              {"Promptonについて"}
            </Text>
            <Text fontSize={"sm"}>
              {
                "prompton（プロンプトン）は手軽にAIコンテンツの有償リクエストを受けることができるサービスです。"
              }
            </Text>
          </Stack>
          <Divider />
          <Stack direction={"row"} spacing={{ base: 4, md: 8 }}>
            <Stack flex={1} alignItems={"center"} justifyContent={"center"}>
              <Text
                as={"h2"}
                fontSize={{ base: "xl", md: "4xl" }}
                whiteSpace={"pre-wrap"}
                fontWeight={"bold"}
              >
                {"AI創作に\nもっと可能性を"}
              </Text>
            </Stack>
            <HStack flex={1}>
              <Image
                alt={""}
                src={"https://image.prompton.io/ERrUoxFXW2Rtaj4UjBHo?w=1024"}
                borderRadius={"xl"}
              />
            </HStack>
          </Stack>
          {/* <Box w={"100%"} h={"400px"}>
            <BoxAboutFlow />
          </Box> */}
        </Stack>
      </HStack>
    </MainStackJA>
  )
}

AboutPage.getLayout = (page) => {
  return <>{page}</>
}

export default AboutPage
