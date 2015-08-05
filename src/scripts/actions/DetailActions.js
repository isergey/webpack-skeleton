var alt = require('../alt');

class DetailActions {
  show(params) {
    this.dispatch(params);
  }
  close(params) {
    this.dispatch(params);
  }
}

export default alt.createActions(DetailActions);
