export type OpaqueColor =
  string
  | [number, number, number]
  | {
    r: number,
    g: number,
    b: number
  }
export type NonOpaqueColor =
  string
  | [number, number, number, number]
  | {
    r: number,
    g: number,
    b: number,
    a: number
  }

const parseTransparentColor = (
  color: OpaqueColor | NonOpaqueColor
) : { r: number, g: number, b: number, a: number }  => {
  if (typeof color === 'string') {
    if (/^#[0-9a-fA-F]{3}$/.test(color)) {
      const r1 = color.substring(1, 2)
      const g1 = color.substring(2, 3)
      const b1 = color.substring(3, 4)
      return {
        r: parseInt(r1 + r1, 16) / 255,
        g: parseInt(g1 + g1, 16) / 255,
        b: parseInt(b1 + b1, 16) / 255,
        a: 1
      }
    } else if (/^#[0-9a-fA-F]{4}$/.test(color)) {
      const r1 = color.substring(1, 2)
      const g1 = color.substring(2, 3)
      const b1 = color.substring(3, 4)
      const a1 = color.substring(4, 5)
      return {
        r: parseInt(r1 + r1, 16) / 255,
        g: parseInt(g1 + g1, 16) / 255,
        b: parseInt(b1 + b1, 16) / 255,
        a: parseInt(a1 + a1, 16) / 255,
      }
    } else if (/^#[0-9a-fA-F]{6}$/.test(color)) {
      return {
        r: parseInt(color.substring(1, 3), 16) / 255,
        g: parseInt(color.substring(3, 5), 16) / 255,
        b: parseInt(color.substring(5, 7), 16) / 255,
        a: 1
      }
    } else if (/^#[0-9a-fA-F]{8}$/.test(color)) {
      return {
        r: parseInt(color.substring(1, 3), 16) / 255,
        g: parseInt(color.substring(3, 5), 16) / 255,
        b: parseInt(color.substring(5, 7), 16) / 255,
        a: parseInt(color.substring(7, 9), 16) / 255
      }
    } else {
      throw new Error('Invalid color string notation')
    }
  } else if (typeof color === 'object') {
    let r = Array.isArray(color) ? color[0] : color.r
    let g = Array.isArray(color) ? color[1] : color.g
    let b = Array.isArray(color) ? color[2] : color.b

    if (r < 0 || r > 255) {
      throw new Error('Color code \'r\' out of range')
    } else if (g < 0 || g > 255) {
      throw new Error('Color code \'g\' out of range')
    } else if (b < 0 || b > 255) {
      throw new Error('Color code \'b\' out of range')
    } else if (r > 1 || g > 1 || b > 1) {
      r /= 255
      g /= 255
      b /= 255
    }

    let a = Array.isArray(color) ? color?.[3] : ('a' in color ? color.a : undefined)
    if (a === undefined) {
      a = 1
    } else if (a < 0 || a > 255) {
      throw new Error('Color code \'a\' out of range')
    } else if (a > 1) {
      a /= 255
    }

    return { r, g, b, a}
  }
  throw new Error('Invalid color type')
}

export const parseColor = (
  color: OpaqueColor | NonOpaqueColor,
  background?: OpaqueColor
) : { r: number, g: number, b: number } => {
  const parsedColor = parseTransparentColor(color)
  if (parsedColor.a === 1) {
    return {
      r: parsedColor.r,
      g: parsedColor.g,
      b: parsedColor.b
    }
  } else if (!background) {
    throw new Error('Missing background for transparent color')
  } else {
    const parsedBackground = parseTransparentColor(background)
    if (parsedBackground.a !== 1) {
      throw new Error('The background can\t have transparent itself')
    }
    if (parsedColor.a === 0) {
      return {
        r: parsedBackground.r,
        g: parsedBackground.g,
        b: parsedBackground.b
      }
    }
    return {
      r: (parsedColor.r * parsedColor.a) + (parsedBackground.r * (1 - parsedColor.a)),
      g: (parsedColor.g * parsedColor.a) + (parsedBackground.g * (1 - parsedColor.a)),
      b: (parsedColor.b * parsedColor.a) + (parsedBackground.b * (1 - parsedColor.a))
    }
  }
}
