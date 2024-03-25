import type { Color } from '../types/colors'


// https://github.com/gdkraus/wcag2-color-contrast/blob/master/wcag2-color-contrast.php

/**
 * calculates the luminosity of an given RGB color
 * the color code must be in the format of RRGGBB
 * the luminosity equations are from the WCAG 2 requirements
 * http://www.w3.org/TR/WCAG20/#relativeluminancedef
  */

const calculateWcagLuminosity = (color: Color) => {
  let { r, g, b } = color
  if (r <= 0.03928) {
    r = r / 12.92;
  } else {
    r = Math.pow(((r + 0.055) / 1.055), 2.4);
  }
  if (g <= 0.03928) {
    g = g / 12.92;
  } else {
    g = Math.pow(((g + 0.055) / 1.055), 2.4);
  }
  if (b <= 0.03928) {
    b = b / 12.92;
  } else {
    b = Math.pow(((b + 0.055) / 1.055), 2.4);
  }
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * calculates the luminosity ratio of two colors
 * the luminosity ratio equations are from the WCAG 2 requirements
 * http://www.w3.org/TR/WCAG20/#contrast-ratiodef
 */

export const calculateWcagLuminosityRatio = (color1: Color, color2: Color): number => {
  const luminosity1 = calculateWcagLuminosity(color1)
  const luminosity2 = calculateWcagLuminosity(color2)
  return ((Math.max(luminosity1, luminosity2) + 0.05) / (Math.min(luminosity1, luminosity2) + 0.05))
}
