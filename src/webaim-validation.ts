import guidelines from './guidelines'
import type { OpaqueColor, NonOpaqueColor } from './types/colors'
import { parseColor } from './utils/colorParser'
import { calculateWcagLuminosityRatio } from './utils/wcagLuminosity'

const isLargeText = (fontSize?: number, bold: boolean = false): boolean =>
  fontSize ? (
    bold
    ? fontSize >= guidelines.text.large.threshold.bold
    : fontSize >= guidelines.text.large.threshold.normal
  ) : false

export const testTextContrastAA = (
  textColor: OpaqueColor | NonOpaqueColor,
  backgroundColor: OpaqueColor,
  fontSize?: number,
  bold: boolean = false
): boolean => calculateWcagLuminosityRatio(
  parseColor(textColor),
  parseColor(backgroundColor)
) >= (
  isLargeText(fontSize, bold)
  ? guidelines.text.large.aa
  : guidelines.text.normal.aa
)

export const testTextContrastAAA = (
  textColor: OpaqueColor | NonOpaqueColor,
  backgroundColor: OpaqueColor,
  fontSize?: number,
  bold: boolean = false
): boolean => calculateWcagLuminosityRatio(
  parseColor(textColor),
  parseColor(backgroundColor)
) >=(
  isLargeText(fontSize, bold)
  ? guidelines.text.large.aaa
  : guidelines.text.normal.aaa
)

export const testAdjacentObjectContrast = (
  objectColors: OpaqueColor[],
  testAllCombinations: boolean = false
): boolean => {
  if (objectColors.length < 2) {
    return true
  }

  const colorObjects = objectColors.map(color => parseColor(color))
  if (testAllCombinations) {
    for (let i1 = 0; i1 < 4; i1++) {
      for (let i2 = i1 + 1; i2 < 4; i2++) {
        if (calculateWcagLuminosityRatio(colorObjects[i1], colorObjects[i2]) < guidelines.graphicalObjects.aa) {
          return false
        }
      }
    }
  } else {
    for (let i = 1; i < colorObjects.length; i++) {
      if (calculateWcagLuminosityRatio(colorObjects[i - 1], colorObjects[i]) < guidelines.graphicalObjects.aa) {
        return false
      }
    }
  }
  return true
}

export const testObjectContrast = (
  objectColor: OpaqueColor | NonOpaqueColor,
  backgroundColor: OpaqueColor
): boolean => calculateWcagLuminosityRatio(
  parseColor(objectColor, backgroundColor),
  parseColor(backgroundColor)
) >= guidelines.graphicalObjects.aa

// Inactive TextElements are the exception and don't need any specific contrast
export const testInactiveTextContrast = (
  textColor: OpaqueColor | NonOpaqueColor,
  backgroundColor: OpaqueColor,
  fontSize?: number,
  bold: boolean = false
) => true
