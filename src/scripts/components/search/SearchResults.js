import React from 'react';
import SearchStore from '../../stores/SearchStore';
import ResultRow from './ResultRow';


const SearchResults = React.createClass({
  getDefaultProps() {
    return {
      total: 0,
      objects: [],
      selectedCode: '',
      onRowSelect: () => {
      }
    };
  },
  getInitialState() {
    return SearchStore.getState();
  },
  componentDidMount() {
    SearchStore.listen(this.handleSearchStoreUpdate);
  },
  componentWillUnmount() {
    SearchStore.unlisten(this.handleSearchStoreUpdate);
  },
  handleSearchStoreUpdate(state) {
    this.setState(state);
  },
  setSelectedCode(selectedCode) {
    this.setState({
      selectedCode: selectedCode
    });
  },
  rowClickHandle(item) {
    this.props.onRowSelect(item);
    this.setState({
      selectedCode: item.code
    });
  },
  renderSearchNotInited() {
    return (
      <div>Укажите в фильтре объектов необходимые условия</div>
    );
  },
  renderLoader() {
    return (
      <div>Поиск объектов...</div>
    );
  },
  render() {
    if (!this.state.searchInited) {
      return this.renderSearchNotInited();
    }

    if (!this.state.resultsLoaded) {
      return this.renderLoader();
    }
    var results = this.state.objects.map((item, i) => {
      return (
        <ResultRow
          onClick={this.rowClickHandle}
          schema={this.props.schema}
          selectedCode={this.state.selectedCode}
          showDetail={this.state.selectedCode === item.code}
          key={i} data={item}/>
      );
    });

    return (
      <div>
        <div>Объектов найдено: {this.state.total}</div>
        <div>
          {results}
        </div>
      </div>
    );
  }
});

export default SearchResults;
