import React from 'react';

export default React.createClass({
  getDefaultProps() {
    return {
      label: '',
      disabled: false,
      checked: false,
      name: '',
      value: '',
      onChange: () => {
      }
    };
  },
  getInitialState() {
    return {
      disabled: this.props.disabled,
      checked: this.props.checked
    };
  },
  handleChange(event) {
    this.props.onChange({
      value: event.target.value,
      checked: event.target.checked
    });
  },
  render() {
    var input =
      <input
        className='filter-checkbox-input'
        type='checkbox'
        name={this.props.name}
        value={this.props.value}
        disabled={this.state.disabled}
        defaultChecked={this.state.checked}
        onChange={this.handleChange}
        />;

    if (!this.props.label) {
      return input;
    }
    return (
      <label className='filter-radio-label'>{input} { this.props.label }</label>
    );
  }
});
