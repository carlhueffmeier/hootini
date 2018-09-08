import React, { Component, Fragment } from 'react';
import { FieldArray } from 'react-final-form-arrays';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import shortid from 'shortid';
import { Field } from 'react-final-form';
import { Label, Textarea } from '../../../shared/Inputs';
import {
  Tabbar,
  TabbarItem,
  TabContent
} from '../../../components/styles/TabbarStyles';
import { TabButton, TextButton } from '../../../shared/Buttons';
import * as colors from '../../../shared/colors';
import styled from 'react-emotion';

const TemplateInputArea = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  '& > div': {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '0.5rem'
  }
});

export default class EditTemplates extends Component {
  static propTypes = {};

  componentDidMount() {
    const { activeTemplateId, values, onSelectTemplate } = this.props;
    if (!activeTemplateId) {
      onSelectTemplate(values.templates[0].id);
    }
  }

  onDragEnd = ({ dragInfo, fields }) => {
    const { destination, source, draggableId } = dragInfo;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Change position in FieldArray
    fields.move(source.index, destination.index);
  };

  render() {
    const { values, activeTemplateId, onSelectTemplate } = this.props;
    return (
      <FieldArray name="templates">
        {({ fields }) => {
          const activeTab = values.templates.findIndex(
            template => template.id === activeTemplateId
          );

          return (
            <DragDropContext
              onDragEnd={dragInfo => this.onDragEnd({ dragInfo, fields })}
            >
              <Droppable droppableId="templates" direction="horizontal">
                {provided => (
                  <Fragment>
                    <Tabbar
                      {...provided.droppableProps}
                      innerRef={provided.innerRef}
                    >
                      {fields.map((name, index) => {
                        const currentTemplate = values.templates[index];
                        const uniqueKey = currentTemplate.id || String(index);
                        return (
                          <Draggable
                            disableInteractiveElementBlocking
                            key={uniqueKey}
                            draggableId={uniqueKey}
                            index={index}
                          >
                            {provided => (
                              <TabbarItem
                                {...provided.draggableProps}
                                innerRef={provided.innerRef}
                                {...provided.dragHandleProps}
                              >
                                <TabButton
                                  type="button"
                                  onClick={() =>
                                    onSelectTemplate(currentTemplate.id)
                                  }
                                  isActive={index === activeTab}
                                >
                                  {currentTemplate.name}
                                </TabButton>
                              </TabbarItem>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                      <TabbarItem>
                        <TextButton
                          type="button"
                          color={colors.good}
                          onClick={() =>
                            fields.push({
                              id: shortid.generate(),
                              name: ''
                            })
                          }
                        >
                          + New Template
                        </TextButton>
                      </TabbarItem>
                    </Tabbar>
                    <TabContent>
                      {fields.map((name, index) => {
                        if (index !== activeTab) {
                          return null;
                        }
                        return (
                          <TemplateInputArea key={index}>
                            <Field name={`${name}.front`}>
                              {({ input, meta }) => (
                                <div>
                                  <Label>Front</Label>
                                  <Textarea {...input} rows="4" />
                                  {meta.touched &&
                                    meta.error && <span>{meta.error}</span>}
                                </div>
                              )}
                            </Field>
                            <Field name={`${name}.back`}>
                              {({ input, meta }) => (
                                <div>
                                  <Label>Back</Label>
                                  <Textarea {...input} rows="4" />
                                  {meta.touched &&
                                    meta.error && <span>{meta.error}</span>}
                                </div>
                              )}
                            </Field>
                          </TemplateInputArea>
                        );
                      })}
                    </TabContent>
                  </Fragment>
                )}
              </Droppable>
            </DragDropContext>
          );
        }}
      </FieldArray>
    );
  }
}
