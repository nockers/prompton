import type { BlitzPage } from "@blitzjs/auth"
import { Box } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { MainStack } from "app/components/MainStack"
import { SearchLabelList } from "app/components/SearchLabelList"
import { SearchPostList } from "app/components/SearchPostList"

const SearchPage: BlitzPage = () => {
  const router = useRouter()

  const searchText = router.query.q?.toString().trim() || ""

  if (searchText.length === 0) {
    return null
  }

  return (
    <MainStack title={null} description={null} fileId={null}>
      <Box pt={{ base: 4, md: 8 }}>
        <SearchLabelList searchText={searchText} />
      </Box>
      <SearchPostList searchText={searchText} />
    </MainStack>
  )
}

SearchPage.getLayout = (page) => {
  return <>{page}</>
}

export default SearchPage
