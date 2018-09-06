import React, { Component } from 'react';
import { object, func, string } from 'prop-types';
import Downshift from 'downshift';
import { ArrowIcon } from '../../shared/Icons';
import { css } from '../../helper/utils';
import { Input, ControllerButton, Menu } from '../../shared/Inputs';

export default class DownshiftInput extends Component {
  static propTypes = {
    input: object.isRequired,
    meta: object.isRequired,
    placeholder: string,
    inputProps: object,
    itemToString: func.isRequired,
    renderLabel: func.isRequired,
    renderMenu: func.isRequired
  };

  static defaultProps = {
    inputProps: {},
    placeholder: ''
  };

  render() {
    const {
      input,
      meta,
      itemToString,
      renderMenu,
      renderLabel,
      inputProps,
      ...options
    } = this.props;

    console.log(input);
    return (
      <Downshift
        {...input}
        {...options}
        onChange={selectedItem => {
          input.onChange(selectedItem);
        }}
        itemToString={itemToString}
        inputValue={input.value}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          getToggleButtonProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem
        }) => (
          <div {...css({ width: '100%' })}>
            {renderLabel({ getLabelProps })}
            <div {...css({ position: 'relative' })}>
              <Input {...getInputProps({ ...inputProps, name: input.name })} />
              <ControllerButton {...getToggleButtonProps()}>
                <ArrowIcon direction={isOpen ? 'up' : 'down'} />
              </ControllerButton>
            </div>
            <div {...css({ position: 'relative' })}>
              <Menu {...getMenuProps({ isOpen })}>
                {isOpen &&
                  renderMenu({
                    getItemProps,
                    inputValue,
                    highlightedIndex,
                    selectedItem
                  })}
              </Menu>
            </div>
          </div>
        )}
      </Downshift>
    );
  }
}
