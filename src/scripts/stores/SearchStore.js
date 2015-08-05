import alt from '../alt';
import SearchActions from '../actions/SearchActions';
//import Schema from '../schema/schema';

class SearchStore {
  constructor() {
    this.searchInited = false;
    this.resultsLoaded = false;
    this.resultsError = '';

    this.total = 0;
    this.objects = [];

    this.bindListeners({
      handleFetchResults: SearchActions.FETCH_RESULTS,
      handleResultsLoaded: SearchActions.RESULTS_LOADED,
      handleResultsFailed: SearchActions.RESULTS_FAILED
    });
  }

  handleFetchResults() {
    this.searchInited = true;
    this.resultsLoaded = false;
    this.resultsError = '';
  }

  handleResultsLoaded(response) {
    this.resultsLoaded = true;
    this.total = response.total || 0;
    this.objects = response.objects || [];
  }

  handleResultsFailed() {
    this.resultsError = 'При поиске объектов возникла ошибка';
  }

  reset() {
    this.searchInited = false;
    this.resultsLoaded = false;
    this.resultsError = '';
    this.objects = [];
  }
}

export default alt.createStore(SearchStore, 'SearchStore');
