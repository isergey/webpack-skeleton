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



React.render(
  <div className='objects-search clearfix'>
    <div className='objects-search__map'>
      <YandexMaps/>
    </div>
    <div className='objects-search__filter'>
      <FieldSet title='Основные' fields={[1, 2]} childFieldSets={[
        {
          title: 'Расширенные характеристики',
          fields: [1, 2, 3]
        }
      ]} />
    </div>

  </div>,
  document.getElementById('app')
);

