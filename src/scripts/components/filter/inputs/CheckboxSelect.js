'use strict';
import React from 'react';
import Checkbox from './Checkbox';

export default React.createClass({
  getDefaultProps() {
    return {
      name: '1',
      initial: [],
      choices: [],
      onChange: () => {
      }
    };
  },
  componentDidMount() {
    var self = this;
    this._values = {};

    if (Array.isArray(this.props.initial)) {
      this.props.initial.forEach((value) => {
        self._values[value] = true;
      });
    } else {
      self._values[this.props.initial] = true;
    }

  },
  onChange(data) {
    this._values[data.value] = data.checked;
    var selectValue = [];
    for (let key in this._values) {
      if (this._values[key]) {
        selectValue.push(key);
      }
    }
    this.props.onChange({
      name: data.name,
      value: selectValue
    });
  },
  render() {
    var _this = this;
    var itemsComponents = this.props.choices.map((choice, key) => {
      var choiceValue = choice[0], choiceLabel = choice[1];
      var checked = false;

      if (Array.isArray(_this.props.initial)) {
        if (_this.props.initial.indexOf(choiceValue) > -1) {
          checked = true;
        }
      } else if (choiceValue === _this.props.initial) {
        checked = true;
      }

      return (
        <div key={key}>
          <Checkbox
            ref={key}
            onChange={this.onChange}
            name={this.props.name}
            label={choiceLabel}
            value={choiceValue}
            checked={checked}
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