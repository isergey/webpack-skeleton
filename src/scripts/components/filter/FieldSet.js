'use strict';
import React from 'react';
import marked from 'marked';
import _ from 'lodash';

import RadioSelectField from './RadioSelectField';

export default React.createClass( {
  render() {
    return (
      <div class="form-fieldset">
        Field set1
        <RadioSelectField/>
      </div>
    );
  }
});