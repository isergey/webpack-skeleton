'use strict';

import $ from 'jquery';

var SCHEMA_URL = '/data/realty/schema.json';

/**
 * Build index of items on 'id' property of item
 * @param {Array} items
 * @returns {{}}
 * @private
 */
var _buildIndexOnId = (items=[]) => {
  var index = {};
  for (var item of items) {
    let id = item.id;
    if (id !== undefined) {
      index[id] = item;
    }
  }
  return index;
};

class Characteristics {
  constructor(characteristics=[]) {
    this._characteristics = characteristics;
    this._characteristicsIndex = _buildIndexOnId(this._characteristics);
    this._characteristicsByGroups = Characteristics._buildCharacteristicsByGroups(this._characteristics);
  }

  /**
   * Get characteristic by id
   * @param {String} id
   * @returns {*|undefined}
   */
  getCharacteristicById(id) {
    return this._characteristicsIndex[id];
  }

  /**
   * Get characteristics group by group id
   * @param {String} groupId
   * @returns {*|Array}
   */
  getCharacteristicsByGroup(groupId) {
    return this._characteristicsByGroups[groupId] || [];
  }


  static _buildCharacteristicsByGroups(characteristics=[]) {
    var index = {};
    characteristics.forEach((characteristicsItem) => {
      var groupCharacteristics = index[characteristicsItem.group];
      if (groupCharacteristics === undefined) {
        groupCharacteristics = [];
        index[characteristicsItem.group] = groupCharacteristics;
      }
      groupCharacteristics.push(characteristicsItem);
    });

    var characteristicsComparator = ((reverse=false) => {
      return (current, next) => {
        var order = 0;

        if (current.order < next.order) {
          order = -1;
        } else if (current.order > next.order) {
          order = 1;
        }

        if (reverse) {
          order *= -1;
        }
        return order;
      };
    })();

    for (var groupId in index) {
      let characteristics = index[groupId] || [];
      index[groupId] = characteristics.sort(characteristicsComparator);
    }
    return index;
  }
}

class Groups {
  constructor(groups=[]) {
    this._groups = groups.sort((current, next) => {
      var order = 0;

      if (current.order < next.order) {
        order = -1;
      } else if (current.order > next.order) {
        order = 1;
      }

      return order;
    });
    this._groupsIndex = _buildIndexOnId(this._groups);
  }
  getGroups() {
    return this._groups;
  }
  /**
   * Get group by id
   * @param {String} id
   * @returns {*|undefined}
   */
  getGroupById(id) {
    return this._groupsIndex[id];
  }
}


class Filter {
  /**
   * @param {Characteristics} characteristics
   * @param {Groups} groups
   */
  constructor(characteristics, groups) {
    this._characteristics = characteristics;
    this._groups = groups;
  }

  /**
   * Build schema for filter form
   * @returns {{}}
   */
  buildFilterSchema() {
    var filterSchema = null;
    var lastChildren = null;
    var filterByShowInFilter = (characteristic) => {
      return characteristic.showInFilter === true;
    };

    for (let group of this._groups.getGroups()) {
      let node = this._buildFilterNode(group, this._characteristics.getCharacteristicsByGroup(group.id)
        .filter(filterByShowInFilter));
      if (!filterSchema) {
        filterSchema = node;
        lastChildren = node;
      } else {
        lastChildren.children.push(node);
        lastChildren = node;
      }
    }

    return filterSchema;
  }
  _buildFilterNode(group, characteristics=[]) {
    var node = {
      title: group.name,
      fields: [],
      children: []
    };

    for (let characteristic of characteristics) {
      let field = {
        name: characteristic.id,
        title: characteristic.title,
        expandable: true,
        input: 'RadioSelect',
        choices: [
          ['1', 'Аренда'],
          ['2', 'Продажа']
        ],
        initial: '1'
      };
      node.fields.push(field);
    }

    return node;
  }
}

class Schema {
  constructor(schemaData={}) {
    this._schemaData = schemaData;
    this._characteristics = new Characteristics(this._schemaData.characteristicSchemas);
    this._groups = new Groups(this._schemaData.groups);
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
}

export const initSchema = () => {
  return new Promise((resolve, reject) => {
    $.get(SCHEMA_URL).done((data) => {
      resolve(new Schema(data));
    }).error((error) => {
      reject(error);
    });
  });
};