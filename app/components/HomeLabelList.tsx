import { BlitzPage } from "@blitzjs/auth"
import { Button, Wrap, WrapItem } from "@chakra-ui/react"
import Link from "next/link"
import { useLabelsQuery } from "interface/__generated__/react"

export const HomeLabelList: BlitzPage = () => {
  const { data } = useLabelsQuery({
    fetchPolicy: "cache-and-network",
    variables: { after: null },
  })

  return (
    <Wrap>
      {data?.labels.edges.map((edge) => (
        <WrapItem key={edge.node.id}>
          <Link href={`/labels/${edge.node.name}`}>
            <Button size={"sm"}>{`#${edge.node.name}`}</Button>
          </Link>
        </WrapItem>
      ))}
    </Wrap>
  )
}
