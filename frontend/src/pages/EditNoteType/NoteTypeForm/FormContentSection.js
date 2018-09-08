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

  state = {
    activeTemplateId: null
  };

  handleSelectTemplate = id => {
    this.setState({ activeTemplateId: id });
  };

  render() {
    const { values, isShifted } = this.props;
    const { activeTemplateId } = this.state;
    return (
      <FormContentContainer isShifted={isShifted}>
        <HorizontalPartition>
          <div {...css({ maxWidth: '15rem', marginBottom: '1rem' })}>
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
          </div>
          <div {...css({ maxWidth: '30rem' })}>
            <Label>Templates</Label>
            <EditTemplates
              values={values}
              activeTemplateId={activeTemplateId}
              onSelectTemplate={this.handleSelectTemplate}
            />
          </div>
        </HorizontalPartition>
        <HorizontalPartition>
          <NotePreview
            templates={values.templates}
            fields={values}
            activeTemplateId={activeTemplateId}
            onSelectTemplate={this.handleSelectTemplate}
          />
        </HorizontalPartition>
      </FormContentContainer>
    );
  }
}
