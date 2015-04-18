'use strict';

import {buildIndexOnId} from './../utils';

class Group {
  constructor(id, name = '', order = 0) {
    this.id = id;
    this.name = name;
    this.order = order;
  }

  static fromJson(data) {
    return new Group(data.id, data.name, data.order);
  }
}

export default class Groups {
  constructor(groups = []) {
    this._groups = groups.sort((current, next) => {
      var order = 0;

      if (current.order < next.order) {
        order = -1;
      } else if (current.order > next.order) {
        order = 1;
      }

      return order;
    });
    this._groupsIndex = buildIndexOnId(this._groups);
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

  static fromJson(groupList = []) {
    var groups = [];
    for (let group of groupList) {
      groups.push(Group.fromJson(group));
    }
    return new Groups(groups);
  }
}