import React, { Component, Fragment } from 'react';
import { number, func } from 'prop-types';
import styled from 'react-emotion';
import { Field } from 'react-final-form';
import { Input, Label } from '../../components/styles/FormStyles';
import EditTemplates from './EditTemplates';
import FieldList from './FieldList';

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

export default class EditSection extends Component {
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
          <EditTemplates activeTab={activeTab} onSelectTab={onSelectTab} />
        </TemplateSection>
      </Fragment>
    );
  }
}
