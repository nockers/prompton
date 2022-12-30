import {
  Card,
  HStack,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react"
import type { FC } from "react"
import { useState } from "react"

type Props = {
  isRequestable: boolean
  minimumFee: number
  maximumFee: number
  onChangeFeeRange(minimumFee: number, maximumFee: number): void
  onMarkAsRequestable(isChecked: boolean): void
}

export const CardViewerRequestSettings: FC<Props> = (props) => {
  const [minimumFee, setMinimumFee] = useState(() => {
    return props.minimumFee
  })

  const [maximumFee, setMaximumFee] = useState(() => {
    return props.maximumFee
  })

  return (
    <Card
      variant={"outline"}
      borderRadius={"xl"}
      borderColor={"gray.100"}
      borderWidth={4}
    >
      <Stack p={{ base: 4, md: 4 }} spacing={4}>
        <Stack>
          <Text>{"1回の支援額"}</Text>
          <Text fontSize={"2xl"}>{`${minimumFee}円〜${maximumFee}円`}</Text>
        </Stack>
        <RangeSlider
          step={500}
          min={500}
          max={8000}
          value={[minimumFee, maximumFee]}
          onChange={([min, max]) => {
            setMinimumFee(min)
            setMaximumFee(max)
            props.onChangeFeeRange(min, max)
          }}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
        <HStack spacing={4}>
          <Switch
            size={"lg"}
            isChecked={props.isRequestable}
            onChange={(event) => {
              props.onMarkAsRequestable(event.target.checked)
            }}
          />
          <Text>{"リクエストを受け付ける"}</Text>
        </HStack>
      </Stack>
    </Card>
  )
}
