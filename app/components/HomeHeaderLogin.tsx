import { Button, HStack, Icon, IconButton } from "@chakra-ui/react"
import Link from "next/link"
import { FC, useContext } from "react"
import { BiCog } from "react-icons/bi"
import { FcGoogle } from "react-icons/fc"
import { AppContext } from "interface/contexts/appContext"

type Props = {
  onLogin(): void
}

export const HomeHeaderLogin: FC<Props> = (props) => {
  const appContext = useContext(AppContext)

  if (appContext.isLoading) {
    return <Button isLoading={true} fontSize={14} />
  }

  if (appContext.currentUser === null) {
    return (
      <Button
        leftIcon={<Icon as={FcGoogle} />}
        fontSize={14}
        onClick={props.onLogin}
        minW={28}
      >
        {"ログイン"}
      </Button>
    )
  }

  return (
    <HStack>
      <Link href={`/${appContext.currentUser.uid}`}>
        <Button fontSize={14}>{"マイページ"}</Button>
      </Link>
      <Link href={"/settings"}>
        <IconButton aria-label={""}>
          <Icon as={BiCog} />
        </IconButton>
      </Link>
    </HStack>
  )
}
