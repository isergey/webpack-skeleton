'use strict';
import React from 'react';
import Radio from './Radio';

export default React.createClass({
  getDefaultProps() {
    return {
      name: '1',
      initial: null,
      choices: [],
      onChange: () => {}
    };
  },
  onChange(data) {
    this.props.onChange(data);
  },
  render() {
    var _this = this;

    var itemsComponents = this.props.choices.map((choice, key) => {
      var choiceValue = choice[0], choiceLabel = choice[1];
      return (
        <div key={key}>
          <Radio
            onChange={this.onChange}
            name={this.props.name}
            label={choiceLabel}
            value={choiceValue}
            checked={ _this.props.initial === choiceValue }
            />
        </div>);
    });
    return (
      <div className="filter-radio-select">
        { itemsComponents }
      </div>
    );
  }
});