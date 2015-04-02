'use strict';
import React from 'react';
import marked from 'marked';


export default React.createClass({
  componentDidMount() {
    var selfNode = React.findDOMNode(this);
    this.map = null;
    window.ymaps.ready(()=>{
      this.map = new window.ymaps.Map(selfNode, {
        center: [55.76, 37.64],
        zoom: 7
      });
    });
  },
  handleClick() {
    console.log('map clicked');
    this.map.geoObjects.add(
      new window.ymaps.Placemark([56.76, 37.64], { content: 'Москва!', balloonContent: 'Столица России' })
    );
  },
  render() {
    return (
      <div className="yandex-maps" onClick={this.handleClick}>
        Yandex map
      </div>
    );
  }
})