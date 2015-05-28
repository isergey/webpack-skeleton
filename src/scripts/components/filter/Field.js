import React from 'react';
import classnames from 'classnames';

import Text from './inputs/Text';



export default React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    title: React.PropTypes.string,
    expandable: React.PropTypes.bool,
    expanded: React.PropTypes.bool,
    show: React.PropTypes.bool
  },
  getDefaultProps() {
    return {
      expandable: true,
      expanded: false,
      title: '',
      show: true,
      input: Text,
      inputProps: {}
    };
  },
  getInitialState() {
    return {
      expanded: this.props.expanded | !this.props.expandable
    };
  },
  expanderClickHandle() {
    if (this.props.expandable) {
      this.setState({expanded: !this.state.expanded});
    }
  },
  changeHandle(value) {
    this.props.onChange({
      name: this.props.name,
      value: value
    });
  },
  render() {
    var filterFieldClasses = classnames('filter-field', {'filter-field_hidden': !this.props.show});
    var expanderClasses = classnames('filter-field__expander', {'filter-field__expander_closed': !this.state.expanded });
    var filterInputClasses = classnames( 'filter-field__input', {'filter-field__input_closed': !this.state.expanded });

    var expander = this.props.expandable ?
      <span className={expanderClasses} onClick={this.expanderClickHandle}></span>
      : null;

    var input = React.createFactory(this.props.input);
    var inputProps = this.props.inputProps;
    inputProps.onChange = this.changeHandle;
    inputProps.initial = this.props.initial;
    return (
      <div className={filterFieldClasses}>
        <div className="filter-field__header">
          { expander }
          <span onClick={this.expanderClickHandle} className="filter-field__title">{ this.props.title }</span>
        </div>
        <div className={filterInputClasses}>
          {input(this.props.inputProps)}
        </div>
      </div>
    );
  }
});
