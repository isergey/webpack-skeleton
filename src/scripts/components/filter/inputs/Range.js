import React from 'react';

export default React.createClass({
  getDefaultProps() {
    return {
      name: '',
      initial: ['', ''],
      fromLabel: 'от',
      toLabel: 'до',
      onChange: () => {
      }
    };
  },
  changeHandle() {
    this.props.onChange(this.getValue());
  },
  getValue() {
    return [
      React.findDOMNode(this.refs.from).value,
      React.findDOMNode(this.refs.to).value
    ];
  },
  render() {
    return (
      <div>
        <span>{this.props.fromLabel}</span>
        <input ref='from' type="text" onChange={this.changeHandle}/>
        <span>{this.props.toLabel}</span>
        <input ref='to' type="text" onChange={this.changeHandle}/> <span></span>
      </div>
    );
  }
});
