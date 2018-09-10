import React, { Component } from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from './AppStyles';
import Pages from './pages';

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Pages />
      </ThemeProvider>
    );
  }
}
