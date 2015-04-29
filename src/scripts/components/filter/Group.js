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
      onChange: () => {}
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
  onChange(data) {
    this.props.onChange(data);
  },
  render() {
    var self = this;
    var expanded = this.state.expanded;

    var fields = this.props.fields.map((field, i) => {
      var showField = checkForShow(field, self.props.filterValues);
      var input;

      if (field.input === 'RadioSelect') {
        input = (<RadioSelect
          onChange={self.props.onChange}
          name={field.name}
          choices={field.choices}
          initial={field.initial}/>
        );
      } else if (field.input === 'CheckboxSelect') {
        input = (<CheckboxSelect
          onChange={self.props.onChange}
          name={field.name}
          choices={field.choices}
          initial={field.initial}/>
        );
      } else if (field.input === 'Range') {
        input = (<Range
          onChange={self.props.onChange}
          name={field.name}
          fromLabel={field.fromLabel}
          toLabel={field.toLabel}/>
        );
      } else {
        input = (<Text
          onChange={self.props.onChange}
          name={field.name}
          initial={field.initial}/>
        );
      }

      return (
        <Field show={showField} key={i} name={field.name} title={field.title} expandable={field.expandable}>
          {input}
        </Field>
      );
    });

    var children = this.props.children.map(function (child, i) {
      return (
        <li key={i} className="filter-group__children-item">
          <Group
            filterValues={self.props.filterValues}
            onChange={self.onChange}
            needClose={!self.state.expanded}
            title={child.title}
            fields={child.fields}
            children={child.children}/>
        </li>
      );
    });

    var contentClasses = classnames('filter-group__content', {'filter-group__content_closed': !expanded });
    var expanderClasses = classnames('filter-group__expander', {'filter-group__expander_closed': !expanded });
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