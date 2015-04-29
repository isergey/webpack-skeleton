'use strict';
import React from 'react';

export default React.createClass({
  getDefaultProps() {
    return {
      initial: ''
    };
  },
  render() {
    return (
      <label><input type="text" value={this.props.initial}/></label>
    );
  }
});