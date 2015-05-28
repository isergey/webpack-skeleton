import React from 'react';

export default React.createClass({
  componentDidMount() {
    var selfNode = React.findDOMNode(this);
    const self = this;
    this.map = null;

    window.DG.then(function () {
      self.map = window.DG.map(selfNode, {
        center: [59.936081, 30.317960],
        zoom: 13
      });


    });
  },
  handleClick() {
    console.log('map clicked');
    window.DG.marker([59.936081, 30.317960]).addTo(this.map).bindPopup('Вы кликнули по мне!');
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
});

