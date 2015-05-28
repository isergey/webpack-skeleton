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
    this.groups = groups.sort((current, next) => {
      var order = 0;

      if (current.order < next.order) {
        order = -1;
      } else if (current.order > next.order) {
        order = 1;
      }

      return order;
    });
    this.groupsIndex = buildIndexOnId(this.groups);
  }

  getGroups() {
    return this.groups;
  }

  /**
   * Get group by id
   * @param {String} id
   * @returns {*|undefined}
   */
  getGroupById(id) {
    return this.groupsIndex[id];
  }

  static fromJson(groupList = []) {
    var groups = [];
    for (let group of groupList) {
      groups.push(Group.fromJson(group));
    }
    return new Groups(groups);
  }
}
