import React, { Component, Fragment } from 'react';
import { number, func } from 'prop-types';
import styled from 'react-emotion';
import { Field } from 'react-final-form';
import { Input, Label } from './styles/FormStyles';
import TemplatesEdit from './TemplatesEdit';
import FieldList from './NoteTypeFieldList';

const NameSection = styled('div')({
  maxWidth: '15rem',
  marginBottom: '3rem'
});

const FieldSection = styled('div')({
  maxWidth: '15rem',
  marginBottom: '3rem'
});

const TemplateSection = styled('div')({
  maxWidth: '30rem'
});

const SectionHeading = styled('h5')(({ theme }) => ({
  ...theme.typography.h5,
  color: theme.colors.textDark,
  margin: '0 0 1.5rem 0'
}));

class NoteTypeEditSection extends Component {
  static propTypes = {
    activeTab: number,
    onSelectTab: func
  };

  render() {
    const { activeTab, onSelectTab } = this.props;
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
          <SectionHeading>Templates</SectionHeading>
          <TemplatesEdit activeTab={activeTab} onSelectTab={onSelectTab} />
        </TemplateSection>
      </Fragment>
    );
  }
}

export default NoteTypeEditSection;
