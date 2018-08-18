import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class DeckView extends Component {
  static propTypes = {
    deck: PropTypes.object.isRequired
  };

  render() {
    const { name, description, slug } = this.props.deck;
    return (
      <div>
        <h1>Deck: {name}</h1>
        {description ? <p>{description}</p> : ''}
        <Link to={`/deck/${slug}/settings`}>Settings</Link>
        <Link to={`/deck/${slug}/review`}>Start review</Link>
        <Link to={`/deck/${slug}/new-note`}>Add note</Link>
      </div>
    );
  }
}
