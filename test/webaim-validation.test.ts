import {
  testTextContrastAA,
  testTextContrastAAA,
  testAdjacentObjectContrast,
  testObjectContrast
} from '../src/webaim-validation'

describe('Testing contrasts according to WebAIM guidelines', () => {
  it('Testing actual websites', () => {
    // Google (Dark)
    expect(testTextContrastAAA('#e8eaed', '#303134')).toBe(true)
    expect(testTextContrastAAA('#bdc1c6', '#202124')).toBe(true)

    // Amazon
    expect(testTextContrastAAA('#fff', '#232f3e')).toBe(true)
    expect(testTextContrastAAA('#e47911', '#232f3e')).toBe(false)
    expect(testTextContrastAA('#e47911', '#232f3e')).toBe(true)
    expect(testObjectContrast('#febd69', '#232f3e')).toBe(true)
    expect(testTextContrastAAA('#232F3E', '#FEBd69')).toBe(true)

    // Facebook Login
    expect(testTextContrastAAA('#fff', '#1877f2', 20, true)).toBe(false)
    expect(testTextContrastAA('#fff', '#1877f2', 20, true)).toBe(true)
    expect(testTextContrastAA('#fff', '#42b72a', 17, true)).toBe(false)

    // Spotify
    expect(testAdjacentObjectContrast([
      '#1ed760',
      '#121212'
    ])).toBe(true)
    expect(testAdjacentObjectContrast([
      '#242424',
      '#121212'
    ])).toBe(false)

    // Electoral Vote
    expect(testTextContrastAAA('#9E1515', '#fff', 16, true)).toBe(true)
    expect(testTextContrastAA('#4968ff', '#fff', undefined, true)).toBe(false)
  })
})
