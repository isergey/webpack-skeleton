'use strict';
import React from 'react';

export default React.createClass({
  getDefaultProps() {
    return {
      fromLabel: 'от',
      toLabel: 'до'
    };
  },
  render() {
    return (
      <div><span>{this.props.fromLabel}</span><input type="text"/> <span>{this.props.toLabel}</span><input type="text"/> <span></span></div>
    );
  }
});