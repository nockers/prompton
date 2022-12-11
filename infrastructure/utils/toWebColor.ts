import { calcColorDistance } from "infrastructure/utils/calcColorDistance"
import { getWebColors } from "infrastructure/utils/getWebColors"

/**
 * 近いカラーコードを探して返す
 * @param hex
 */
export const toWebColor = (hex: string) => {
  const webColors = getWebColors()

  const distances = webColors.map((webColor) => {
    return {
      hex: webColor.colorCode,
      distance: calcColorDistance(hex, webColor.colorCode),
    }
  })

  const minDistance = distances.reduce((prev, current) => {
    return prev.distance < current.distance ? prev : current
  })

  return minDistance.hex
}
