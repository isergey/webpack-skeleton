import React from 'react';
import Group from './Group';
import {getDefault} from '../../utils';

const Filter = React.createClass({
  getDefaultProps() {
    return {
      onSubmit: () => {
      }
    };
  },
  getInitialState() {
    return {
      error: '',
      schema: null,
      filter: null,
      filterSchema: null,
      filterValues: this.props.filterValues
    };
  },
  componentDidMount() {
    this.canSeach = true;
    this.lastSearchCriteria = '';
  },
  filterChangeHandle(data) {
    var filterValues = this.state.filterValues;

    if (getDefault(data.value, null) === null) {
      delete filterValues[data.name];
    } else {
      filterValues[data.name] = data.value;
      var newValues = {};
      for (let key in filterValues) {
        let value = filterValues[key];
        if (getDefault(value, null) !== null) {
          newValues[key] = value;
        }
      }
    }
    this.setState({
      filterValues: filterValues
    });
    this.props.onSubmit(filterValues);
  },
  render() {
    return (
      <Group
        onChange={this.filterChangeHandle}
        filterValues={this.state.filterValues}
        expanded={true}
        expandable={this.props.filterSchema.expandable}
        title={this.props.filterSchema.title}
        fields={this.props.filterSchema.fields}
        children={this.props.filterSchema.children}/>
    );
  }
});

export default Filter;
