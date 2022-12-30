import { Stack } from "@chakra-ui/react"
import type { FC, ReactNode } from "react"
import { useContext } from "react"
import { AppContext } from "interface/contexts/appContext"

type Props = {
  children: ReactNode
}

const ViewerLayout: FC<Props> = (props) => {
  const appContext = useContext(AppContext)

  if (appContext.isLoading) {
    return null
  }

  if (appContext.currentUser === null) {
    return null
  }

  return <Stack>{props.children}</Stack>
}

export default ViewerLayout
