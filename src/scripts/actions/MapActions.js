var alt = require('../alt');

class MapActions {
  drowBaloons(objects) {
    this.dispatch(objects);
  }
}

export default alt.createActions(MapActions);
