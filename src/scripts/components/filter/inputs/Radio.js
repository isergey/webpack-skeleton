'use strict';
import React from 'react';
import marked from 'marked';
import _ from 'lodash';

export default React.createClass({
  getDefaultProps() {
    return {
      label: '',
      disabled: false,
      checked: false,
      name: '1',
      value: '',
      onChange: () => { }
    };
  },
  getInitialState() {
    return {
      disabled: this.props.disabled,
      checked: this.props.checked
    };
  },
  handleChange(event) {
    this.props.onChange({
      name: event.target.name,
      value: event.target.value,
      checked: event.target.checked
    });
  },
  render() {
    var input = <input
      type="radio"
      name={this.props.name}
      value={this.props.value}
      disabled={this.state.disabled}
      defaultChecked={this.state.checked}
      onChange={this.handleChange}
    />;

    if (!this.props.label) {
      return (
        input
      );
    }
    return (
      <label>{input} { this.props.label }1</label>
    );
  }
});