'use strict';
import {buildIndexOnId} from './../utils';

class ReferenceItem {
  constructor(id = '', city = '', value = '') {
    this.id = id;
    this.city = city;
    this.value = value;
  }

  static fromJson(data) {
    return new ReferenceItem(data.id, data.city, data.value);
  }
}

class Reference {
  constructor(id = '', items = []) {
    this.id = id;
    this.items = items;
  }

  getItems() {
    return this.items;
  }

  static fromJson(data) {
    var items = [];
    for (let item of data.items || []) {
      items.push(ReferenceItem.fromJson(item));
    }
    return new Reference(data.id, items);
  }
}

export default class References {
  constructor(references = []) {
    this._references = references;
    this._referencesIndex = buildIndexOnId(references);
  }

  getReferenceById(id) {
    return this._referencesIndex[id];
  }

  static fromJson(referenceList = []) {
    var references = [];
    for (let reference of referenceList) {
      references.push(Reference.fromJson(reference));
    }
    return new References(references);
  }
}