import {buildIndexOnId, getDefault} from './../utils';


class DisplayConditions {
  /**
   *
   * @param id
   * @param {Array} values of {key: value}
   */
  constructor(id, values = []) {
    this.id = id;
    this.values = values;
  }

  static fromJson(data) {
    return new DisplayConditions(data.id, data.values);
  }
}


class Filter {
  constructor(args) {
    this.fromLabel = getDefault(args.fromLabel, '');
    this.toLabel = getDefault(args.toLabel, '');
    this.initial = getDefault(args.initial, '');
    this.input = getDefault(args.input, '');
    this.multiple = getDefault(args.multiple, false);
    this.opened = getDefault(args.opened, false);
    this.hideOn = args.hideOn;
    this.showOn = args.showOn;

  }

  static fromJson(data) {
    var showOn = [];
    for (let showOnItem of getDefault(data.showOn, [])) {
      showOn.push(DisplayConditions.fromJson(showOnItem));
    }

    var hideOn = [];

    for (let hideOnItem of getDefault(data.hideOn, [])) {
      hideOn.push(DisplayConditions.fromJson(hideOnItem));
    }

    return new Filter({
      showOn: showOn,
      hideOn: hideOn,
      fromLabel: data.fromLabel,
      toLabel: data.toLabel,
      initial: data.initial,
      input: data.input,
      multiple: data.multiple,
      opened: data.opened
    });
  }
}

export const VALUE_TYPES = {
  string: 'String',
  number: 'Number',
  boolean: 'Boolean',
  date: 'Date'
};


class Characteristic {

  constructor(args) {
    this.filter = getDefault(args.filter, null);
    this.group = args.group;
    this.id = args.id;
    this.order = getDefault(args.order, 0);
    this.reference = getDefault(args.reference, null);
    this.showInFilter = getDefault(args.showInFilter, false);
    this.title = getDefault(args.title, '');
    this.type = getDefault(args.type, VALUE_TYPES.string);
    this.unitId = getDefault(args.unitId, '');
  }

  static fromJson(data) {
    var filter = data.filter ? Filter.fromJson(data.filter) : null;
    return new Characteristic({
      filter: filter,
      group: data.group,
      id: data.id,
      order: data.order,
      reference: data.reference,
      showInFilter: data.showInFilter,
      title: data.title,
      type: data.type,
      unitId: data.unitId
    });
  }
}


export class Characteristics {
  constructor(characteristics = []) {
    this.characteristics = characteristics;
    this.characteristicsIndex = buildIndexOnId(this.characteristics);
    this.characteristicsByGroups = Characteristics.buildCharacteristicsByGroups(this.characteristics);
  }

  /**
   * Get characteristic by id
   * @param {String} id
   * @returns {Characteristic|undefined}
   */
  getCharacteristicById(id) {
    return this.characteristicsIndex[id];
  }

  /**
   * Get characteristics group by group id
   * @param {String} groupId
   * @returns {*|Array}
   */
  getCharacteristicsByGroup(groupId) {
    return this.characteristicsByGroups[groupId] || [];
  }

  static fromJson(characteristicList = []) {
    var characteristics = [];
    for (let characteristic of characteristicList) {
      characteristics.push(Characteristic.fromJson(characteristic));
    }
    return new Characteristics(characteristics);
  }

  static buildCharacteristicsByGroups(characteristics = []) {
    var index = {};
    characteristics.forEach((characteristicsItem) => {
      var groupCharacteristics = index[characteristicsItem.group];
      if (groupCharacteristics === undefined) {
        groupCharacteristics = [];
        index[characteristicsItem.group] = groupCharacteristics;
      }
      groupCharacteristics.push(characteristicsItem);
    });

    var characteristicsComparator = ((reverse = false) => {
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
      let lcharacteristics = index[groupId] || [];
      index[groupId] = lcharacteristics.sort(characteristicsComparator);
    }
    return index;
  }
}
