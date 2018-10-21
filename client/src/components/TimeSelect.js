import React, { Component } from 'react';
import Downshift from 'downshift';
import { ArrowIcon } from './Icons';
import { ControllerButton, Input, Item, Menu } from './styles/FormStyles';
import { css } from '../lib/utils';
import { VisuallyHidden } from '../shared/styleHelper';

const HiddenLabel = VisuallyHidden.withComponent('label');

export default class TimeSelector extends Component {
  static defaultProps = {
    options: [5, 15, 25],
    unit: 'min'
  };

  state = {
    value: this.props.options[0]
  };

  handleStateChange = changes => {
    if (changes.hasOwnProperty('selectedItem')) {
      this.setState({ value: changes.selectedItem });
    } else if (changes.hasOwnProperty('inputValue')) {
      const integer = parseInt(changes.inputValue, 10);
      if (integer) {
        this.setState({ value: integer });
      }
    }
  };

  suggestTimes(input) {
    const integer = parseInt(input, 10);
    return integer ? [integer] : this.props.options;
  }

  render() {
    const { value } = this.state;

    return (
      <Downshift
        selectedItem={value}
        onStateChange={this.handleStateChange}
        itemToString={x => (x ? `${x} ${this.props.unit}` : '')}
      >
        {({
          getLabelProps,
          getInputProps,
          getToggleButtonProps,
          getMenuProps,
          getItemProps,
          isOpen,
          selectedItem,
          inputValue,
          highlightedIndex
        }) => (
          <div {...css({ width: '5rem' })}>
            <div {...css({ position: 'relative' })}>
              <HiddenLabel {...getLabelProps()}>Review Time</HiddenLabel>
              <Input
                {...getInputProps({
                  placeholder: 'time',
                  type: 'text',
                  pattern: 'd*',
                  noValidate: 'novalidate'
                })}
              />
              <ControllerButton {...getToggleButtonProps()}>
                <ArrowIcon direction={isOpen ? 'up' : 'down'} />
              </ControllerButton>
            </div>
            <div {...css({ position: 'relative' })}>
              <Menu {...getMenuProps({ isOpen })}>
                {isOpen
                  ? this.suggestTimes(inputValue).map((item, index) => (
                      <Item
                        key={item}
                        {...getItemProps({
                          item,
                          index,
                          isActive: highlightedIndex === index,
                          isSelected: selectedItem === item
                        })}
                      >
                        {item}
                      </Item>
                    ))
                  : null}
              </Menu>
            </div>
          </div>
        )}
      </Downshift>
    );
  }
}
