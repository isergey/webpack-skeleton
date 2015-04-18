'use strict';

export default class Filter {
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
      let node = Filter._buildFilterNode(group, this._characteristics.getCharacteristicsByGroup(group.id)
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

  static _buildFilterNode(group, characteristics = []) {
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

