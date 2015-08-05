import alt from '../alt';
import AppActions from '../actions/AppActions';
import Schema from '../schema/schema';

class AppStore {
  constructor() {
    this.schema = null;
    this.filter = null;
    this.filterSchema = null;
    this.schemaLoaded = false;
    this.schemaErrorMessage = '';

    this.bindListeners({
      handleFetchSchema: AppActions.FETCH_SCHEMA,
      handleSchemaLoaded: AppActions.SCHEMA_LOADED,
      handleSchemaFailed: AppActions.SCHEMA_FAILED
    });
  }

  handleFetchSchema() {
    //this.resetState();
  }

  handleSchemaLoaded(schema) {
    this.schema = Schema.fromJson(schema);
    this.filter = this.schema.getFilter();
    this.filterSchema = this.filter.buildFilterSchema();
    this.filterValues = this.getInitialFilterValues(this.filterSchema);
    this.schemaLoaded = true;
    this.schemaErrorMessage = '';
  }

  handleSchemaFailed() {
    this.resetState();
    this.schemaErrorMessage = 'Ошибка при загрузке схемы данных.';
  }

  reset() {
    this.schema = null;
    this.filter = null;
    this.filterSchema = null;
    this.schemaLoaded = false;
    this.schemaErrorMessage = '';
  }

  getInitialFilterValues(filterSchema) {
    var values = {};
    filterSchema.fields.forEach((field) => {
      if (field.initial !== undefined) {
        values[field.name] = field.initial;
      }
    });
    return values;
  }
}

export default alt.createStore(AppStore, 'AppStore');
