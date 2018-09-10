import { injectGlobal } from 'emotion';
import * as typography from './shared/typography';
import * as colors from './shared/colors';
import * as timings from './shared/timings';

injectGlobal`
  html {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    width: 100vw;
    min-height: 100%;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
`;

const theme = {
  typography,
  colors,
  timings
};

export default theme;
