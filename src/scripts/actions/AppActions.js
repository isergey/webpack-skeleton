import alt from '../alt';
import api from '../api';

class AppActions {
  fetchSchema() {
    this.dispatch();
    api.loadSchema().then((schema) => {
      this.actions.schemaLoaded(schema);
    }).catch((error) => {
      console.error('error while schema load', error);
      this.actions.schemaFailed(error);
    });
  }

  schemaLoaded(schema) {
    this.dispatch(schema);
  }

  schemaFailed(error) {
    this.dispatch(error);
  }
}

export default alt.createActions(AppActions);
