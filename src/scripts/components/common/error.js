import React from 'react';

export default React.createClass({
  getDefaultProps() {
    return {
      message: 'Неизвестная ошибка'
    };
  },
  render() {
    return (
      <div>{this.props.message}</div>
    );
  }
});
