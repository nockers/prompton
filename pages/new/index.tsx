import {
  Box,
  Button,
  Card,
  HStack,
  Input,
  Link,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  useToast,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import type { FC } from "react"
import { useState } from "react"
import { MainStackJA } from "app/components/MainStackJA_"
import { useCreateUserMutation } from "interface/__generated__/react"

const LoginPage: FC = () => {
  const router = useRouter()

  const toast = useToast()

  const [username, setUsername] = useState("")

  const [createUser, { loading }] = useCreateUserMutation()

  const onCreateUser = async () => {
    try {
      await createUser({
        variables: { input: { name: username } },
      })
      toast({ title: "登録が完了しました！" })
      router.replace("/")
    } catch (error) {
      if (error instanceof Error) {
        toast({
          description: error.message,
          status: "error",
        })
      }
    }
  }

  return (
    <MainStackJA title={"アカウント作成"} description={null} fileId={null}>
      <HStack px={4} pt={16} justifyContent={"center"}>
        <Card
          variant={"outline"}
          borderWidth={4}
          maxW={"sm"}
          rounded={"md"}
          w={"100%"}
        >
          <Stack gap={2} p={4}>
            <Text fontSize={20} fontWeight={"bold"}>
              {"アカウント作成"}
            </Text>
            <Input
              disabled={loading}
              placeholder={"ユーザ名"}
              variant={"filled"}
              value={username}
              onChange={(event) => {
                setUsername(event.target.value)
              }}
            />
            <Stack spacing={0}>
              <Text fontSize={14}>
                {"本製品のご利用には、以下に同意する必要があります。"}
              </Text>
              <Box>
                <UnorderedList>
                  <ListItem>
                    <Link fontSize={14}>{"利用規約"}</Link>
                  </ListItem>
                  <ListItem>
                    <Link fontSize={14}>{"プライバシーポリシー"}</Link>
                  </ListItem>
                </UnorderedList>
              </Box>
            </Stack>
            <Button isLoading={loading} onClick={onCreateUser}>
              {"利用開始"}
            </Button>
          </Stack>
        </Card>
      </HStack>
    </MainStackJA>
  )
}

export default LoginPage
