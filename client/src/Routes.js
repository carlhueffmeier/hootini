import React, { Component } from 'react';
import { Router } from '@reach/router';
import DeckListPage from './pages/DeckListPage';
import DeckDetailsPage from './pages/DeckDetailsPage';
import NoteCreatePage from './pages/NoteCreatePage';
import NoteTypeEditPage from './pages/NoteTypeEditPage';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import RequestResetPage from './pages/RequestResetPage';
import ResetPage from './pages/ResetPage';
import LandingPage from './pages/LandingPage';
import ReviewPage from './pages/ReviewPage';

import NotFound from './components/NotFound';
import Signout from './components/Signout';

class Pages extends Component {
  render() {
    return (
      <Router>
        <NotFound default />
        <LandingPage path="/" />
        <SignupPage path="/signup" />
        <SigninPage path="/signin" />
        <Signout path="/signout" THIS_IS_ONLY_TEMPORARY___REMOVE_ME_SOON___ />
        <RequestResetPage path="/request-reset" />
        <ResetPage path="/reset/:resetToken" />
        <DeckListPage path="/decks" />
        <DeckDetailsPage path="/deck/:slug" />
        <ReviewPage path="/deck/:slug/review" />
        <NoteCreatePage path="/deck/:slug/add-note" />
        <NoteTypeEditPage path="/note-types/:slug" />
      </Router>
    );
  }
}

export default Pages;
