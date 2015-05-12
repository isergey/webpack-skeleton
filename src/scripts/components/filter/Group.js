'use strict';
import React from 'react/addons';
import classnames from 'classnames';

import Field from './Field.js';
import RadioSelect from './inputs/RadioSelect';
import CheckboxSelect from './inputs/CheckboxSelect';
import Range from './inputs/Range';
import Text from './inputs/Text';


var checkForShow = (field, filterValues) => {
  var showField = true;
  var showOn = field.showOn;
  if (showOn !== undefined) {
    showField = false;
    for (let key in showOn) {
      let filterValuesForCurrentKey = filterValues[key];
      if (filterValuesForCurrentKey === undefined) {
        continue;
      }
      let showOnValues = showOn[key];
      for (let showOnValue of showOnValues) {
        if (filterValuesForCurrentKey.indexOf(showOnValue) > -1) {
          showField = true;
        }
      }
    }
  }
  return showField;
};


var Group = React.createClass({
  getDefaultProps() {
    return {
      title: '',
      fields: [],
      children: [],
      needClose: false,
      expanded: false,
      filterValues: {},
      onChange: () => {
      }
    };
  },
  getInitialState() {
    return {
      expanded: this.props.expanded
    };
  },
  componentWillReceiveProps (args) {
    if (args.needClose) {
      this.setState({
        expanded: false
      });
    }
  },
  titleClickHandle() {
    this.setState({
      expanded: !this.state.expanded
    });
  },
  changeHandle(fieldValue) {
    console.log('group fieldValue', fieldValue);
    this.props.onChange(fieldValue);
  },
  render() {
    var self = this;
    var expanded = this.state.expanded;

    var fields = this.props.fields.map((field, i) => {
      var showField = checkForShow(field, self.props.filterValues);

      var input;
      var inputProps = {};
      if (field.input === 'RadioSelect') {
        input = RadioSelect;
        inputProps.choices = field.choices;
        inputProps.name = field.name;

      } else if (field.input === 'CheckboxSelect') {
        input = CheckboxSelect;
        inputProps.choices = field.choices;
        inputProps.name = field.name;
      } else if (field.input === 'Range') {
        input = Range;
        inputProps.fromLabel = field.fromLabel;
        inputProps.toLabel = field.toLabel;

      }

      return (
        <Field
          key={i}
          name={field.name}
          show={showField}
          title={field.title}
          expandable={field.expandable}
          initial={field.initial}
          input={input}
          inputProps={inputProps}
          onChange={this.changeHandle}/>
      );
    });

    var children = this.props.children.map(function (child, i) {
      return (
        <li key={i} className="filter-group__children-item">
          <Group
            filterValues={self.props.filterValues}
            onChange={self.props.onChange}
            needClose={!self.state.expanded}
            title={child.title}
            fields={child.fields}
            children={child.children}/>
        </li>
      );
    });

    var contentClasses = classnames('filter-group__content', {'filter-group__content_closed': !expanded});
    var expanderClasses = classnames('filter-group__expander', {'filter-group__expander_closed': !expanded});
    return (
      <div className="filter-group">
        { this.props.title ?
          <div className="filter-group__header">
            <span className={expanderClasses}></span>
            <span className="filter-group__title" onClick={this.titleClickHandle}>{ this.props.title }</span>
          </div>
          : null }
        <div className={contentClasses}>
          { fields.length ? <ul className="filter-group__fields">{fields}</ul> : null }
          { children.length ? <ul className="filter-group__children">{children}</ul> : null }
        </div>
      </div>
    );
  }
});

export default Group;