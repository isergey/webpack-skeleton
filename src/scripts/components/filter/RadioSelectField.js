'use strict';
import React from 'react';
import marked from 'marked';
import Radio from './Radio';
export default React.createClass({
  render() {
    return (
      <div class="form-radio-select-field">
        <Radio/>
        <Radio/>
        <Radio/>
      </div>
    );
  }
});