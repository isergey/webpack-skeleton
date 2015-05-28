import {VALUE_TYPES} from './characteristics';

export const INPUT_TYPES = {
  range: 'range'
};


export class Filter {
  /**
   * @param {Characteristics} characteristics
   * @param {Groups} groups
   * @param {References} references
   */
  constructor(characteristics, groups, references) {
    this.characteristics = characteristics;
    this.groups = groups;
    this.references = references;
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

    for (let group of this.groups.getGroups()) {
      let node = this.buildFilterNode(group, this.characteristics.getCharacteristicsByGroup(group.id)
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

  buildFilterNode(group, characteristics = []) {
    var node = {
      title: group.name,
      fields: [],
      children: []
    };

    for (let characteristic of characteristics) {
      var input = 'Text';
      if (!characteristic.filter.input) {
        if (characteristic.reference) {
          if (characteristic.filter.multiple) {
            input = 'CheckboxSelect';
          } else {
            input = 'RadioSelect';
          }
        }
      } else {
        if (characteristic.filter.input === INPUT_TYPES.range) {
          input = 'Range';
        }
      }

      let field = {
        name: characteristic.id,
        title: characteristic.title,
        type: characteristic.type || VALUE_TYPES.string,
        expandable: true,
        input: input,
        fromLabel: characteristic.filter.fromLabel,
        toLabel: characteristic.filter.toLabel,
        choices: [],
        initial: characteristic.filter.initial
      };

      if (characteristic.filter.showOn.length > 0) {
        field.showOn = {};
        for (let item of characteristic.filter.showOn) {
          let values = [];
          for (let value of item.values) {
            values.push(value.value);
          }
          field.showOn[item.id] = values;
        }
      }

      //if (characteristic.filter.hideOn.length > 0) {
      //  field.hideOn = {};
      //  for (let item of characteristic.filter.hideOn) {
      //    let values = [];
      //    for (let value of item.values) {
      //      values.push(value);
      //    }
      //    field.hideOn[item.id] = values;
      //  }
      //}

      if (characteristic.reference) {
        var reference = this.references.getReferenceById(characteristic.reference);
        for (let referenceItem of reference.getItems()) {
          field.choices.push([referenceItem.id, referenceItem.value]);
        }
      }
      node.fields.push(field);
    }

    return node;
  }
}

