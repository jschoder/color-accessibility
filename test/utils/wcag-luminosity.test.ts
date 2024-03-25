import { calculateWcagLuminosityRatio } from '../../src/utils/wcagLuminosity'

describe('Testing WCAG2 color contrast', () => {
  it ('Calculating same color contrasts', () => {
    expect(calculateWcagLuminosityRatio(
      { r: 0, g: 0, b: 0 },
      { r: 0, g: 0, b: 0 }
    )).toEqual(1)
    expect(calculateWcagLuminosityRatio(
      { r: 0.5, g: 0.5, b: 0.5 },
      { r: 0.5, g: 0.5, b: 0.5 }
    )).toEqual(1)
    expect(calculateWcagLuminosityRatio(
      { r: 1, g: 1, b: 1 },
      { r: 1, g: 1, b: 1 }
    )).toEqual(1)

    expect(calculateWcagLuminosityRatio(
      { r: 0, g: 0.7, b: 0.7 },
      { r: 0, g: 0.7, b: 0.7 }
    )).toEqual(1)
    expect(calculateWcagLuminosityRatio(
      { r: 0.7, g: 0, b: 0 },
      { r: 0.7, g: 0, b: 0 }
    )).toEqual(1)
    expect(calculateWcagLuminosityRatio(
      { r: 0.7, g: 0, b: 0.7 },
      { r: 0.7, g: 0, b: 0.7 }
    )).toEqual(1)
  })

  it ('Calculating red contrasts', () => {
    expect(calculateWcagLuminosityRatio(
      { r: 1, g: 0, b: 0 },
      { r: 1, g: 1, b: 1 }
    )).toEqual(3.9984767707539985)
    expect(calculateWcagLuminosityRatio(
      { r: 1, g: 1, b: 1 },
      { r: 1, g: 0, b: 0 }
    )).toEqual(3.9984767707539985)

    expect(calculateWcagLuminosityRatio(
      { r: 1, g: 0.6, b: 0 },
      { r: 0.8, g: 0.8, b: 0.8 }
    )).toEqual(1.3331861097032776)

    expect(calculateWcagLuminosityRatio(
      { r: 1, g: 0, b: 0 },
      { r: 0, g: 0, b: 0 }
    )).toEqual(5.252)
    expect(calculateWcagLuminosityRatio(
      { r: 0, g: 0, b: 0 },
      { r: 1, g: 0, b: 0 }
    )).toEqual(5.252)
  })

  it ('Calculating green contrasts', () => {
    expect(calculateWcagLuminosityRatio(
      { r: 0, g: 1, b: 0 },
      { r: 1, g: 1, b: 1 }
    )).toEqual(1.3721902770517513)
    expect(calculateWcagLuminosityRatio(
      { r: 1, g: 1, b: 1 },
      { r: 0, g: 1, b: 0 }
    )).toEqual(1.3721902770517513)

    expect(calculateWcagLuminosityRatio(
      { r: 0, g: 1, b: 0.6 },
      { r: 0.8, g: 0.8, b: 0.8 }
    )).toEqual(1.2055156316353182)

    expect(calculateWcagLuminosityRatio(
      { r: 0, g: 1, b: 0 },
      { r: 0, g: 0, b: 0 }
    )).toEqual(15.303999999999998)
    expect(calculateWcagLuminosityRatio(
      { r: 0, g: 0, b: 0 },
      { r: 0, g: 1, b: 0 }
    )).toEqual(15.303999999999998)
  })

  it ('Calculating blue contrasts', () => {
    expect(calculateWcagLuminosityRatio(
      { r: 0, g: 0, b: 1 },
      { r: 1, g: 1, b: 1 }
    )).toEqual(8.592471358428805)
    expect(calculateWcagLuminosityRatio(
      { r: 1, g: 1, b: 1 },
      { r: 0, g: 0, b: 1 }
    )).toEqual(8.592471358428805)

    expect(calculateWcagLuminosityRatio(
      { r: 0, g: 0.6, b: 1 },
      { r: 0.8, g: 0.8, b: 0.8 }
    )).toEqual(1.867946523708832)

    expect(calculateWcagLuminosityRatio(
      { r: 0, g: 0, b: 1 },
      { r: 0, g: 0, b: 0 }
    )).toEqual(2.444)
    expect(calculateWcagLuminosityRatio(
      { r: 0, g: 0, b: 0 },
      { r: 0, g: 0, b: 1 }
    )).toEqual(2.444)
  })
})
