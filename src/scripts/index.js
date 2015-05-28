import React from 'react';
import {getDefault} from './utils';
import Schema from './schema/schema';
//import Loader from './components/common/loader';
//import Error from './components/common/error';
import YandexMaps from './components/map/YandexMaps';
//import FieldSet from './components/filter/FieldSet'
import Group from './components/filter/Group';
//import Results from './components/search/results';
import Api from './api';


var api = new Api({
  addr: 'http://127.0.0.1:8080'
});


var Filter = React.createClass({
  componentDidMount() {
    this.canSeach = true;
    this.lastSearchCriteria = '';
    api.schema().done((data) => {
      var schema = Schema.fromJson(data);
      var filter = schema.getFilter();
      var filterSchema = filter.buildFilterSchema();
      this.setState({
        loaded: true,
        schema: schema,
        filter: filter,
        filterSchema: filterSchema,
        filterValues: this.getInitialFilterValues(filterSchema)
      });
    }).fail((error) => {
      console.error('Error while schema loading', error);
      this.setState({
        error: 'Ошибка блеать!'
      });
    });
  },
  getInitialState() {
    return {
      loaded: false,
      error: '',
      schema: null,
      filter: null,
      filterSchema: null,
      filterValues: null
    };
  },
  getInitialFilterValues(filterSchema) {
    var values = {};
    filterSchema.fields.forEach((field) => {
      if (field.initial !== undefined) {
        values[field.name] = field.initial;
      }
    });
    return values;
  },
  filterChangeHandle(data) {
    var filterValues = this.state.filterValues;

    if (getDefault(data.value, null) === null) {
      delete filterValues[data.name];
    } else {
      filterValues[data.name] = data.value;
      var newValues = {};
      for (let key in filterValues) {
        let value = filterValues[key];
        if (getDefault(value, null) !== null) {
          newValues[key] = value;
        }
      }
    }
    var criteria = this.state.schema.buildSearchCriteria(filterValues);
    console.log('criteria', criteria);
    var jsonFilterValues = JSON.stringify(filterValues);

    if (this.lastSearchCriteria === jsonFilterValues) {
      console.log('already search');
      return;
    }
    this.lastSearchCriteria = jsonFilterValues;
    if (this.canSeach) {

      this.canSeach = false;
      setTimeout(() => {
        this.canSeach = true;
      }, 3000);
      api.search(criteria).done((resultResponse) => {
        console.log('founded', resultResponse);
      }).fail((error) => {
        console.error('error while search', error);
      });
    } else {
      console.log('Too mach request per secord');
    }
  },
  render() {
    if (!this.state.loaded) {
      return (
        <div>Инициализация фильра</div>
      );
    }
    return (
      <Group
        onChange={this.filterChangeHandle}
        filterValues={this.state.filterValues}
        expanded={true}
        expandable={this.state.filterSchema.expandable}
        title={this.state.filterSchema.title}
        fields={this.state.filterSchema.fields}
        children={this.state.filterSchema.children}/>
    );
  }
});


var App = React.createClass({
  render() {
    return (
      <div className='objects-search clearfix'>
        <div className='objects-search__map'>
          <YandexMaps />
        </div>
        <div className='objects-search__filter'>
          <Filter />
        </div>
      </div>
    );
  }
});


React.render(
  <App />,
  document.getElementById('app')
);


/*initSchema().then((schema) => {
 console.log(schema);
 //console.log('schema getCharacteristics', schema.getCharacteristics());
 //console.log('schema getCharacteristics', schema.getGroups());
 //console.log('schema getFilter', schema.getFilter().buildFilterSchema());
 var filterSchema = schema.getFilter().buildFilterSchema();
 console.log('filterSchema', filterSchema);
 var App = React.createClass({
 getInitialFilterValues() {
 var values = {};
 filterSchema.fields.forEach((field) => {
 if (field.initial !== undefined) {
 values[field.name] = field.initial;
 }
 });
 return values;
 },
 getInitialState() {
 return {
 filterValues: this.getInitialFilterValues(),
 search: {},
 searchId: 0
 };
 },
 filterChangeHandle(data) {
 var filterValues = this.state.filterValues;
 filterValues[data.name] = data.value;

 var newValues = {};
 for (let key in filterValues) {
 let value = filterValues[key];
 if (getDefault(value, null) !== null) {
 newValues[key] = value;
 }
 }

 this.setState({
 loading: true,
 filterValues: newValues
 });

 setTimeout(() => {
 var result = search();
 result.done((data) => {
 console.log('result done', data);
 this.setState({
 loading: false,
 searchId: this.state.searchId + 1,
 results: data
 });
 });
 }, 1000);

 //console.log('onFilterChange1', data);
 console.log('filterValues', newValues);
 },
 render() {

 return (
 <div className='objects-search clearfix'>
 <div className='objects-search__map'>
 <YandexMaps/>
 { !this.state.loading ?
 <Results searchId={this.state.searchId} key={this.state.searchId} data={this.state.results}/> :
 <div>Поиск объектов...</div>
 }
 </div>
 <div className='objects-search__filter'>
 <Group
 onChange={this.filterChangeHandle}
 filterValues={this.state.filterValues}
 expanded={true}
 expandable={filterSchema.expandable}
 title={filterSchema.title}
 fields={filterSchema.fields}
 children={filterSchema.children}/>
 </div>
 </div>
 );
 }
 });

 React.render(
 <App />,
 document.getElementById('app')
 );

 }).catch((error) => {
 console.log('schema not loaded', error);
 console.error(error.stack);
 });*/

