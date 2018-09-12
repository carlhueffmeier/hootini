import React, { Component, Fragment } from 'react';
import Navbar from './Navbar';

export default class NotFound extends Component {
  render() {
    return (
      <Fragment>
        <Navbar title="Not found" />
        <h1>Page Not Found</h1>
      </Fragment>
    );
  }
}
