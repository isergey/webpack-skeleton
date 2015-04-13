'use strict';
import React from 'react/addons';
import classnames from 'classnames';

import Field from './Field.js';
import RadioSelect from './inputs/RadioSelect';


var Group = React.createClass({
  getDefaultProps: function () {
    return {
      title: '',
      fields: [],
      children: [],
      needClose: false,
      expanded: false
    };
  },
  getInitialState: function () {
    return {
      expanded: this.props.expanded
    };
  },
  componentWillReceiveProps: function (args) {
    /*if (args.needClose) {
      this.setState({
        expanded: false
      });
    }*/
  },
  titleClickHandle: function () {
    this.setState({
      expanded: !this.state.expanded
    });
  },
  render: function () {
    var self = this;
    var expanded = this.state.expanded;

    var fields = this.props.fields.map((field, i) => {
      return (
        <Field key={i} name={field.name} title={field.title} expandable={field.expandable}>
          <RadioSelect name={field.name} choices={field.choices} />
        </Field>
      );
    });

    var children = this.props.children.map(function (child, i) {
      return (
        <li key={i} className="filter-group__children-item">
          <Group needClose={!self.state.expanded} title={child.title} fields={child.fields} children={child.children}/>
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