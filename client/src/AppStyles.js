import { injectGlobal } from 'emotion';
import * as breakpoints from './shared/breakpoints';
import * as colors from './shared/colors';
import * as dimensions from './shared/dimensions';
import * as gradients from './shared/gradients';
import * as timings from './shared/timings';
import * as typography from './shared/typography';

injectGlobal`
  html {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    width: 100%;
    min-height: 100%;
    background: ${colors.backgroundLight2};
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
`;

const theme = {
  breakpoints,
  colors,
  dimensions,
  gradients,
  timings,
  typography
};

export default theme;
