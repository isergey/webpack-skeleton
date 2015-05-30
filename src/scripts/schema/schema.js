import {Characteristics, VALUE_TYPES} from './characteristics';
import Groups from './groups';
import {Filter, INPUT_TYPES} from './filter';
import References from './references';
import Units from './units';

export default class Schema {
  constructor(args) {
    this.characteristics = args.characteristics;
    this.groups = args.groups;
    this.references = args.references;
    this.units = args.units;
    this.filter = new Filter(this.characteristics, this.groups, this.references);

  }

  getCharacteristics() {
    return this.characteristics;
  }

  getGroups() {
    return this.groups;
  }

  getFilter() {
    return this.filter;
  }

  getReferences() {
    return this.references;
  }

  getUnits() {
    return this.units;
  }

  buildSearchCriteria(filterValues) {
    var criteriaList = [];
    for (let charactersticId in filterValues) {
      let characteristicValue = filterValues[charactersticId];
      let charactersitic = this.characteristics.getCharacteristicById(charactersticId);
      if (charactersitic === undefined) {
        continue;
      }

      let criteriaValues = [];
      let criteriaRanges = [];

      if (Array.isArray(characteristicValue)) {
        if (charactersitic.filter.multiple) {
          for (let value of characteristicValue) {
            criteriaValues.push({
              value: value
            });
          }
        } else if (characteristicValue.length > 1 && charactersitic.filter.input === INPUT_TYPES.range) {
          let from = characteristicValue[0];
          let to = characteristicValue[1];

          if (charactersitic.type === VALUE_TYPES.number) {
            from = parseFloat(from) || '';
            to = parseFloat(to) || '';
          }
          if (!from) {
            from = '';
          }

          if (!to) {
            to = '';
          }
          criteriaRanges.push({
            from: from,
            to: to
          });
        }
      } else {
        criteriaValues.push({
          value: characteristicValue
        });
      }

      criteriaList.push({
        id: charactersticId,
        type: charactersitic.type,
        values: criteriaValues,
        ranges: criteriaRanges
      });

    }

    return criteriaList;
  }

  static fromJson(data = {}) {
    return new Schema({
      characteristics: Characteristics.fromJson(data.characteristicSchemas),
      groups: Groups.fromJson(data.groups),
      references: References.fromJson(data.references),
      units: Units.fromJson(data.units)
    });
  }
}

