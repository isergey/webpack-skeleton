import React from 'react';
import Checkbox from './Checkbox';

export default React.createClass({
  getDefaultProps() {
    return {
      name: '',
      initial: [],
      choices: [],
      onChange: () => {
      }
    };
  },
  componentDidMount() {
    var self = this;
    this.values = {};

    if (Array.isArray(this.props.initial)) {
      this.props.initial.forEach((value) => {

        self.values[value] = true;
      });
    } else {
      if (this.props.initial) {
        self.values[this.props.initial] = true;
      }
    }

  },
  onChange(data) {
    console.log(this.values);
    this.values[data.value] = data.checked;
    var selectValue = [];
    for (let key in this.values) {
      if (this.values[key]) {
        selectValue.push(key);
      }
    }
    this.props.onChange(selectValue);
  },
  render() {
    var self = this;
    var itemsComponents = this.props.choices.map((choice, key) => {
      var choiceValue = choice[0], choiceLabel = choice[1];
      var checked = false;

      if (Array.isArray(self.props.initial)) {
        if (self.props.initial.indexOf(choiceValue) > -1) {
          checked = true;
        }
      } else if (choiceValue === self.props.initial) {
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
