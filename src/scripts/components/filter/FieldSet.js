'use strict';
import React from 'react';
import classnames from 'classnames';

import Field from './Field.js';
import RadioSelect from './inputs/RadioSelect';


var FieldSet = React.createClass({
  getDefaultProps() {
    return {
      expandable: true,
      expanded: true,
      title: '',
      fields: [],
      childFieldSets: []
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
    var expanderClasses = classnames('filter-fieldset__fields', {'filter-fieldset__fields_closed': !this.state.expanded});
    var childFieldSetClasses = classnames('filter-fieldset__child', {'filter-fieldset__child-closed': !this.state.expanded});

    var headerComponent = this.props.title ?
      <div className='filter-fieldset__header' onClick={this.expanderClickHandle}>
        <span className='filter-fieldset__title'> { this.props.title} </span>
      </div>
      : null;

    var fieldComponents = this.props.fields.map((field, key) => {
      if (field.input === 'RadioSelect') {
        return (
          <Field key={key} title={field.title}>
            <RadioSelect name={field.name} initial={field.initial} choices={field.choices}/>
          </Field>
        );
      }
      console.warn(`Input type ${field.input} not found`);
      return null;
    });

    var childFieldSetComponents = this.props.childFieldSets.map((fieldSet, key)=> {
      return (
        <FieldSet key={key} title={fieldSet.title} fields={fieldSet.fields} childFieldSets={fieldSet.children} />
      );
    });

    return (
      <div className="filter-fieldset">
        { headerComponent }
        <div className={expanderClasses}>
          {fieldComponents}
        </div>
        {childFieldSetComponents.length ?
          <div className={childFieldSetClasses}>
            {childFieldSetComponents}
          </div>
          : null
        }
      </div>
    );
  }
});

export default FieldSet;