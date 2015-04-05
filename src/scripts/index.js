'use strict';
import React from 'react';
import CommentBox from './components/comment-box/CommentBox';
import YandexMaps from './components/map/YandexMaps';
import FieldSet from './components/filter/FieldSet'

class Events {
  constructor () {
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

var filterSchema  = {
  title: 'Основыне характеристики',
  fields: [
    {
      name: 'serviceType',
      title: 'Услуга',
      input: 'RadioSelect',
      choices: [
        ['1', 'Аренда'],
        ['2', 'Продажа']
      ]
    },
    {
      name: 'objectType',
      input: 'RadioSelect',
      title: 'Тип объекта',
      choices: [
        ['1', 'Квартира'],
        ['2', 'Комната']
      ]
    }
  ],
  children: [
    {
      title: 'Расширенные характеристики',
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


React.render(
  <div className='objects-search clearfix'>
    <div className='objects-search__map'>
      <YandexMaps/>
    </div>
    <div className='objects-search__filter'>
      <FieldSet title={filterSchema.title} fields={filterSchema.fields} childFieldSets={filterSchema.children} />
    </div>
  </div>,
  document.getElementById('app')
);

