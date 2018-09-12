import React, { Component, Fragment } from 'react';
import { string, func } from 'prop-types';
import styled from 'react-emotion';
import shortid from 'shortid';
import ConnectedFieldArray from '../../components/ConnectedFieldArray';
import { TabbarItem, TabContent } from '../../components/styles/TabStyles';
import {
  TextButton,
  OutlinedButton
} from '../../components/styles/ButtonStyles';
import DraggableTabbar from '../../components/DraggableTabbar';
import DraggableTab from '../../components/DraggableTab';
import TemplateInputField from './TemplateInputField';
import { handleDragInFieldArray } from '../../lib/utils';
import { TrashIcon } from '../../components/Icons';
import { navbarHeight } from '../../shared/dimensions';

const InnerTabContent = styled('div')({
  flex: 1,
  marginBottom: '1rem'
});

export default class EditTemplates extends Component {
  static propTypes = {
    activeTemplateId: string,
    onSelectTemplate: func
  };

  render() {
    const { activeTemplateId, onSelectTemplate } = this.props;
    return (
      <ConnectedFieldArray name="templates">
        {({ values: { templates }, fields }) => {
          const activeTab =
            templates.findIndex(template => template.id === activeTemplateId) ||
            0;
          return (
            <Fragment>
              <DraggableTabbar
                onDragEnd={dragInfo =>
                  handleDragInFieldArray({ dragInfo, fields })
                }
                renderTabs={fields.map((_, index) => {
                  const currentTemplate = templates[index];
                  if (!currentTemplate) {
                    return null;
                  }
                  const uniqueKey = currentTemplate.id || String(index);
                  return (
                    <DraggableTab
                      key={uniqueKey}
                      uniqueKey={uniqueKey}
                      index={index}
                      offset={{ y: -navbarHeight }}
                      onClick={() => onSelectTemplate(currentTemplate.id)}
                      isActive={index === activeTab}
                    >
                      {currentTemplate.name}
                    </DraggableTab>
                  );
                })}
                renderActions={
                  <TabbarItem>
                    <TextButton
                      type="button"
                      textColor="good"
                      onClick={() => {
                        const newId = shortid.generate();
                        fields.push({
                          id: newId,
                          name: ''
                        });
                        onSelectTemplate(newId);
                      }}
                    >
                      + Add
                    </TextButton>
                  </TabbarItem>
                }
              />
              <TabContent>
                {fields.map(
                  (name, index) =>
                    index === activeTab ? (
                      <InnerTabContent key={index}>
                        <TemplateInputField name={name} />
                        <OutlinedButton
                          iconLeft
                          textColor="danger"
                          onClick={() => {
                            fields.remove(index);
                            if (templates.length > 0) {
                              const nextTab = Math.max(0, activeTab - 1);
                              onSelectTemplate(templates[nextTab].id);
                            }
                          }}
                        >
                          <TrashIcon />
                          Delete
                        </OutlinedButton>
                      </InnerTabContent>
                    ) : null
                )}
              </TabContent>
            </Fragment>
          );
        }}
      </ConnectedFieldArray>
    );
  }
}
