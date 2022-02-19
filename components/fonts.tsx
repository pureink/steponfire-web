import { Global } from '@emotion/react'

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Pixel';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url('/pixel.ttf') format('truetype');
      }
      @font-face {
        font-family: 'Pixel';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/pixel.ttf') format('truetype');
      }
      `}
  />
)

export default Fonts