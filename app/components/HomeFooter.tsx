import {
  Box,
  Card,
  HStack,
  Link as ChakraLink,
  Stack,
  Text,
} from "@chakra-ui/react"
import Link from "next/link"
import type { FC } from "react"
import "reactflow/dist/style.css"

export const HomeFooter: FC = () => {
  return (
    <Card variant={"filled"} borderRadius={0}>
      <Stack p={{ base: 4, md: 8 }}>
        <Stack
          direction={{ base: "column", sm: "row" }}
          spacing={{ base: 2, md: 4 }}
        >
          <Box>
            <ChakraLink as={Link} href={"/about"} fontSize={"sm"}>
              {"Promptonについて"}
            </ChakraLink>
          </Box>
          <Box>
            <ChakraLink as={Link} href={"/guide"} fontSize={"sm"}>
              {"ガイドライン"}
            </ChakraLink>
          </Box>
        </Stack>
        <Stack
          direction={{ base: "column", sm: "row" }}
          spacing={{ base: 2, md: 4 }}
        >
          <HStack spacing={{ base: 2, md: 4 }}>
            <Box>
              <ChakraLink as={Link} href={"/terms"} fontSize={"sm"}>
                {"利用規約"}
              </ChakraLink>
            </Box>
            <Box>
              <ChakraLink as={Link} href={"/privacy"} fontSize={"sm"}>
                {"プライバシーポリシー"}
              </ChakraLink>
            </Box>
          </HStack>
          <Box>
            <ChakraLink
              as={Link}
              href={"/specified-commercial-transaction-act"}
              fontSize={"sm"}
            >
              {"特定商取引法に基づく表記"}
            </ChakraLink>
          </Box>
        </Stack>
        <HStack justifyContent={"flex-end"}>
          <Text fontWeight={"bold"} fontSize={"sm"} opacity={0.8}>
            {"© Prompton.io"}
          </Text>
        </HStack>
      </Stack>
    </Card>
  )
}
