'use strict';

import $ from 'jquery';
import Characteristics from './characteristics';
import Groups from './groups';
import Filter from './filter';
import References from './references';


var SCHEMA_URL = '/data/realty/schema.json';


class Schema {
  constructor(args) {
    this._characteristics = args.characteristics;
    this._groups = args.groups;
    this._references = args.references;
    this._filter = new Filter(this._characteristics, this._groups);
  }

  getCharacteristics() {
    return this._characteristics;
  }

  getGroups() {
    return this._groups;
  }

  getFilter() {
    return this._filter;
  }

  getReferences() {
    return this._references;
  }

  static fromJson(data = {}) {
    return new Schema({
      characteristics: Characteristics.fromJson(data.characteristicSchemas),
      groups: Groups.fromJson(data.groups),
      references: References.fromJson(data.references)
    });
  }
}

export const initSchema = () => {
  return new Promise((resolve, reject) => {
    $.get(SCHEMA_URL).done((data) => {
      resolve(Schema.fromJson(data));
    }).error((error) => {
      reject(error);
    });
  });
};