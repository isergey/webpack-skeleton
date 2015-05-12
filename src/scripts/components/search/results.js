'use strict';
import React from 'react';

export default React.createClass({
  getDefaultProps() {
    return {
      data: {
        total: 0,
        objects: []
      }
    };
  },
  _getShortInfoComponent(shortInfo) {
    return (<div> {shortInfo.map((line, i) => {
      return (
        <div key={i}> {line} </div>
      );
    })} </div>);
  },
  render() {
    var objects = this.props.data.objects.map((object, i) => {
      return (
        <div key={i}>
          <div className="object_code">№ объекта: {object.code}</div>
          {object.shortInfo.length > 0 ? this._getShortInfoComponent(object.shortInfo) : null }
          <div>{object.price} {object.currensy}/{object.period}</div>
          {object.pathPhoto ? <div><img src={object.pathPhoto}/></div> : null}
          <div>{object.fotoCount} фото <br/> {object.videoCount} видео</div>
          <div>{object.status}</div>
          <hr/>
        </div>
      );
    });

    return (
      <div>
        <div>Найдено: {this.props.data.total}</div>
        <div>{objects}</div>
      </div>
    );
  }
});