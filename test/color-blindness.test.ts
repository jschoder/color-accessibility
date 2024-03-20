import { convertToColorBlindness } from '../src/color-blindness'
describe('Matrix calculations for color blindness', () => {
  it('Invalid color notations', () => {
    expect(() => convertToColorBlindness('#DE', 'achromatomaly')).toThrow('Invalid color notation')
    expect(() => convertToColorBlindness('#HAC', 'achromatopsia')).toThrow('Invalid color notation')
    expect(() => convertToColorBlindness('#1234', 'deuteranomaly')).toThrow(
      'Invalid color notation',
    )
    expect(() => convertToColorBlindness('#12345', 'protanomaly')).toThrow('Invalid color notation')
    expect(() => convertToColorBlindness('#12G4AB', 'protanopia')).toThrow('Invalid color notation')
  })

  /**
   * Testing a couple of webcolors to get a nice range of r/g/b
   *
   * These are the source colors:
   *
   * Pink    MediumVioletRed #C71585
   * Orange  DarkOrange      #FF8C00
   * Brown   SaddleBrown     #8B4513
   * Purple  DarkMagenta     #8B008B
   * Cyan    DarkTurquoise   #00CED1
   * Green   LawnGreen       #7CFC00
   * White   OldLace         #FDF5E6
   * Grey    LightSlateGray  #778899
   * https://en.wikipedia.org/wiki/Web_colors
   */

  it('Converting colors to achromatomaly', () => {
    expect(convertToColorBlindness('#FFFFFF', 'achromatomaly')).toBe('#FFFFFF')
    expect(convertToColorBlindness('#000000', 'achromatomaly')).toBe('#000000')
    expect(convertToColorBlindness('#C71585', 'achromatomaly')).toBe('#8A396C')
    expect(convertToColorBlindness('#FF8C00', 'achromatomaly')).toBe('#CA9656')
    expect(convertToColorBlindness('#8B4513', 'achromatomaly')).toBe('#6D4D37')
    expect(convertToColorBlindness('#8B008B', 'achromatomaly')).toBe('#5F1F5E')
    expect(convertToColorBlindness('#00CED1', 'achromatomaly')).toBe('#4FADAE')
    expect(convertToColorBlindness('#7CFC00', 'achromatomaly')).toBe('#9DD865')
    expect(convertToColorBlindness('#FDF5E6', 'achromatomaly')).toBe('#F9F5EE')
    expect(convertToColorBlindness('#778899', 'achromatomaly')).toBe('#7F868E')
  })

  it('Converting colors to achromatopsia', () => {
    expect(convertToColorBlindness('#FFFFFF', 'achromatopsia')).toBe('#FFFFFF')
    expect(convertToColorBlindness('#000000', 'achromatopsia')).toBe('#000000')
    expect(convertToColorBlindness('#C71585', 'achromatopsia')).toBe('#575757')
    expect(convertToColorBlindness('#FF8C00', 'achromatopsia')).toBe('#9E9E9E')
    expect(convertToColorBlindness('#8B4513', 'achromatopsia')).toBe('#545454')
    expect(convertToColorBlindness('#8B008B', 'achromatopsia')).toBe('#393939')
    expect(convertToColorBlindness('#00CED1', 'achromatopsia')).toBe('#919191')
    expect(convertToColorBlindness('#7CFC00', 'achromatopsia')).toBe('#B9B9B9')
    expect(convertToColorBlindness('#FDF5E6', 'achromatopsia')).toBe('#F6F6F6')
    expect(convertToColorBlindness('#778899', 'achromatopsia')).toBe('#858585')
  })

  it('Converting colors to deuteranomaly', () => {
    expect(convertToColorBlindness('#FFFFFF', 'deuteranomaly')).toBe('#FFFFFF')
    expect(convertToColorBlindness('#000000', 'deuteranomaly')).toBe('#000000')
    expect(convertToColorBlindness('#C71585', 'deuteranomaly')).toBe('#9C5B83')
    expect(convertToColorBlindness('#FF8C00', 'deuteranomaly')).toBe('#D8A800')
    expect(convertToColorBlindness('#8B4513', 'deuteranomaly')).toBe('#74560D')
    expect(convertToColorBlindness('#8B008B', 'deuteranomaly')).toBe('#6B3C8A')
    expect(convertToColorBlindness('#00CED1', 'deuteranomaly')).toBe('#8CBDD2')
    expect(convertToColorBlindness('#7CFC00', 'deuteranomaly')).toBe('#C1EC1A')
    expect(convertToColorBlindness('#FDF5E6', 'deuteranomaly')).toBe('#FAF6E6')
    expect(convertToColorBlindness('#778899', 'deuteranomaly')).toBe('#7F8599')
  })

  it('Converting colors to deuteranopia', () => {
    expect(convertToColorBlindness('#FFFFFF', 'deuteranopia')).toBe('#FFFFFF')
    expect(convertToColorBlindness('#000000', 'deuteranopia')).toBe('#000000')
    expect(convertToColorBlindness('#C71585', 'deuteranopia')).toBe('#737382')
    expect(convertToColorBlindness('#FF8C00', 'deuteranopia')).toBe('#B8B800')
    expect(convertToColorBlindness('#8B4513', 'deuteranopia')).toBe('#606007')
    expect(convertToColorBlindness('#8B008B', 'deuteranopia')).toBe('#4D4D8A')
    expect(convertToColorBlindness('#00CED1', 'deuteranopia')).toBe('#B1B1D3')
    expect(convertToColorBlindness('#7CFC00', 'deuteranopia')).toBe('#E1E123')
    expect(convertToColorBlindness('#FDF5E6', 'deuteranopia')).toBe('#F7F7E6')
    expect(convertToColorBlindness('#778899', 'deuteranopia')).toBe('#838399')
  })

  it('Converting colors to protanomaly', () => {
    expect(convertToColorBlindness('#FFFFFF', 'protanomaly')).toBe('#FFFFFF')
    expect(convertToColorBlindness('#000000', 'protanomaly')).toBe('#000000')
    expect(convertToColorBlindness('#C71585', 'protanomaly')).toBe('#8E3B85')
    expect(convertToColorBlindness('#FF8C00', 'protanomaly')).toBe('#CC9707')
    expect(convertToColorBlindness('#8B4513', 'protanomaly')).toBe('#6D4C14')
    expect(convertToColorBlindness('#8B008B', 'protanomaly')).toBe('#61238B')
    expect(convertToColorBlindness('#00CED1', 'protanomaly')).toBe('#9BC8D1')
    expect(convertToColorBlindness('#7CFC00', 'protanomaly')).toBe('#CEF600')
    expect(convertToColorBlindness('#FDF5E6', 'protanomaly')).toBe('#F9F6E6')
    expect(convertToColorBlindness('#778899', 'protanomaly')).toBe('#808799')
  })

  it('Converting colors to protanopia', () => {
    expect(convertToColorBlindness('#FFFFFF', 'protanopia')).toBe('#FFFFFF')
    expect(convertToColorBlindness('#000000', 'protanopia')).toBe('#000000')
    expect(convertToColorBlindness('#C71585', 'protanopia')).toBe('#4A4A86')
    expect(convertToColorBlindness('#FF8C00', 'protanopia')).toBe('#9E9E0B')
    expect(convertToColorBlindness('#8B4513', 'protanopia')).toBe('#505015')
    expect(convertToColorBlindness('#8B008B', 'protanopia')).toBe('#2F2F8B')
    expect(convertToColorBlindness('#00CED1', 'protanopia')).toBe('#C4C4D1')
    expect(convertToColorBlindness('#7CFC00', 'protanopia')).toBe('#F2F200')
    expect(convertToColorBlindness('#FDF5E6', 'protanopia')).toBe('#F6F6E6')
    expect(convertToColorBlindness('#778899', 'protanopia')).toBe('#868699')
  })

  it('Converting colors to tritanomaly', () => {
    expect(convertToColorBlindness('#FFFFFF', 'tritanomaly')).toBe('#FFFFFF')
    expect(convertToColorBlindness('#000000', 'tritanomaly')).toBe('#000000')
    expect(convertToColorBlindness('#C71585', 'tritanomaly')).toBe('#C42C60')
    expect(convertToColorBlindness('#FF8C00', 'tritanomaly')).toBe('#FF8767')
    expect(convertToColorBlindness('#8B4513', 'tritanomaly')).toBe('#8C4234')
    expect(convertToColorBlindness('#8B008B', 'tritanomaly')).toBe('#852763')
    expect(convertToColorBlindness('#00CED1', 'tritanomaly')).toBe('#00CECF')
    expect(convertToColorBlindness('#7CFC00', 'tritanomaly')).toBe('#93F3BD')
    expect(convertToColorBlindness('#FDF5E6', 'tritanomaly')).toBe('#FEF4EE')
    expect(convertToColorBlindness('#778899', 'tritanomaly')).toBe('#758990')
  })

  it('Converting colors to tritanopia', () => {
    expect(convertToColorBlindness('#FFFFFF', 'tritanopia')).toBe('#FFFFFF')
    expect(convertToColorBlindness('#000000', 'tritanopia')).toBe('#000000')
    expect(convertToColorBlindness('#C71585', 'tritanopia')).toBe('#C23737')
    expect(convertToColorBlindness('#FF8C00', 'tritanopia')).toBe('#FF8383')
    expect(convertToColorBlindness('#8B4513', 'tritanopia')).toBe('#8D4141')
    expect(convertToColorBlindness('#8B008B', 'tritanopia')).toBe('#813434')
    expect(convertToColorBlindness('#00CED1', 'tritanopia')).toBe('#00CECE')
    expect(convertToColorBlindness('#7CFC00', 'tritanopia')).toBe('#A0EDED')
    expect(convertToColorBlindness('#FDF5E6', 'tritanopia')).toBe('#FFF3F3')
    expect(convertToColorBlindness('#778899', 'tritanopia')).toBe('#748A8A')
  })

  it('Converting three letter colors', () => {
    expect(convertToColorBlindness('#FFF', 'achromatopsia')).toBe('#FFFFFF')
    expect(convertToColorBlindness('#000', 'deuteranopia')).toBe('#000000')
    expect(convertToColorBlindness('#789', 'protanopia')).toBe('#868699')
    expect(convertToColorBlindness('#789', 'tritanopia')).toBe('#748A8A')
  })
})
