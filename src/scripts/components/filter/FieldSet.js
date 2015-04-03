'use strict';
import React from 'react';
import marked from 'marked';
import _ from 'lodash';
import Field from './Field.js';

export default React.createClass( {
  render() {
    return (
      <div className="filter-fieldset">
        <Field title='Услуга'/>
        <Field/>
      </div>
    );
  }
});