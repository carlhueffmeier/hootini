import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'react-emotion';
import PreviewPane from './PreviewPane';
import Tabs from '../../../components/Tabs';
import * as typography from '../../../shared/typography';
import * as colors from '../../../shared/colors';
import { css } from '../../../helper/utils';
import { EditIcon } from '../../../shared/Icons';
import { TextButton, IconButton } from '../../../shared/Buttons';

const Card = styled('div')({
  boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12)',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 2,
  height: '100%',
  background: '#FAFAFA'
});

const CardTitle = styled('h3')({
  ...typography.h5,
  margin: '1rem 0',
  color: colors.textDark,
  textAlign: 'center'
});

const TabActions = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '0.5rem'
});

export default class NotePreview extends Component {
  static propTypes = {
    noteTypeId: PropTypes.string.isRequired
  };

  state = {
    isCardFlipped: false
  };

  flipCard = () =>
    this.setState(state => ({ isCardFlipped: !state.isCardFlipped }));

  render() {
    const { noteTypeId, fields } = this.props;
    return (
      <Query query={NOTE_TYPE_QUERY} variables={{ id: noteTypeId }}>
        {({ loading, error, data }) => {
          if (loading) {
            return 'Loading note type...';
          }
          if (error) {
            return <li>Error! {error.message}</li>;
          }
          const { NoteType } = data;
          return (
            <Card>
              <CardTitle>Preview</CardTitle>
              <Tabs>
                {NoteType.templates &&
                  NoteType.templates.map((template, index) => (
                    <Tabs.Tab key={index} title={template.name}>
                      <PreviewPane
                        template={template}
                        fields={fields}
                        showAnswer={this.state.isCardFlipped}
                      />
                    </Tabs.Tab>
                  ))}
              </Tabs>
              <TabActions>
                <TextButton type="button" onClick={this.flipCard}>
                  {this.state.isCardFlipped ? 'Hide Answer' : 'Show Answer'}
                </TextButton>
                <div {...css({ marginLeft: 'auto' })}>
                  <IconButton type="button">
                    <EditIcon />
                  </IconButton>
                </div>
              </TabActions>
            </Card>
          );
        }}
      </Query>
    );
  }
}

const NOTE_TYPE_QUERY = gql`
  query NoteType($id: ID!) {
    NoteType(id: $id) {
      id
      name
      templates {
        name
        front
        back
      }
    }
  }
`;
