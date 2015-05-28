import React from 'react';

export default React.createClass({
  getDefaultProps() {
    return {
      message: 'Пожалуйста, подождите...'
    };
  },
  render() {
    return (
      <div>{this.props.message}</div>
    );
  }
});
