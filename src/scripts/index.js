import React from 'react';
import AppActions from './actions/AppActions';
import AppStore from './stores/AppStore';
import SearchActions from './actions/SearchActions';

import Filter from './components/filter/Filter';
import Map from './components/map/YandexMaps';

//import {SearchResult, Detail} from './components/search/results';

import SearchResults from './components/search/SearchResults';

var searchCount = 1;

const App = React.createClass({
  onFilterSubmit(criteria) {
    console.log('on Submit', criteria);
  },
  getInitialState() {
    //return {
    //  loaded: false,
    //  resultResponse: null,
    //  selectedCode: '',
    //  schema: null,
    //  filter: null,
    //  filterSchema: null,
    //  filterValues: null,
    //  detailView: null
    //};
    return AppStore.getState();
  },
  componentDidMount() {
    //var self = this;
    this.canSeach = true;
    this.resultId = 0;
    AppStore.listen(this.handleAppStoreUpdate);
    AppActions.fetchSchema();
    //api.loadSchema().then((data) => {
    //  var schema = Schema.fromJson(data);
    //  var filter = schema.getFilter();
    //  var filterSchema = filter.buildFilterSchema();
    //  self.setState({
    //    loaded: true,
    //    schema: schema,
    //    filter: filter,
    //    filterSchema: filterSchema,
    //    filterValues: this.getInitialFilterValues(filterSchema)
    //  });
    //}).catch((error) => {
    //  console.error('Error while schema loading', error);
    //  self.setState({
    //    error: 'Ошибка блеать!'
    //  });
    //});
  },
  componentWillUnmount() {
    AppStore.unlisten(this.handleAppStoreUpdate);
  },
  handleAppStoreUpdate(state) {
    //console.log('state', state);
    this.setState(state);
  },
  //getInitialFilterValues(filterSchema) {
  //  var values = {};
  //  filterSchema.fields.forEach((field) => {
  //    if (field.initial !== undefined) {
  //      values[field.name] = field.initial;
  //    }
  //  });
  //  return values;
  //},
  filterChangeHandle(filterValues) {
    var criteria = this.state.schema.buildSearchCriteria(filterValues);
    SearchActions.fetchResults(criteria);
  },
  onBaloonClick(code) {
    this.refs.map.hintBaloon(code);
    this.refs.resultSet.setSelectedCode(code);
  },
  handleDetailCloseClick() {
    this.setState({
      detailView: null
    });
  },
  rowSelectHandle(params) {
    this.refs.map.hintBaloon(params.code);
    var detailView = (
      <Detail
        onCloseClick={this.handleDetailCloseClick}
        itemData={this.props.data}
        schema={this.props.schema}/>
    );
    this.setState({
      detailView: detailView
    });
  },
  renderMap() {
    return (
      <Map ref='map' onBaloonClick={this.onBaloonClick} objects={(this.state.resultResponse || {}).objects || []}/>
    );
  },
  renderFilter() {
    //console.log('schemaLoaded', this.state.schemaLoaded);
    let renderBody = null;

    if (this.state.schemaErrorMessage) {
      renderBody = (
        <div>Ошибка при загрузке схемы фильтра</div>
      );
    } else if (!this.state.schemaLoaded) {
      renderBody = (
        <div>Загрузка фильтра объектов...</div>
      );
    } else {
      renderBody = (
        <Filter
          schema={this.state.schema}
          filter={this.state.filter}
          filterSchema={this.state.filterSchema}
          filterValues={this.state.filterValues}
          onSubmit={this.filterChangeHandle}/>
      );
    }
    return (
      <div className='objects-search__filter'>
        {renderBody}
      </div>
    );
  },
  renderResults() {
    return (
      <div className="objects-search__results">
        <SearchResults
          key={searchCount++}
          ref='resultSet'
          onRowSelect={this.rowSelectHandle}
          //total={this.state.resultResponse.total}
          //objects={this.state.resultResponse.objects}
          schema={this.state.schema}/>
      </div>
    );
  },
  renderDetail() {
    if (this.state.detailView !== null) {
      return this.state.detailView;
    }
  },
  render() {
    return (
      <div className='index-layout'>
        <div className='index-layout__side'>{this.renderResults()}</div>
        <div className='index-layout__map'>{this.renderMap()}</div>
        <div className='index-layout__filter'>{this.renderFilter()}</div>
        {this.renderDetail}
      </div>
    );
  }
});


React.render(
  <App />,
  document.getElementById('app')
);

