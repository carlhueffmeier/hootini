import React, { Component } from 'react';
import { Router } from '@reach/router';
import Dashboard from './Dashboard';
import DeckDetails from './DeckDetails';
import AddNote from './AddNote';
import EditNoteType from './EditNoteType';
import Signup from './Signup';
import NotFound from '../components/NotFound';

class Pages extends Component {
  render() {
    return (
      <Router>
        <NotFound default />
        <Dashboard path="/" />
        <DeckDetails path="/deck/:slug" />
        <AddNote path="/deck/:slug/add-note" />
        <Signup path="/signup" />
        <EditNoteType path="/note-types/:slug" />
      </Router>
    );
  }
}

export default Pages;
