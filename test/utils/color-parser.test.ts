import { parseColor } from '../../src/utils/colorParser'
import type { OpaqueColor, NonOpaqueColor } from '../../src/utils/colorParser'

describe('Parsing different types of color parameters', () => {

  it ('Catching invalid string colors', () => {
    expect(() => parseColor('Hello World')).toThrow('Invalid color string notation')

    expect(() => parseColor('#0')).toThrow('Invalid color string notation')
    expect(() => parseColor('#F')).toThrow('Invalid color string notation')
    expect(() => parseColor('#G')).toThrow('Invalid color string notation')

    expect(() => parseColor('#00')).toThrow('Invalid color string notation')
    expect(() => parseColor('#EE')).toThrow('Invalid color string notation')
    expect(() => parseColor('#H6')).toThrow('Invalid color string notation')

    expect(() => parseColor('#G56')).toThrow('Invalid color string notation')

    expect(() => parseColor('#0000')).toThrow('Missing background for transparent color')
    expect(() => parseColor('#81C5')).toThrow('Missing background for transparent color')
    expect(() => parseColor('#CF25')).toThrow('Missing background for transparent color')

    expect(() => parseColor('#00000')).toThrow('Invalid color string notation')
    expect(() => parseColor('#46eD4')).toThrow('Invalid color string notation')
    expect(() => parseColor('#FffFF')).toThrow('Invalid color string notation')
    expect(() => parseColor('#G85EF')).toThrow('Invalid color string notation')

    expect(() => parseColor('#33sle9')).toThrow('Invalid color string notation')

    expect(() => parseColor('#0000000')).toThrow('Invalid color string notation')
    expect(() => parseColor('#40FL2f3')).toThrow('Invalid color string notation')
    expect(() => parseColor('#FFFFFFF')).toThrow('Invalid color string notation')

    expect(() => parseColor('#00000000')).toThrow('Missing background for transparent color')
    expect(() => parseColor('#2E8B5724')).toThrow('Missing background for transparent color')
    expect(() => parseColor('#32FHe08e')).toThrow('Invalid color string notation')

    expect(() => parseColor('#23fE02b46')).toThrow('Invalid color string notation')
    expect(() => parseColor('#FFFFFFFFFF')).toThrow('Invalid color string notation')
    expect(() => parseColor('#00000000000')).toThrow('Invalid color string notation')

    expect(() => parseColor('#00Fa9A67', '#87CeEBFe')).toThrow('The background can\t have transparent itself')
  })

  it('Parsing string colors', () => {
    expect(parseColor('#000')).toEqual({ r: 0, g: 0, b: 0 })
    expect(parseColor('#12E')).toEqual({ r: 17 / 255, g: 34 / 255, b: 238 / 255 })
    expect(parseColor('#FFf')).toEqual({ r: 1, g: 1, b: 1 })
    expect(parseColor('#3c7F')).toEqual({ r: 51 / 255, g: 204 / 255, b: 119 / 255 })
    expect(parseColor('#FFFF')).toEqual({ r: 1, g: 1, b: 1 })

    expect(parseColor('#000000')).toEqual({ r: 0, g: 0, b: 0 })
    expect(parseColor('#DDA0DD')).toEqual({ r: 221 / 255, g: 160 / 255, b: 221 / 255 })
    expect(parseColor('#ffFFfF')).toEqual({ r: 1, g: 1, b: 1 })

    expect(parseColor('#FFFFFFFF')).toEqual({ r: 1, g: 1, b: 1 })

    // In case of fully opaque colors the background isn't parsed
    expect(parseColor('#FFFF', 'Doesn\'t matter')).toEqual({ r: 1, g: 1, b: 1 })

    expect(parseColor('#0000', '#20B2AA')).toEqual({ r: 32 / 255, g: 178 / 255, b: 170 / 255 })
    expect(parseColor('#93C0', '#F5E')).toEqual({ r: 255 / 255, g: 85 / 255, b: 238 / 255 })
    expect(parseColor('#3c7F', '#9370DB')).toEqual({ r: 51 / 255, g: 204 / 255, b: 119 / 255 })
    expect(parseColor('#FE5F', '#9400D3')).toEqual({ r: 255 / 255, g: 238 / 255, b: 85 / 255 })
    expect(parseColor('#FFFF', '#BDB76B')).toEqual({ r: 1, g: 1, b: 1 })
    expect(parseColor('#00000000', '#6A5ACD')).toEqual({ r: 106 / 255, g: 90 / 255, b: 205 / 255 })
    expect(parseColor('#4169E100', '#9ACD32')).toEqual({ r: 154 / 255, g: 205 / 255, b: 50 / 255 })
    expect(parseColor('#90EE90FF', '#F0F8FF')).toEqual({ r: 144 / 255, g: 238 / 255, b: 144 / 255 })
    expect(parseColor('#FFFFFFFF', '#DAA520')).toEqual({ r: 1, g: 1, b: 1 })

    // Using floats for actually merged colors since they are more exact than integers
    expect(parseColor('#81c5', '#e2E')).toEqual({ r: 204 / 255, g: 0.1111111111111111, b: 0.8888888888888891 })
    expect(parseColor('#8fba', '#a0522d')).toEqual({ r: 0.5647058823529412, g: 0.7738562091503268, b: 0.5477124183006535 })
    expect(parseColor('#2e8b5724', '#6b8E23')).toEqual({ r: 0.38583621683967706, g: 0.55520184544406, b: 0.16604382929642447 })
    expect(parseColor('#Ffdab983', '#809')).toEqual({ r: 0.7730718954248366, g: 0.4391849288735101, b: 0.6644675124951942 })
    expect(parseColor('#4682b4a2', '#ff7F50')).toEqual({ r: 0.5391003460207613, g: 0.5055132641291811, b: 0.5628604382929643 })
  })

  it ('Catching invalid array colors', () => {
    expect(() => parseColor([ -17, 34, 238 ])).toThrow('Color code \'r\' out of range')
    expect(() => parseColor([ 17, 34, 238, -34 ])).toThrow('Color code \'a\' out of range')
    expect(() => parseColor([ 17, 34, 256 ])).toThrow('Color code \'b\' out of range')
    expect(() => parseColor([ -17 / 255, 34 / 255, 238 / 255 ])).toThrow('Color code \'r\' out of range')
    expect(() => parseColor([ 46, 139, 87, 36 ], [ 107, 142, -35 ])).toThrow('Color code \'b\' out of range')
    expect(() => parseColor([ 0, 0, 0, 0 ])).toThrow('Missing background for transparent color')
    expect(() => parseColor([ 46, 139, 87, 36 ])).toThrow('Missing background for transparent color')
  })

  it('Parsing array colors', () => {
    expect(parseColor([ 0, 0, 0 ])).toEqual({ r: 0, g: 0, b: 0 })
    expect(parseColor([ 17, 34, 238 ])).toEqual({ r: 17 / 255, g: 34 / 255, b: 238 / 255 })
    expect(parseColor([ 17.21, 34.5, 238.999 ])).toEqual({ r: 17.21 / 255, g: 34.5 / 255, b: 238.999 / 255 })
    expect(parseColor([ 1.21, 0.5, 0.999 ])).toEqual({ r: 1.21 / 255, g: 0.5 / 255, b: 0.999 / 255 })
    expect(parseColor([ 255, 255, 255 ])).toEqual({ r: 1, g: 1, b: 1 })

    expect(parseColor([17 / 255, 34 / 255, 238 / 255])).toEqual({ r: 17 / 255, g: 34 / 255, b: 238 / 255 })
    expect(parseColor([0.123, 0.456, 0.789])).toEqual({ r: 0.123, g: 0.456, b: 0.789 })
    expect(parseColor([0, 0.5, 1])).toEqual({ r: 0, g: 0.5, b: 1 })
    expect(parseColor([0, 1, 1])).toEqual({ r: 0, g: 1, b: 1 })
    expect(parseColor([1, 1, 1])).toEqual({ r: 1, g: 1, b: 1 })
    expect(parseColor([1, 1, 1, 1.5], [1, 0.5, 1])).toEqual({ r: 1, g: 0.5029411764705882, b: 1 })

    expect(parseColor([ 0, 0, 0, 0 ], [ 32, 178, 170 ])).toEqual({ r: 32 / 255, g: 178 / 255, b: 170 / 255 })
    expect(parseColor([ 153, 51, 204, 0 ], [ 255, 85, 238 ])).toEqual({ r: 255 / 255, g: 85 / 255, b: 238 / 255 })
    expect(parseColor([ 51, 204, 119, 255 ], [ 147, 112, 219 ])).toEqual({ r: 51 / 255, g: 204 / 255, b: 119 / 255 })
    expect(parseColor([ 255, 238, 85, 255 ], [ 148, 0, 211 ])).toEqual({ r: 255 / 255, g: 238 / 255, b: 85 / 255 })
    expect(parseColor([ 65, 105, 225, 0 ], [ 154, 205, 50 ])).toEqual({ r: 154 / 255, g: 205 / 255, b: 50 / 255 })
    expect(parseColor([ 144, 238, 144, 255 ], [ 240, 248, 255 ])).toEqual({ r: 144 / 255, g: 238 / 255, b: 144 / 255 })
    expect(parseColor([ 255, 255, 255, 255 ], [ 218, 165, 32 ])).toEqual({ r: 1, g: 1, b: 1 })

    expect(parseColor([ 153 / 255, 51 / 255, 204 / 255, 0 ], [ 255 / 255, 85 / 255, 238 / 255 ])).toEqual({ r: 255 / 255, g: 85 / 255, b: 238 / 255 })
    expect(parseColor([ 51 / 255, 204 / 255, 119 / 255, 255 / 255 ], [ 147 / 255, 112 / 255, 219 / 255 ])).toEqual({ r: 51 / 255, g: 204 / 255, b: 119 / 255 })
    expect(parseColor([ 255 / 255, 238 / 255, 85 / 255, 255 / 255 ], [ 148 / 255, 0, 211 / 255 ])).toEqual({ r: 255 / 255, g: 238 / 255, b: 85 / 255 })
    expect(parseColor([ 65 / 255, 105 / 255, 22 / 255, 0 ], [ 154 / 255, 205 / 255, 50 / 255 ])).toEqual({ r: 154 / 255, g: 205 / 255, b: 50 / 255 })
    expect(parseColor([ 144 / 255, 238 / 255, 144 / 255, 255 / 255 ], [ 240 / 255, 248 / 255, 255 / 255 ])).toEqual({ r: 144 / 255, g: 238 / 255, b: 144 / 255 })

    expect(parseColor([ 136, 17, 204, 85 ], [ 238, 34, 238 ])).toEqual({ r: 204 / 255, g: 0.1111111111111111, b: 0.8888888888888891 })
    expect(parseColor([ 136, 255, 187, 170 ], [ 160, 82, 45 ])).toEqual({ r: 0.5647058823529412, g: 0.7738562091503268, b: 0.5477124183006535 })
    expect(parseColor([ 46, 139, 87, 36 ], [ 107, 142, 35 ])).toEqual({ r: 0.38583621683967706, g: 0.55520184544406, b: 0.16604382929642447 })
    expect(parseColor([ 255, 218, 185, 131 ], [ 136, 0, 153 ])).toEqual({ r: 0.7730718954248366, g: 0.4391849288735101, b: 0.6644675124951942 })
    expect(parseColor([ 70, 130, 180, 162 ], [ 255, 127, 80 ])).toEqual({ r: 0.5391003460207613, g: 0.5055132641291811, b: 0.5628604382929643 })

    expect(parseColor([ 136 / 255, 255 / 255, 187 / 255, 170 / 255 ], [ 160 / 255, 82 / 255, 45 / 255 ])).toEqual({ r: 0.5647058823529412, g: 0.7738562091503268, b: 0.5477124183006535 })
    expect(parseColor([ 136 / 255, 17 / 255, 204 / 255, 85 / 255 ], [ 238 / 255, 34 / 255, 238 / 255 ])).toEqual({ r: 204 / 255, g: 0.1111111111111111, b: 0.8888888888888891 })
    expect(parseColor([ 46 / 255, 139 / 255, 87 / 255, 36 / 255 ], [ 107 / 255, 142 / 255, 35 / 255 ])).toEqual({ r: 0.38583621683967706, g: 0.55520184544406, b: 0.16604382929642447 })
    expect(parseColor([ 255 / 255, 218 / 255, 185 / 255, 131 / 255 ], [ 136 / 255, 0, 153 / 255 ])).toEqual({ r: 0.7730718954248366, g: 0.4391849288735101, b: 0.6644675124951942 })
    expect(parseColor([ 70 / 255, 130 / 255, 180 / 255, 162 / 255 ], [ 255 / 255, 127 / 255, 80 / 255 ])).toEqual({ r: 0.5391003460207613, g: 0.5055132641291811, b: 0.5628604382929643 })
  })

  it ('Catching invalid object colors', () => {
    expect(() => parseColor(
      { r: -17, g: 34, b: 238 }
    )).toThrow('Color code \'r\' out of range')
    expect(() => parseColor(
      { r: 17, g: 34, b: 238, a: -34 }
    )).toThrow('Color code \'a\' out of range')
    expect(() => parseColor(
      { r: 17, g: 34, b: 256}
    )).toThrow('Color code \'b\' out of range')
    expect(() => parseColor(
      { r: -17 / 255, g: 34 / 255, b: 238 / 255}
    )).toThrow('Color code \'r\' out of range')
    expect(() => parseColor(
      { r: 46, g: 139, b: 87, a: 36 },
      { r: 107, g: 142, b: -35 }
    )).toThrow('Color code \'b\' out of range')
    expect(() => parseColor(
      { r: 0, g: 0, b: 0, a: 0 }
    )).toThrow('Missing background for transparent color')
    expect(() => parseColor(
      { r: 46, g: 139, b: 87, a: 36 }
    )).toThrow('Missing background for transparent color')
  })

  it('Parsing object colors', () => {
    expect(parseColor({ r: 0, g: 0, b: 0 })).toEqual({ r: 0, g: 0, b: 0 })

    expect(parseColor({ r: 0, g: 1, b: 1 })).toEqual({ r: 0, g: 1, b: 1 })
    expect(parseColor({ r: 1, g: 1, b: 1 })).toEqual({ r: 1, g: 1, b: 1 })
    expect(parseColor({ r: 0, g: 255, b: 255 })).toEqual({ r: 0, g: 1, b: 1 })
    expect(parseColor({ r: 255, g: 255, b: 255 })).toEqual({ r: 1, g: 1, b: 1 })

    expect(parseColor({ r: 255, g: 0, b: 255, a: 0 }, { r: 255, g: 255, b: 0 })).toEqual({ r: 1, g: 1, b: 0 })
    expect(parseColor({ r: 255, g: 0, b: 255, a: 1 }, { r: 255, g: 255, b: 0 })).toEqual({ r: 1, g: 0, b: 1 })
    expect(parseColor({ r: 255, g: 0, b: 255, a: 255 }, { r: 255, g: 255, b: 0 })).toEqual({ r: 1, g: 0, b: 1 })

    expect(parseColor(
      { r: 46, g: 139, b: 87, a: 36 },
      { r: 107, g: 142, b: 35 }
    )).toEqual(
      { r: 0.38583621683967706, g: 0.55520184544406, b: 0.16604382929642447 }
    )
    expect(parseColor(
      { r: 136 / 255, g: 17 / 255, b: 204 / 255, a: 85 / 255 },
      { r: 238 / 255, g: 34 / 255, b: 238 / 255 }
    )).toEqual(
      { r: 204 / 255, g: 0.1111111111111111, b: 0.8888888888888891 }
    )
    expect(parseColor(
      { r: 70 / 255, g: 130 / 255, b: 180 / 255, a: 162 / 255 },
      { r: 255 / 255, g: 127 / 255, b: 80 / 255 }
    )).toEqual(
      { r: 0.5391003460207613, g: 0.5055132641291811, b: 0.5628604382929643 }
    )
  })

  it('Parsing mixed colors', () => {
    const foregrounds: OpaqueColor[] | NonOpaqueColor[] = [
      '#fACd',
      [ 255, 170, 204, 221 / 255 ],
      [ 1, 170 / 255, 204 / 255, 221 ],
      { r: 255, g: 170, b: 204, a: 221 },
      { r: 1, g: 170 / 255, b: 204 / 255, a: 221 / 255 }
    ]
    const backgrounds: OpaqueColor[] = [
      '#f08080',
      [ 240, 128, 128 ],
      [ 240 / 255, 128 / 255, 128 / 255],
      { r: 240, g: 128, b: 128 },
      { r: 240 / 255, g: 128 / 255, b: 128 / 255 }
    ]
    const expectedOutcome = { r: 0.9921568627450981, g: 0.6447058823529411, b: 0.7602614379084968 }
    for (const foreground of foregrounds) {
      for (const background of backgrounds) {
        expect(parseColor(foreground, background)).toEqual(expectedOutcome)
      }
    }
  })
})
