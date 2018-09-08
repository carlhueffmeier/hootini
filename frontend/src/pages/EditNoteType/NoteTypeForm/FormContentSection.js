import React, { Component } from 'react';
import { bool, object } from 'prop-types';
import NotePreview from '../../../components/NotePreview';
import { css } from '../../../lib/utils';
import { Field } from 'react-final-form';
import { Input, Label } from '../../../shared/Inputs';
import EditTemplates from './EditTemplates';
import { FormContentContainer, HorizontalPartition } from './styles';
import FieldList from './FieldList';

export default class FormContentSection extends Component {
  static propTypes = {
    isShifted: bool,
    values: object
  };

  render() {
    const { values, isShifted } = this.props;
    return (
      <FormContentContainer isShifted={isShifted}>
        <HorizontalPartition>
          <div {...css({ maxWidth: '15rem', marginBottom: '2rem' })}>
            <Field name="name">
              {({ input, meta }) => (
                <div {...css({ marginBottom: '1rem' })}>
                  <Label>Name</Label>
                  <Input {...input} />
                </div>
              )}
            </Field>
            <div {...css({ marginBottom: '1rem' })}>
              <Label>Fields</Label>
              <FieldList values={values} />
            </div>
            <Label>Templates</Label>
            <EditTemplates />
          </div>
        </HorizontalPartition>
        <HorizontalPartition>
          <NotePreview
            templates={[{ name: 'mock', front: 'hey', back: 'there' }]}
            fields={values}
          />
        </HorizontalPartition>
      </FormContentContainer>
    );
  }
}
