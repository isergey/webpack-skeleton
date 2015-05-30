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
    this.itemIndex = buildIndexOnId(items);
  }

  getItems() {
    return this.items;
  }

  getItemById(id) {
    var item = this.itemIndex[id];
    if (item === undefined) {
      return null;
    }
    return item;
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
    this.references = references;
    this.referencesIndex = buildIndexOnId(references);
  }

  getReferenceById(id) {
    var reference = this.referencesIndex[id];
    return reference === undefined ? null : reference;
  }

  /**
   * Get reference item
   * @param referenceId
   * @param itemId
   * @returns {ReferenceItem | null}
   */
  getItem(referenceId, itemId) {
    var reference = this.getReferenceById(referenceId);
    return reference === null ? null : reference.getItemById(itemId);

  }

  static fromJson(referenceList = []) {
    var references = [];
    for (let reference of referenceList) {
      references.push(Reference.fromJson(reference));
    }
    return new References(references);
  }
}
