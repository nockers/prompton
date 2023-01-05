import { Button, Divider, HStack, Stack, Text } from "@chakra-ui/react"
import type { FC } from "react"
import { MainStackJA } from "app/components/MainStackJA"

const SettingsPage: FC = () => {
  return (
    <MainStackJA title={"設定"} description={null} fileId={null}>
      <HStack justifyContent={"center"} px={{ base: 4, md: 8 }}>
        <Stack w={"100%"} maxW={"container.md"} spacing={{ base: 4, md: 8 }}>
          <Stack pt={{ base: 4, md: 8 }}>
            <Text fontWeight={"bold"} fontSize={"xl"}>
              {"設定"}
            </Text>
          </Stack>
          <Divider />
          <Stack spacing={4}>
            <Text fontWeight={"bold"}>{"言語について"}</Text>
            <HStack>
              <Button isDisabled>{"表示言語を変更する"}</Button>
            </HStack>
          </Stack>
          <Divider />
          <Stack spacing={4}>
            <Text fontWeight={"bold"}>{"危険な操作"}</Text>
            <HStack>
              <Button isDisabled>{"アカウントを削除する"}</Button>
            </HStack>
          </Stack>
        </Stack>
      </HStack>
    </MainStackJA>
  )
}

export default SettingsPage
