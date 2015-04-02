'use strict';
import React from 'react';
import marked from 'marked';
export default React.createClass({
  render() {
    return (
      <div class="form-radio-select-field">
        <input type="radio" name="browser" value="1"/>
        <label>1</label>
        <input type="radio" name="browser" value="2"/>
        <label>2</label>
        <input type="radio" name="browser" value="3"/>
        <label>3</label>
      </div>
    );
  }
});