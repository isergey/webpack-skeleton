import moment from 'moment';
import React from 'react';
import {VALUE_TYPES} from '../../schema/characteristics';

export const Detail = React.createClass({
  getDefaultProps() {
    return {
      detailObject: {}
    };
  },
  render() {
    var characteristics = this.props.schema.getCharacteristics();
    var references = this.props.schema.getReferences();
    var units = this.props.schema.getUnits();
    var attrsRows = ((this.props.detailObject.object || {}).charactiristicValues || []).map((charactiristicValue, i) => {
      var characteristicSchema = characteristics.getCharacteristicById(charactiristicValue.id);

      let characteristicValue = '';

      if (Array.isArray(charactiristicValue.values) && charactiristicValue.values.length) {
        characteristicValue = charactiristicValue.values.map((valueItem) => {
          if (characteristicSchema.reference) {
            let referenceItem = references.getItem(characteristicSchema.reference, valueItem.value);
            if (referenceItem) {
              return referenceItem.value;
            }
          }
          if (characteristicSchema.type === VALUE_TYPES.date) {
            return moment(valueItem.value, 'DD.MM.YYYY').locale('ru').format('ll');
          }
          return valueItem.value;
        }).join(', ');
      } else if (Array.isArray(charactiristicValue.ranges) && charactiristicValue.ranges.length) {
        characteristicValue = charactiristicValue.ranges.map((rangeItem) => {
          return `${rangeItem.from} — ${rangeItem.to}`;
        }).join(', ');
      }

      let unitName = '';
      if (characteristicSchema.unitId) {
        let unitItem = units.getItemById(characteristicSchema.unitId);
        if (unitItem !== null) {
          unitName = unitItem.fullName;
        }
      }

      return (
        <tr key={i}>
          <td>{characteristics.getCharacteristicById(charactiristicValue.id).title}</td>
          <td>{characteristicValue} {unitName}</td>
        </tr>
      );
    });
    return (
      <div style={{clear: 'both'}}>
        <hr/>
        <table width='100%'>
          {attrsRows}
        </table>
      </div>
    );
  }
});

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
      settings: {},
      isSelected: false,
      detailObject: {},
      onClick: () => {
      }
    };
  },
  getInitialState() {
    return {
      showDetail: this.props.showDetail
    };
  },
  onClickHandle() {
    this.props.onClick(this.props.data);
    //this.setState({
    //  showDetail: true
    //});
  },
  render() {
    var shortInfo = this.props.data.shortInfo.map((item, i) => {
      return <div key={i}>{item}</div>;
    });

    var rowClasses = ['search-row'];

    if (this.props.isSelected) {
      rowClasses.push('search-row_selected');
    }

    return (
      <div onClick={this.onClickHandle} className={rowClasses.join(' ')}>
        <div>
          <div className="search-row__left">
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
          <div className="search-row__right">
            {
              this.props.data.shortInfo.length > 0 ? <div>{ shortInfo }</div> : null
            }
            <div>Цена: {this.props.data.price} {this.props.data.currensy} / {this.props.data.period}</div>
            <div>Статус: {this.props.data.status} {this.props.data.variant}</div>
          </div>
        </div>
        { this.props.data.code === (this.props.detailObject.object || {}).code ?
          <Detail detailObject={this.props.detailObject} schema={this.props.schema}/> : null}
      </div>
    );
  }
});


export const SearchResult = React.createClass({
  getDefaultProps() {
    return {
      total: 0,
      objects: [],
      settings: {},
      selectedCode: '',
      detailObject: {},
      onSelect: () => {
      }
    };
  },
  rowClickHandle(item) {
    this.props.onSelect(item);
  },
  render() {
    var results = this.props.objects.map((item, i) => {
      return (
        <ResultRow onClick={this.rowClickHandle}
                   schema={this.props.schema}
                   detailObject={this.props.detailObject}
                   isSelected={this.props.selectedCode === item.code}
                   settings={this.props.settings} key={i} data={item}/>
      );
    });

    return (
      <div>
        <div>Объектов найдено: {this.props.total}</div>
        <div>
          {results}
        </div>
      </div>
    );
  }
});

