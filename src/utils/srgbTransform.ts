// https://www.nayuki.io/page/srgb-transform-library

export const srgbToLinear = (x: number): number => {
  if (x <= 0) {
    return 0
  } else if (x >= 1) {
    return 1
  } else if (x < 0.04045) {
    return x / 12.92
  } else {
    return Math.pow((x + 0.055) / 1.055, 2.4)
  }
}

export const linearToSrgb = (x: number): number => {
  if (x <= 0) {
    return 0
  } else if (x >= 1) {
    return 1
  } else if (x < 0.0031308) {
    return x * 12.92
  } else {
    return Math.pow(x, 1 / 2.4) * 1.055 - 0.055
  }
}
