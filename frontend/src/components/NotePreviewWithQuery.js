import React, { Component } from 'react';
import { string, object } from 'prop-types';
import SingleNoteType from './SingleNoteType';
import NotePreview from './NotePreview';

export default class NotePreviewWithQuery extends Component {
  static propTypes = {
    noteTypeId: string.isRequired,
    values: object.isRequired
  };

  render() {
    const { noteTypeId, renderActions, ...restProps } = this.props;
    return (
      <SingleNoteType id={noteTypeId}>
        {({ data, loading, error }) => {
          if (loading) {
            return 'Loading preview...';
          }
          if (error) {
            return 'Error loading preview';
          }
          const provided = { noteType: data.NoteType };
          return (
            <NotePreview
              templates={provided.noteType.templates}
              renderActions={providedByNotePreview =>
                renderActions({ ...providedByNotePreview, ...provided })
              }
              {...restProps}
            />
          );
        }}
      </SingleNoteType>
    );
  }
}
