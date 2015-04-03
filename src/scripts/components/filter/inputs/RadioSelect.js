'use strict';
import React from 'react';
import marked from 'marked';
import Radio from './Radio';
export default React.createClass({
  render() {
    return (
      <div className="filter-radio-select">
        <Radio onChange={()=> {
          console.log('123');
        }}/>
        <Radio />
        <Radio />
      </div>
    );
  }
});