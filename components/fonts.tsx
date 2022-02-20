import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Pixel';
        font-style: normal;
        font-weight: 500;
        font-display: fallback;
        src: url('/pixel.ttf') format('truetype');
      }
      `}
  />
);

export default Fonts;
