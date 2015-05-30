import {buildIndexOnId} from './../utils';

class UnitItem {
  constructor(id = '', fullName = '') {
    this.id = id;
    this.fullName = fullName;
  }

  static fromJson(data) {
    return new UnitItem(data.id, data.fullName, data.value);
  }
}

export default class Units {
  constructor(items = []) {
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
    for (let item of data || []) {
      items.push(UnitItem.fromJson(item));
    }
    return new Units(items);
  }
}

