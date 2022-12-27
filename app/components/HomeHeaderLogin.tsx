import {
  Button,
  HStack,
  Icon,
  IconButton,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react"
import Link from "next/link"
import type { FC } from "react"
import { useContext } from "react"
import { BiCog, BiUser } from "react-icons/bi"
import { FcGoogle } from "react-icons/fc"
import { AppContext } from "interface/contexts/appContext"

type Props = {
  onLogin(): void
}

export const HomeHeaderLogin: FC<Props> = (props) => {
  const appContext = useContext(AppContext)

  const isMobile = useBreakpointValue({ base: true, md: false })

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
      {isMobile && (
        <Link href={"/settings"}>
          <Tooltip label={"設定"}>
            <IconButton aria-label={""}>
              <Icon as={BiUser} />
            </IconButton>
          </Tooltip>
        </Link>
      )}
      {!isMobile && (
        <Link href={`/${appContext.currentUser.uid}`}>
          <Button fontSize={14}>{"マイページ"}</Button>
        </Link>
      )}
      <Link href={"/settings"}>
        <Tooltip label={"設定"}>
          <IconButton aria-label={""}>
            <Icon as={BiCog} />
          </IconButton>
        </Tooltip>
      </Link>
    </HStack>
  )
}
