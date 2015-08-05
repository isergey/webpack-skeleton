import React from 'react';
import settings from '../../settings';


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

export default ResultRow;
