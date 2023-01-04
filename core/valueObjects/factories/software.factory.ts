import { Software } from "core/valueObjects/software"

export class SoftwareFactory {
  static stableDiffusion() {
    return new Software("STABLE_DIFFUSION")
  }

  static novelAI() {
    return new Software("NOVEL_AI")
  }

  static holara() {
    return new Software("HOLARA")
  }

  static midjourney() {
    return new Software("MIDJOURNEY")
  }

  static nijijourney() {
    return new Software("NIJIJOURNEY")
  }

  static dalle2() {
    return new Software("DALL_E_2")
  }

  static fromFileName(fileName: string) {
    if (
      fileName.endsWith("_0.png") ||
      fileName.endsWith("_1.png") ||
      fileName.endsWith("_2.png") ||
      fileName.endsWith("_3.png")
    ) {
      return new Software("HOLARA")
    }
    return null
  }

  static fromText(text: string) {
    if (
      text !== "STABLE_DIFFUSION" &&
      text !== "NOVEL_AI" &&
      text !== "HOLARA" &&
      text !== "MIDJOURNEY" &&
      text !== "NIJIJOURNEY" &&
      text !== "DALL_E_2"
    ) {
      return null
    }

    return new Software(text)
  }
}
