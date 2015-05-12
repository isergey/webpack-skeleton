'use strict';
import React from 'react';

export default React.createClass({
  getDefaultProps() {
    return {
      initial: '',
      placeholder: '',
      type: 'text',
      onChange: () => {
      }
    };
  },
  changeHandle(event) {
    this.props.onChange(event.target.value);
  },
  getValue() {
    return React.findDOMNode(this.refs.input).value;
  },
  render() {
    return (
      <label>
        <input ref='input' type={this.props.type}
               onChange={this.changeHandle}
               defaultValue={this.props.initial}
               placeholder={this.props.placeholder}/>
      </label>
    );
  }
});