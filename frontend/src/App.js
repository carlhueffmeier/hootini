import React, { Component } from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from './AppStyles';
import Routes from './Routes';

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    );
  }
}
