'use strict';
import React from 'react';
import {getDefault} from './utils';
import {initSchema} from './schema/schema';
import YandexMaps from './components/map/YandexMaps';
//import FieldSet from './components/filter/FieldSet'
import Group from './components/filter/Group';
import Results from './components/search/results';
import {search} from './api';

/*class Events {
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
events.trigger('click1', {a: 1});*/

/*
var filterSchema1 = {
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
          input: 'CheckboxSelect',
          title: 'Туалет',
          choices: [
            ['1', 'Раздельный'],
            ['2', 'Совмещенный']
          ],
          initial: ['1', '2']
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
};*/


initSchema().then((schema) => {
  console.log(schema);
  //console.log('schema getCharacteristics', schema.getCharacteristics());
  //console.log('schema getCharacteristics', schema.getGroups());
  //console.log('schema getFilter', schema.getFilter().buildFilterSchema());
  var filterSchema = schema.getFilter().buildFilterSchema();
  console.log('filterSchema', filterSchema);
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
        filterValues: this.getInitialFilterValues(),
        search: {},
        searchId: 0
      };
    },
    filterChangeHandle(data) {
      var filterValues = this.state.filterValues;
      filterValues[data.name] = data.value;

      var newValues = {};
      for (let key in filterValues) {
        let value = filterValues[key];
        if (getDefault(value, null) !== null) {
          newValues[key] = value;
        }
      }

      this.setState({
        loading: true,
        filterValues: newValues
      });

      setTimeout(() => {
        var result = search();
        result.done((data) => {
          console.log('result done', data);
          this.setState({
            loading: false,
            searchId: this.state.searchId + 1,
            results: data
          });
        });
      }, 1000);

      //console.log('onFilterChange1', data);
      console.log('filterValues', newValues);
    },
    render() {

      return (
        <div className='objects-search clearfix'>
          <div className='objects-search__map'>
            <YandexMaps/>
            { !this.state.loading ?
              <Results searchId={this.state.searchId} key={this.state.searchId} data={this.state.results}/> :
              <div>Поиск объектов...</div>
            }
          </div>
          <div className='objects-search__filter'>
            <Group
              onChange={this.filterChangeHandle}
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

}).catch((error) => {
  console.log('schema not loaded', error);
  console.error(error.stack);
});

