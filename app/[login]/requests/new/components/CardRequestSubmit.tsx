import {
  Stack,
  Text,
  Button,
  Card,
  Link as ChakraLink,
  Textarea,
  Divider,
  Checkbox,
} from "@chakra-ui/react"
import Link from "next/link"
import type { FC } from "react"
import { useState } from "react"

type Props = {
  isLoading: boolean
  isDisabled: boolean
  fee: number
  note: string
  onChangeNote(note: string): void
  onCreateRequest(): void
}

export const CardRequestSubmit: FC<Props> = (props) => {
  const [checks, setChecks] = useState<number[]>([])

  const onCheck = (value: number) => {
    const index = checks.indexOf(value)
    const draftState =
      index === -1
        ? [...checks, value]
        : checks.filter((check) => check !== value)
    setChecks(draftState)
  }

  const isDisabled = checks.length !== 3 || props.isDisabled

  return (
    <Card variant={"filled"} borderRadius={"xl"} borderWidth={4}>
      <Stack p={6} spacing={4}>
        <Text fontWeight={"bold"} fontSize={"xl"}>
          {"リクエストの内容"}
        </Text>
        <Stack>
          <Text>{"作品の内容についての要望を書いてください。"}</Text>
          <Textarea
            value={props.note}
            isDisabled={props.isDisabled}
            placeholder={"例：白い背景でお願いします。（最大200文字）"}
            rows={4}
            onChange={(event) => {
              props.onChangeNote(event.target.value)
            }}
          />
          <Text fontSize={"sm"} opacity={0.8}>
            {"※全ての要望が作品に反映されるとは限りません。"}
          </Text>
        </Stack>
        <Divider />
        <Stack>
          <Text>{"以下のことを確認してください。"}</Text>
          <Checkbox
            isChecked={checks.includes(0)}
            onChange={() => {
              onCheck(0)
            }}
          >
            <Text as={"span"}>{"本サイトの"}</Text>
            <ChakraLink as={Link} href={"/terms"} color={"blue.500"}>
              {"利用規約"}
            </ChakraLink>
            <Text as={"span"}>{"に同意する。"}</Text>
          </Checkbox>
          <Checkbox
            isChecked={checks.includes(1)}
            onChange={() => {
              onCheck(1)
            }}
          >
            {"制作物の全ての権利は制作者にあることに同意する。"}
          </Checkbox>
          <Checkbox
            isChecked={checks.includes(2)}
            onChange={() => {
              onCheck(2)
            }}
          >
            {"制作者へ打ち合わせなどの連絡をしないことに同意する。"}
          </Checkbox>
        </Stack>
        <Divider />
        <Stack>
          <Text fontSize={"sm"} fontWeight={"bold"} color={"primary.500"}>
            {`クリックすると${props.fee}円（税込）が決済されます。`}
          </Text>
          <Button
            isDisabled={isDisabled}
            isLoading={props.isLoading}
            colorScheme={"primary"}
            onClick={props.onCreateRequest}
          >
            {"決済する"}
          </Button>
        </Stack>
      </Stack>
    </Card>
  )
}
