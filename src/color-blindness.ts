import { linearToSrgb, srgbToLinear } from './utils/srgbTransform'

const matrixes = {
  achromatomaly: {
    r: [0.618, 0.32, 0.062],
    g: [0.163, 0.775, 0.062],
    b: [0.163, 0.32, 0.516],
    linearRgbInterpolation: false,
  },
  achromatopsia: {
    r: [0.299, 0.587, 0.114],
    g: [0.299, 0.587, 0.114],
    b: [0.299, 0.587, 0.114],
    linearRgbInterpolation: false,
  },
  deuteranomaly: {
    r: [0.57418, 0.42582, 0],
    g: [0.17418, 0.82582, 0],
    b: [-0.01318, 0.01318, 1],
    linearRgbInterpolation: true,
  },
  deuteranopia: {
    r: [0.29031, 0.70969, 0],
    g: [0.29031, 0.70969, 0],
    b: [-0.02197, 0.02197, 1],
    linearRgbInterpolation: true,
  },
  protanomaly: {
    r: [0.46533, 0.53467, 0],
    g: [0.06533, 0.93467, 0],
    b: [0.00268, -0.00268, 1],
    linearRgbInterpolation: true,
  },
  protanopia: {
    r: [0.10889, 0.89111, 0],
    g: [0.10889, 0.89111, 0],
    b: [0.00447, -0.00447, 1],
    linearRgbInterpolation: true,
  },
  tritanomaly: {
    r: [1, 0.09142, -0.09142],
    g: [0, 0.9203, 0.0797],
    b: [0, 0.5203, 0.4797],
    linearRgbInterpolation: true,
  },
  tritanopia: {
    r: [1, 0.15236, -0.15236],
    g: [0, 0.86717, 0.13283],
    b: [0, 0.86717, 0.13283],
    linearRgbInterpolation: true,
  },
} as const satisfies Record<
  string,
  {
    r: [number, number, number]
    g: [number, number, number]
    b: [number, number, number]
    linearRgbInterpolation: boolean
  }
>

const floatToHex = (floatNumber: number) => {
  const integerNumber = Math.round(floatNumber * 255)
  return (integerNumber < 16 ? '0' : '') + integerNumber.toString(16).toUpperCase()
}

export const convertToColorBlindness = (color: string, colorBlindness: keyof typeof matrixes) => {
  const matrix = matrixes[colorBlindness]

  let r: number
  let g: number
  let b: number
  if (/^#[0-9a-fA-F]{6}$/.test(color)) {
    r = parseInt(color.substring(1, 3), 16) / 255
    g = parseInt(color.substring(3, 5), 16) / 255
    b = parseInt(color.substring(5, 7), 16) / 255
  } else if (/^#[0-9a-fA-F]{3}$/.test(color)) {
    r = parseInt(color.substring(1, 2) + color.substring(1, 2), 16) / 255
    g = parseInt(color.substring(2, 3) + color.substring(2, 3), 16) / 255
    b = parseInt(color.substring(3, 4) + color.substring(3, 4), 16) / 255
  } else {
    throw new Error('Invalid color notation')
  }

  if (matrix.linearRgbInterpolation) {
    r = srgbToLinear(r)
    g = srgbToLinear(g)
    b = srgbToLinear(b)
  }

  let r2 = matrix.r[0] * r + matrix.r[1] * g + matrix.r[2] * b
  let g2 = matrix.g[0] * r + matrix.g[1] * g + matrix.g[2] * b
  let b2 = matrix.b[0] * r + matrix.b[1] * g + matrix.b[2] * b

  if (matrix.linearRgbInterpolation) {
    r2 = linearToSrgb(r2)
    g2 = linearToSrgb(g2)
    b2 = linearToSrgb(b2)
  }

  return '#' + floatToHex(r2) + floatToHex(g2) + floatToHex(b2)
}
