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
    this.props.onChange(event.target.value);
  },
  render() {
    var input =
      <input
        className='filter-radio-input'
        type='radio'
        name={this.props.name}
        value={this.props.value}
        disabled={this.state.disabled}
        defaultChecked={this.state.checked}
        onChange={this.handleChange}
        />;

    if (!this.props.label) {
      return (
        input
      );
    }
    return (
      <label className='filter-radio-label'>{input} { this.props.label }</label>
    );
  }
});
