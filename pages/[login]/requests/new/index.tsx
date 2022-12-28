import type { BlitzPage } from "@blitzjs/auth"
import { Divider } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useContext } from "react"
import { ViewerUserProfileHeader } from "app/[login]/components/ViewerUserProfileHeader"
import { MainStack } from "app/components/MainStack"
import { AppContext } from "interface/contexts/appContext"

const UserRequestNewPage: BlitzPage = () => {
  const appContext = useContext(AppContext)

  const router = useRouter()

  const isMyPage = router.query.login === appContext.currentUser?.uid

  const userId = router.query.login?.toString() ?? null

  if (userId === null) {
    return null
  }

  if (isMyPage === null) {
    return null
  }

  return (
    <MainStack title={null} description={null} fileId={null}>
      <ViewerUserProfileHeader userId={userId} />
      <Divider />
    </MainStack>
  )
}

export default UserRequestNewPage
