import React, { Component } from 'react';
import { Router } from '@reach/router';
import Dashboard from './Dashboard';
import DeckDetails from './DeckDetails';
import AddNote from './AddNote';

class Pages extends Component {
  render() {
    return (
      <Router>
        <Dashboard path="/" />
        <DeckDetails path="/deck/:slug" />
        <AddNote path="/deck/:slug/add-note" />
      </Router>
    );
  }
}

export default Pages;
