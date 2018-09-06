import { injectGlobal } from 'emotion';

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
