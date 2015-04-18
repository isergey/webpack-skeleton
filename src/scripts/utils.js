'use strict';

/**
 * Build index of items on 'id' property of item
 * @param {Array} items
 * @returns {{}}
 * @private
 */
export var buildIndexOnId = (items = []) => {
  var index = {};
  for (var item of items) {
    let id = item.id;
    if (id !== undefined) {
      index[id] = item;
    }
  }
  return index;
};

var has = Object.prototype.hasOwnProperty;

export var getDefault = (val, defaultValue = null) => {
  if (val === null || val === undefined) {
    return defaultValue;
  }
  if (typeof val === 'number' && val === 0) {
    return defaultValue;
  }
  if (val.length !== undefined && val.length === 0) {
    return defaultValue;
  }
  for (var key in val) {
    if (has.call(val, key)) {
      return val;
    }
  }
  return defaultValue;
};