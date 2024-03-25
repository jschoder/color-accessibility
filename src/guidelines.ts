// https://webaim.org/resources/contrastchecker/
export default {
  text: {
    normal: {
      aa: 4.5,
      aaa: 7.1
    },
    large: {
      threshold: {
        normal: 24,
        bold: 18.667
      },
      aa: 3.1,
      aaa: 4.5
    }
  },
  graphicalObjects: {
    aa: 3.1
  }
} as const
