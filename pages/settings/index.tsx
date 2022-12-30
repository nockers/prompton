import { Box, Stack, Text } from "@chakra-ui/react"
import type { FC } from "react"
import { MainStack } from "app/components/MainStack"

const SettingsPage: FC = () => {
  return (
    <MainStack title={"設定"} description={null} fileId={null}>
      <Stack spacing={8} px={{ base: 4, md: 8 }}>
        <Stack spacing={4}>
          <Box pt={4}>
            <Text fontWeight={"bold"} fontSize={"xl"}>
              {"設定"}
            </Text>
          </Box>
        </Stack>
      </Stack>
    </MainStack>
  )
}

export default SettingsPage
