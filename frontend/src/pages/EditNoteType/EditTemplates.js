import React, { Component, Fragment } from 'react';
import { string, func } from 'prop-types';
import shortid from 'shortid';
import ConnectedFieldArray from '../../components/ConnectedFieldArray';
import { TabbarItem, TabContent } from '../../components/styles/TabStyles';
import { TextButton } from '../../components/styles/ButtonStyles';
import DraggableTabbar from '../../components/DraggableTabbar';
import DraggableTab from '../../components/DraggableTab';
import TemplateInputField from './TemplateInputField';
import { handleDragInFieldArray } from '../../lib/utils';

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
          const activeTab = templates.findIndex(
            template => template.id === activeTemplateId
          );
          return (
            <Fragment>
              <DraggableTabbar
                onDragEnd={dragInfo =>
                  handleDragInFieldArray({ dragInfo, fields })
                }
                renderTabs={fields.map((_, index) => {
                  const currentTemplate = templates[index];
                  const uniqueKey = currentTemplate.id || String(index);
                  return (
                    <DraggableTab
                      key={uniqueKey}
                      uniqueKey={uniqueKey}
                      index={index}
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
                }
              />
              <TabContent>
                {fields.map(
                  (name, index) =>
                    index === activeTab ? (
                      <TemplateInputField key={index} name={name} />
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
