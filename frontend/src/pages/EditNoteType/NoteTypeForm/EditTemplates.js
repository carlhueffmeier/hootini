import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from '../../../components/Tabs';

export default class EditTemplates extends Component {
  static propTypes = {};

  render() {
    return (
      <div>
        <Tabs>
          <Tabs.Tab title="Production">template</Tabs.Tab>
        </Tabs>
        {/* <FieldArray name="fieldDefinitions">
          {({ fields }) =>
            fields.map((name, index) => (
              <FieldListItem
                key={name}
                index={index}
                draggableId={name}
                name={`${name}.key`}
                onRemove={() => fields.remove(index)}
              />
            ))
          }
        </FieldArray> */}
      </div>
    );
  }
}
