'use strict';
import React from 'react';
import classnames from 'classnames';

import _ from 'lodash';

import RadioSelectField from './inputs/RadioSelect';


export default React.createClass({
  getDefaultProps() {
    return {
      expandable: true,
      expanded: true,
      title: '',
      input: {}
    };
  },
  getInitialState() {
    return {
      expanded: this.props.expanded
    };
  },
  expanderClickHandle() {
    if (this.props.expandable) {
      this.setState({expanded: !this.state.expanded});
    }
  },
  render() {
    var expanderClasses = classnames('filter-field__expander', {'filter-field__expander_closed': !this.state.expanded });

    var filterInputClasses = classnames( 'filter-field__input', {'filter-field__input_closed': !this.state.expanded });

    var expander = this.props.expandable ?
      <span className={expanderClasses} onClick={this.expanderClickHandle}>*</span>
      : null;

    //var input =
    return (
      <div className="filter-field">
        <div className="filter-field__header">
          { expander }
          <span onClick={this.expanderClickHandle} className="filter-field__title">{ this.props.title }</span>
          <div className={filterInputClasses}>
            <RadioSelectField />
          </div>
        </div>
      </div>
    );
  }
});