'use strict';
import React from 'react';
import marked from 'marked';


export default React.createClass({
  componentDidMount() {
    var selfNode = React.findDOMNode(this);
    const _this = this;
    this.map = null;

    DG.then(function () {
      _this.map = DG.map(selfNode, {
        center: [59.936081,30.317960],
        zoom: 13
      });


    });
  },
  handleClick() {
    console.log('map clicked');
    DG.marker([59.936081,30.317960]).addTo(this.map).bindPopup('Вы кликнули по мне!');
    //this.map.geoObjects.add(
    //  new window.ymaps.Placemark([56.76, 37.64], { content: 'Москва!', balloonContent: 'Столица России' })
    //);
  },
  render() {
    return (
      <div className="yandex-maps" onClick={this.handleClick}>
        Yandex map
      </div>
    );
  }
})