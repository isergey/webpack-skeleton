'use strict';
import React from 'react';


import YandexMaps from './components/map/YandexMaps';
//import FieldSet from './components/filter/FieldSet'
import Group from './components/filter/Group.js';

class Events {
  constructor() {
    this.events = {};
  }

  on(eventId, callback) {
    this.events[eventId] = callback;
  }

  trigger(eventId, data) {
    var callback = this.events[eventId];
    if (callback instanceof Function) {
      callback(data);
    } else if (callback === undefined) {
      console.warn(`Callback for event ${eventId} not registered`);
    }
  }
}

var events = new Events();

events.on('click', function (data) {
  console.log('click event', data);
});

events.trigger('click', {a: 1});
events.trigger('click1', {a: 1});

var filterSchema = {
  //title: 'Основыне характеристики',
  fields: [
    {
      name: 'serviceType',
      title: 'Услуга',
      expandable: false,
      input: 'RadioSelect',
      choices: [
        ['1', 'Аренда'],
        ['2', 'Продажа']
      ],
      initial: '1'
    },
    {
      name: 'objectType',
      input: 'RadioSelect',
      title: 'Тип объекта',
      expandable: false,
      choices: [
        ['1', 'Квартира'],
        ['2', 'Комната']
      ]
    },
    {
      name: 'period',
      input: 'RadioSelect',
      title: 'Период',
      expandable: false,
      choices: [
        ['1', 'Длительно'],
        ['2', 'Посуточно']
      ],
      showOn: {
        'serviceType': ['1']
      }
    }
  ],
  children: [
    {
      title: 'Расширенные характеристики',
      expanded: false,
      fields: [
        {
          name: 'animals',
          title: 'С животными',
          input: 'RadioSelect',
          choices: [
            ['1', 'Можно'],
            ['2', 'Нельзя']
          ]
        },
        {
          name: 'toulet',
          input: 'RadioSelect',
          title: 'Туалет',
          choices: [
            ['1', 'Раздельный'],
            ['2', 'Совмещенный']
          ]
        }
      ],
      children: [
        {
          title: 'Доп характеристики',
          expanded: false,
          fields: [
            {
              name: 'buildType',
              title: 'Тип здания',
              input: 'RadioSelect',
              choices: [
                ['1', 'Кирпичный'],
                ['2', 'Монолитный']
              ]
            },
            {
              name: 'newType',
              input: 'RadioSelect',
              title: 'Новойстройка',
              choices: [
                ['1', 'Не имеет значения'],
                ['2', 'Да'],
                ['3', 'Нет']
              ]
            }
          ]
        }
      ]
    }
  ]
};

var App = React.createClass({
  getInitialFilterValues() {
    var values = {};
    filterSchema.fields.forEach((field) => {
      if (field.initial !== undefined) {
        values[field.name] = field.initial;
      }
    });
    return values;
  },
  getInitialState() {
    return {
      filterValues: this.getInitialFilterValues()
    };
  },
  onFilterChange(data) {
    var filterValues = this.state.filterValues;
    filterValues[data.name] = data.value;
    this.setState({
      filterValues: filterValues
    });
    //console.log('onFilterChange1', data);
    //console.log('filterValues', filterValues);
  },
  render() {
    return (
      <div className='objects-search clearfix'>
        <div className='objects-search__map'>
          <YandexMaps/>
        </div>
        <div className='objects-search__filter'>
          <Group
            onChange={this.onFilterChange}
            filterValues={this.state.filterValues}
            expanded={true}
            expandable={filterSchema.expandable}
            title={filterSchema.title}
            fields={filterSchema.fields}
            children={filterSchema.children}/>
        </div>
      </div>
    );
  }
});

React.render(
  <App />,
  document.getElementById('app')
);
