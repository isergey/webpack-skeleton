import React from 'react';
import {api} from './api';
import {getDefault} from './utils';
import Schema from './schema/schema';
import Map from './components/map/YandexMaps';
import Group from './components/filter/Group';
import {SearchResult} from './components/search/results';


var Filter = React.createClass({
  getDefaultProps() {
    return {
      onSubmit: () => {}
    };
  },
  getInitialState() {
    return {
      error: '',
      schema: null,
      filter: null,
      filterSchema: null,
      filterValues: this.props.filterValues
    };
  },
  componentDidMount() {
    this.canSeach = true;
    this.lastSearchCriteria = '';
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
    this.setState({
      filterValues: filterValues
    });
    this.props.onSubmit(filterValues);
  },
  render() {
    return (
      <Group
        onChange={this.filterChangeHandle}
        filterValues={this.state.filterValues}
        expanded={true}
        expandable={this.props.filterSchema.expandable}
        title={this.props.filterSchema.title}
        fields={this.props.filterSchema.fields}
        children={this.props.filterSchema.children}/>
    );
  }
});


var App = React.createClass({
  onFilterSubmit(criteria) {
    console.log('on Submit', criteria);
  },
  getInitialState() {
    return {
      loaded: false,
      resultResponse: null,
      selectedCode: '',
      schema: null,
      filter: null,
      filterSchema: null,
      filterValues: null,
      detailObject: {}
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
  filterChangeHandle(filterValues) {
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
      api.search(criteria).done((resultResponse) => {
        console.log('resultResponse', resultResponse);
        this.canSeach = true;
        this.resultId++;
        this.refs.map.drowBaloons(resultResponse.objects || []);
        this.setState({
          resultResponse: resultResponse
        });
      }).fail((error) => {
        this.canSeach = true;
        console.error('error while search', error);
      });
    } else {
      console.log('Too mach request per secord');
    }

  },
  componentDidMount() {
    var self = this;
    this.canSeach = true;
    this.resultId = 0;
    api.schema().done((data) => {
      var schema = Schema.fromJson(data);
      var filter = schema.getFilter();
      var filterSchema = filter.buildFilterSchema();
      self.setState({
        loaded: true,
        schema: schema,
        filter: filter,
        filterSchema: filterSchema,
        filterValues: this.getInitialFilterValues(filterSchema)
      });
    }).fail((error) => {
      console.error('Error while schema loading', error);
      self.setState({
        error: 'Ошибка блеать!'
      });
    });
  },
  onBaloonClick(code) {
    this.refs.map.hintBaloon(code);
    this.refs.resultSet.setSelectedCode(code);
  },
  rowSelectHandle(params) {
    this.refs.map.hintBaloon(params.code);
  },
  render() {
    return (
      <div className='objects-search clearfix'>
        <div className="objects-search__results">
          {
            this.state.resultResponse ?
              <SearchResult key={this.resultId} ref='resultSet' onRowSelect={this.rowSelectHandle}
                            total={this.state.resultResponse.total}
                            objects={this.state.resultResponse.objects}
                            schema={this.state.schema} />
              : <div>Укажите условия поиска</div>
          }
        </div>
        <div className='objects-search__map'>
          <Map ref='map' onBaloonClick={this.onBaloonClick} objects={(this.state.resultResponse || {}).objects || []}/>
        </div>
        {
          this.state.loaded ?
          <div className='objects-search__filter'>
            <Filter schema={this.state.schema}
                    filter={this.state.filter}
                    filterSchema={this.state.filterSchema}
                    filterValues={this.state.filterValues}
                    onSubmit={this.filterChangeHandle}/>
          </div>
          : <div>Загрузка фильтра объектов...</div>
        }
      </div>
    );
  }
});


React.render(
  <App />,
  document.getElementById('app')
);

