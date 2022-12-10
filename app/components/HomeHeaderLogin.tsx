import { Button, HStack, Icon, IconButton } from "@chakra-ui/react"
import Link from "next/link"
import { FC, useContext } from "react"
import { BiCog } from "react-icons/bi"
import { FcGoogle } from "react-icons/fc"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { AppContext } from "interface/contexts/appContext"

type Props = {
  onLogin(): void
}

export const HomeHeaderLogin: FC<Props> = (props) => {
  const appContext = useContext(AppContext)

  const currentUser = useCurrentUser()

  if (appContext.isLoading) {
    return <Button isLoading={true} fontSize={14} />
  }

  if (currentUser === null) {
    return (
      <Button
        leftIcon={<Icon as={FcGoogle} />}
        fontSize={14}
        onClick={props.onLogin}
      >
        {"ログイン"}
      </Button>
    )
  }

  return (
    <HStack>
      <Link href={`/${currentUser.uid}`}>
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
