'use strict';
import React from 'react';
import Radio from './Radio';

export default React.createClass({
  render() {
    return (
      <div className="filter-radio-select">
        <Radio/>
        <Radio/>
        <Radio/>
      </div>
    );
  }
});