import type { BlitzPage } from "@blitzjs/auth"
import { Divider, HStack, Stack, Text } from "@chakra-ui/react"
import { MainStackJA } from "app/components/MainStackJa"

const UsagePage: BlitzPage = () => {
  return (
    <MainStackJA title={"ガイドライン"} description={null} fileId={null}>
      <HStack justifyContent={"center"} px={{ base: 4, md: 8 }}>
        <Stack w={"100%"} maxW={"container.md"} spacing={{ base: 4, md: 8 }}>
          <Stack pt={{ base: 4, md: 8 }}>
            <Text fontWeight={"bold"} fontSize={"xl"}>
              {"ガイドライン"}
            </Text>
          </Stack>
          <Divider />
        </Stack>
      </HStack>
    </MainStackJA>
  )
}

UsagePage.getLayout = (page) => {
  return <>{page}</>
}

export default UsagePage
