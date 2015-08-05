import alt from '../alt';
import api from '../api';

class SearchActions {
  constructor() {
    this.searchEnded = true;
  }

  fetchResults(params) {
    let searchEnded = this.searchEnded;
    if (searchEnded) {
      return;
    }
    this.dispatch();
    setTimeout(() => {
      searchEnded = false;
      api.search(params).then((results) => {
        this.actions.resultsLoaded(results);
        searchEnded = true;
      }).catch((error) => {
        searchEnded = true;
        console.error('Error while object search', error);
        this.actions.resultsFailed(error);
      });
    }, 100);
  }

  resultsLoaded(results) {
    this.dispatch(results);
  }

  resultsFailed(error) {
    this.dispatch(error);
  }
}

export default alt.createActions(SearchActions);
