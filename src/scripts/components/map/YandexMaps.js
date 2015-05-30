/* eslint new-cap:1 */
import React from 'react';

var settings = {
  staticHost: 'ftp://95.55.146.178'
};


var ResultRow = React.createClass({
  getDefaultProps() {
    return {
      data: {
        additionalInfo: '',
        city: '',
        code: '',
        currensy: '',
        fotoCount: '0',
        latitude: '',
        longitude: '',
        pathPhoto: '',
        pathQRCode: '',
        period: '',
        prelimiary: true,
        price: '',
        serviceTitle: '',
        shortInfo: [],
        status: '',
        variant: '',
        videoCount: '0'
      },
      settings: {}
    };
  },
  render() {
    var shortInfo = this.props.data.shortInfo.map((item, i) => {
      return <div key={i}>{item}</div>;
    });
    return (
      <div className="search-row1">
        <div className="search-row__left1">
          {
            this.props.data.pathPhoto ?
              <div><img width="100%" src={this.props.settings.staticHost + this.props.data.pathPhoto}/></div>
              : null
          }
          <div>
            { this.props.data.fotoCount !== '0' ? this.props.data.fotoCount + ' фото' : 'Без фото' }
          </div>
          <div>
            { this.props.data.videoCount !== '0' ? this.props.data.videoCount + ' видео' : 'Без видео' }
          </div>
        </div>
        <div className="search-row__right1">
          {
            this.props.data.shortInfo.length > 0 ? <div>{ shortInfo }</div> : null
          }
          <div>Цена: {this.props.data.price} {this.props.data.currensy} / {this.props.data.period}</div>
          <div>Статус: {this.props.data.status} {this.props.data.variant}</div>
        </div>
      </div>
    );
  }
});


export default React.createClass({
  componentDidMount() {
    var selfNode = React.findDOMNode(this);
    this.map = null;
    this.markers = null;
    window.DG.then(() => {
      this.map = window.DG.map(selfNode, {
        center: [59.936081, 30.317960],
        zoom: 13
      });
      this.markers = window.DG.featureGroup();
    });

    console.log('objects', this.props.objects);
  },
  getDefaultProps() {
    return {
      objects: [],
      onBaloonClick: () => {}
    };
  },
  drowBaloons(objects) {
    //markers = DG.featureGroup(),
    this.markers.removeFrom(this.map);
    this.markers = window.DG.featureGroup();
    var objectsCoordinates = [];
    objects.forEach((item) => {
      objectsCoordinates.push([item.longitude, item.latitude]);
      //let shortInfo = item.shortInfo.map((shortInfoItem) => { return shortInfoItem.value; }).join(', ');

      window.DG.marker([item.longitude, item.latitude]).addTo(this.markers).bindPopup(React.renderToStaticMarkup(<ResultRow settings={settings} data={item} />)).on('click', () => {
        this.props.onBaloonClick(item.code);
      }).on('popupclose', () => {
        this.props.onBaloonClick('');
      });
    });
    if (objectsCoordinates.length) {
      this.markers.addTo(this.map);
      this.map.fitBounds(this.markers);
    }
  },
  handleClick() {
    console.log('map clicked');

    //this.map.geoObjects.add(
    //  new window.ymaps.Placemark([56.76, 37.64], { content: 'Москва!', balloonContent: 'Столица России' })
    //);
  },
  render() {
    return (
      <div className="yandex-maps" onClick={this.handleClick}>
        Map
      </div>
    );
  }
});

