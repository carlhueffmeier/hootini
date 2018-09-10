import React, { Component, Fragment } from 'react';
import { string, func } from 'prop-types';
import styled from 'react-emotion';
import { Field } from 'react-final-form';
import { Input, Label } from '../../components/styles/FormStyles';
import EditTemplates from './EditTemplates';
import FieldList from './FieldList';

const NameSection = styled('div')({
  maxWidth: '15rem',
  marginBottom: '2rem'
});

const FieldSection = styled('div')({
  maxWidth: '15rem',
  marginBottom: '2rem'
});

const TemplateSection = styled('div')({
  maxWidth: '30rem'
});

export default class EditSection extends Component {
  static propTypes = {
    activeTemplateId: string,
    onSelectTemplate: func
  };

  render() {
    const { activeTemplateId, onSelectTemplate } = this.props;
    return (
      <Fragment>
        <Field name="name">
          {({ input, meta }) => (
            <NameSection>
              <Label>Name</Label>
              <Input {...input} />
            </NameSection>
          )}
        </Field>
        <FieldSection>
          <Label>Fields</Label>
          <FieldList />
        </FieldSection>
        <TemplateSection>
          <Label>Templates</Label>
          <EditTemplates
            activeTemplateId={activeTemplateId}
            onSelectTemplate={onSelectTemplate}
          />
        </TemplateSection>
      </Fragment>
    );
  }
}
