import React from 'react';
import Radio from './Radio';

export default React.createClass({
  getDefaultProps() {
    return {
      name: '',
      initial: null,
      choices: [],
      onChange: () => {}
    };
  },
  onChange(value) {
    this.props.onChange(value);
  },
  render() {
    var self = this;

    var itemsComponents = this.props.choices.map((choice, key) => {
      var choiceValue = choice[0], choiceLabel = choice[1];
      return (
        <div key={key}>
          <Radio
            onChange={this.onChange}
            name={this.props.name}
            label={choiceLabel}
            value={choiceValue}
            checked={ self.props.initial === choiceValue }
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
