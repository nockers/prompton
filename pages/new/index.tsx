import {
  Box,
  Button,
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
import { FC, useState } from "react"
import { MainStack } from "app/components/MainStack"
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
    <MainStack title={"アカウント作成"} description={null} fileId={null}>
      <HStack px={4} pt={16} justifyContent={"center"}>
        <Box maxW={"sm"} bg={"gray.700"} rounded={"md"} w={"100%"} p={4}>
          <Stack gap={2}>
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
        </Box>
      </HStack>
    </MainStack>
  )
}

export default LoginPage
