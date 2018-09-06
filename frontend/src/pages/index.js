import React, { Component } from 'react';
import { Router } from '@reach/router';
import Dashboard from './Dashboard';
import DeckDetails from './DeckDetails';
import AddNote from './AddNote';
import EditNoteType from './EditNoteType';

class Pages extends Component {
  render() {
    return (
      <Router>
        <Dashboard path="/" />
        <DeckDetails path="/deck/:slug" />
        <AddNote path="/deck/:slug/add-note" />
        <EditNoteType path="/note-types/:slug" />
      </Router>
    );
  }
}

export default Pages;
