import Color from "color"

export const calcColorDistance = (hexA: string, hexB: string) => {
  const { r, g, b } = Color(hexA).object()

  const { r: r2, g: g2, b: b2 } = Color(hexB).object()

  return Math.sqrt(
    Math.pow(r - r2, 2) + Math.pow(g - g2, 2) + Math.pow(b - b2, 2),
  )
}
