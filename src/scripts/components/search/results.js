import moment from 'moment';
import React from 'react';
import settings from '../../settings';
import {api} from '../../api';
import {VALUE_TYPES} from '../../schema/characteristics';

export const Detail = React.createClass({
  getDefaultProps() {
    return {
      detailObject: {},
      onCloseClick: () => {
      }
    };
  },
  getInitialState() {
    return {
      error: '',
      loaded: false,
      detailObject: {}
    };
  },
  componentDidMount() {
    api.detail(this.props.itemData.code).done((detailData) => {
      this.setState({
        loaded: true,
        detailObject: detailData
      });
    }).fail(() => {
      this.setState({
        error: 'При загрузке информации возникла ошибка. Попробуйте позже...'
      });
    });
  },
  handleCloseClick(event) {
    event.stopPropagation();
    this.props.onCloseClick();
  },
  renderDetail() {
    var characteristics = this.props.schema.getCharacteristics();
    var references = this.props.schema.getReferences();
    var units = this.props.schema.getUnits();
    var attrsRows = ((this.state.detailObject.object || {}).charactiristicValues || []).map((characValue, i) => {
      let characteristicSchema = characteristics.getCharacteristicById(characValue.id);
      let characteristicValue = '';

      if (Array.isArray(characValue.values) && characValue.values.length) {
        characteristicValue = characValue.values.map((valueItem) => {
          if (characteristicSchema && characteristicSchema.reference) {
            let referenceItem = references.getItem(characteristicSchema.reference, valueItem.value);
            if (referenceItem) {
              return referenceItem.value;
            }
          }
          if (characteristicSchema && characteristicSchema.type === VALUE_TYPES.date) {
            return moment(valueItem.value, 'DD.MM.YYYY').locale('ru').format('ll');
          }
          return valueItem.value;
        }).join(', ');
      } else if (Array.isArray(characValue.ranges) && characValue.ranges.length) {
        characteristicValue = characValue.ranges.map((rangeItem) => {
          return `${rangeItem.from} — ${rangeItem.to}`;
        }).join(', ');
      }

      let unitName = '';
      if (characteristicSchema && characteristicSchema.unitId) {
        let unitItem = units.getItemById(characteristicSchema.unitId);
        if (unitItem !== null) {
          unitName = unitItem.fullName;
        }
      }

      return (
        <tr key={i}>
          <td>{(characteristics.getCharacteristicById(characValue.id) || {title: characValue.id}).title}</td>
          <td>{characteristicValue} {unitName}</td>
        </tr>
      );
    });
    return (
      <table width='100%'>
        <tbody>
        {attrsRows}
        </tbody>
      </table>
    );
  },
  render() {
    if (this.state.error) {
      return (
        <div>{this.state.error}</div>
      );
    }


    var body = null;
    if (!this.state.loaded) {
      body = (
        <div>Загрузка информации об объекте... <i className="object-detail__loader fa fa-cog fa-spin"></i></div>
      );
    } else {
      body = this.renderDetail();
    }
    return (
      <div className="object-detail">
        <div className="object-detail__top-toolbar">
          <span className="object-detail__close_btn" onClick={this.handleCloseClick}>X</span>
        </div>
        <hr/>
        {body}
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
      selectedCode: '',
      showDetail: false,
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
  componentWillReceiveProps(props) {
    if (this.state.showDetail && !props.showDetail) {
      this.setState({
        showDetail: false
      });
    }
  },
  onClickHandle() {
    if (this.state.showDetail !== true) {
      this.setState({
        showDetail: true
      });
    }

    if (this.props.selectedCode === this.props.data.code) {
      return;
    }
    this.props.onClick(this.props.data);

  },
  handleDetailCloseClick() {
    this.setState({
      showDetail: false
    });
  },
  renderDetail() {
    if (this.props.selectedCode === this.props.data.code && this.state.showDetail) {
      return <Detail onCloseClick={this.handleDetailCloseClick}
                     itemData={this.props.data}
                      schema={this.props.schema}/>;
    }
    return null;
  },
  render() {
    var shortInfo = this.props.data.shortInfo.map((item, i) => {
      return <div key={i}>{item}</div>;
    });

    var rowClasses = ['search-row'];

    if (this.props.selectedCode === this.props.data.code) {
      rowClasses.push('search-row_selected');
    }

    return (
      <div onClick={this.onClickHandle} className={rowClasses.join(' ')}>
        <div>
          <div className="search-row__left">
            {
              this.props.data.pathPhoto ?
                <div><img width="100%" src={settings.staticHost + this.props.data.pathPhoto}/></div>
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
      </div>
    );
  }
});


export const SearchResult = React.createClass({
  getDefaultProps() {
    return {
      total: 0,
      objects: [],
      onRowSelect: () => {
      }
    };
  },
  setSelectedCode(selectedCode) {
    this.setState({
      selectedCode: selectedCode
    });
  },
  getInitialState() {
    return {
      selectedCode: ''
    };
  },
  rowClickHandle(item) {
    this.props.onRowSelect(item);
    this.setState({
      selectedCode: item.code
    });
  },
  render() {
    var results = this.props.objects.map((item, i) => {
      return (
        <ResultRow onClick={this.rowClickHandle}
                   schema={this.props.schema}
                   selectedCode={this.state.selectedCode}
                   showDetail={this.state.selectedCode === item.code}
                   key={i} data={item}/>
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

