import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DeckList from '../DeckList';

export default class DeckView extends Component {
  render() {
    return (
      <div>
        <DeckList />
        <Link to="/new-deck">+ New Deck</Link>
      </div>
    );
  }
}
