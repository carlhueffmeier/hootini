import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: flex;
`;

export default class NewDeckScreen extends Component {
  static propTypes = {
    onSubmit: PropTypes.func
  };

  static defaultProps = {
    onSubmit: () => {},
    onClose: () => {},
    name: '',
    description: ''
  };

  initialState = {
    name: this.props.name,
    description: this.props.description
  };

  state = this.initialState;

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props
      .onSubmit({
        variables: {
          name: this.state.name,
          description: this.state.description
        }
      })
      .then(this.setState(this.initialState))
      .then(this.props.onClose);
  };

  render() {
    const { name, description } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Label>
          Deck Name
          <input
            value={name}
            onChange={this.handleChange}
            name="name"
            placeholder="New Deck"
          />
        </Label>
        <Label>
          Description
          <textarea
            value={description}
            onChange={this.handleChange}
            name="description"
            placeholder="Description..."
          />
        </Label>
        <button type="button" onClick={this.props.onClose}>
          Cancel
        </button>
        <button type="submit">Create Deck</button>
      </Form>
    );
  }
}
