import React, { Component } from 'react';
import { Router } from '@reach/router';
import Dashboard from './pages/DeckListPage';
import DeckDetailsPage from './pages/DeckDetailsPage';
import AddNote from './pages/NoteCreatePage';
import NoteTypeEditPage from './pages/NoteTypeEditPage';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import RequestResetPage from './pages/RequestResetPage';
import ResetPage from './pages/ResetPage';
import Landing from './pages/LandingPage';

import NotFound from './components/NotFound';
import Signout from './components/Signout';

class Pages extends Component {
  render() {
    return (
      <Router>
        <NotFound default />
        <Landing path="/" />
        <SignupPage path="/signup" />
        <SigninPage path="/signin" />
        <Signout path="/signout" />
        <RequestResetPage path="/request-reset" />
        <ResetPage path="/reset/:resetToken" />
        <Dashboard path="/decks" />
        <DeckDetailsPage path="/deck/:slug" />
        <AddNote path="/deck/:slug/add-note" />
        <NoteTypeEditPage path="/note-types/:slug" />
      </Router>
    );
  }
}

export default Pages;
