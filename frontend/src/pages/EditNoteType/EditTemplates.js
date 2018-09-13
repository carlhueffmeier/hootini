import React, { Component, Fragment } from 'react';
import { number, func } from 'prop-types';
import styled from 'react-emotion';
import ConnectedFieldArray from '../../components/ConnectedFieldArray';
import { TabbarItem, TabContent } from '../../components/styles/TabStyles';
import {
  TextButton,
  OutlinedButton
} from '../../components/styles/ButtonStyles';
import DraggableTabbar from '../../components/DraggableTabbar';
import DraggableTab from '../../components/DraggableTab';
import TemplateInputField from './TemplateInputField';
import {
  handleDragInFieldArray,
  addLocalId,
  getUniqueKey
} from '../../lib/utils';
import { TrashIcon } from '../../components/Icons';
import { navbarHeight } from '../../shared/dimensions';

const InnerTabContent = styled('div')({
  flex: 1,
  marginBottom: '1rem'
});

export default class EditTemplates extends Component {
  static propTypes = {
    activeTab: number,
    onSelectTab: func
  };

  handleDragEnd({ fields, dragInfo }) {
    const { activeTab, onSelectTab } = this.props;
    // Move field entries
    if (!handleDragInFieldArray({ dragInfo, fields })) {
      // If no move happened, nothing to be done
      return;
    }

    const { source, destination } = dragInfo;
    if (destination && source.index === activeTab) {
      // If the active tab is moved, make sure it stays active after move
      onSelectTab(destination.index);
    } else if (source.index > activeTab && destination.index <= activeTab) {
      // If a tab is moved before, shift the active tab to the right
      onSelectTab(activeTab + 1);
    } else if (source.index < activeTab && destination.index >= activeTab) {
      // If a tab is moved after the active tab, shift the active tab to the left
      onSelectTab(activeTab - 1);
    }
  }

  render() {
    const { activeTab, onSelectTab } = this.props;
    return (
      <ConnectedFieldArray name="templates">
        {({ values: { templates }, fields }) => {
          return (
            <Fragment>
              <DraggableTabbar
                onDragEnd={dragInfo => this.handleDragEnd({ dragInfo, fields })}
                renderTabs={fields.map((_, index) => {
                  const currentTemplate = templates[index];
                  if (!currentTemplate) {
                    return null;
                  }
                  const uniqueKey = getUniqueKey(currentTemplate);
                  return (
                    <DraggableTab
                      key={uniqueKey}
                      uniqueKey={uniqueKey}
                      index={index}
                      offset={{ y: -navbarHeight }}
                      onClick={() => onSelectTab(index)}
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
                        fields.push({
                          ...addLocalId(),
                          name: ''
                        });
                        onSelectTab(templates.length);
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
                              onSelectTab(nextTab);
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
