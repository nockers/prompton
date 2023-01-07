import {
  Card,
  HStack,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react"
import type { FC } from "react"

type Props = {
  onChangeAdditionalFee(n: number): void
  userName: string
  maximumFee: number
  minimumFee: number
  additionalFee: number
  fee: number
}

export const CardRequestFee: FC<Props> = (props) => {
  return (
    <Card variant={"filled"} borderRadius={"xl"} borderWidth={4}>
      <Stack p={6}>
        <Stack>
          <HStack justifyContent={"space-between"}>
            <Text fontWeight={"bold"} fontSize={"lg"}>
              {"新しいリクエスト"}
            </Text>
            <Tag colorScheme={"primary"}>{"イラスト"}</Tag>
          </HStack>
          <Text>
            {`次の金額で「${props.userName}」さんにイラストの制作をリクエストします。`}
          </Text>
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            {`料金 ${props.fee}円（税込）`}
          </Text>
          <RangeSlider
            step={500}
            min={0}
            max={props.maximumFee - props.minimumFee}
            value={[props.additionalFee]}
            onChange={([value]) => {
              props.onChangeAdditionalFee(value)
            }}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
          </RangeSlider>
          <Text fontSize={"sm"}>
            {`※最大${props.maximumFee}円まで増額できます。`}
          </Text>
        </Stack>
      </Stack>
    </Card>
  )
}
