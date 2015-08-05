import React from 'react';

export default React.createClass({
  mixins: [React.addons.PureRenderMixin],
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
      <div className="range-input">
        <span className="range-input__from-label">{this.props.fromLabel}</span>
        <input className="range-input__from-input" ref='from' type="text" onChange={this.changeHandle}/>
        <span className="range-input__to-label">{this.props.toLabel}</span>
        <input className="range-input__to-input" ref='to' type="text" onChange={this.changeHandle}/> <span></span>
      </div>
    );
  }
});
