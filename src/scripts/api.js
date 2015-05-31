/* eslint new-cap:1 */

import $ from 'jquery';
import settings from './settings';

const DETAIL_CACHE = {};

class Api {
  constructor(params) {
    this.addr = params.addr;
  }

  schema() {
    var defer = $.Deferred();
    $.get(`${this.addr}/schema`).done((data) => {
      defer.resolve(data);
    }).error((error) => {
      defer.reject(error);
    });
    return defer;
  }

  /**
   *
   * @param criteria
   *  [
   {
     id: '000000011',
     type: 'String',
     values: [
       {
         value: '000000016'
       }
     ],
     ranges: [
       {
         from: '',
         to: ''
       }
     ]
   }
   ]
   * @param offset
   * @param limit
   * @param variant
   * @param status
   * @param city 000000001
   * @param prelimiary
   * @returns {*}
   */
  search(criteria = [], offset = 0, limit = 10, variant = '', status = '', city = '', prelimiary = true) {
    var defer = $.Deferred();
    var requestData = JSON.stringify({
      listCriteria: {
        criteria: criteria
      },
      offset: offset,
      limit: limit,
      variant: variant,
      status: status,
      city: city,
      prelimiary: prelimiary
    });
    console.log(requestData);
    $.ajax({
      url: `${this.addr}/search`,
      method: 'post',
      contentType: 'application/json',
      dataType: 'json',
      crossDomain: true,
      data: requestData
    }).done(function (data) {
      defer.resolve(data);
    }).error(function (error) {
      console.error(error);
      defer.reject(error);
    });
    return defer;
  }

  /**
   * Get object by code
   * @param code
   * @returns {*}
   */
  detail(code) {
    var defer = $.Deferred();
    var cachedDetail = DETAIL_CACHE[code];
    if (cachedDetail !== undefined) {
      defer.resolve(cachedDetail);
      console.log('load from cache');
      return defer;
    }

    $.get(`${this.addr}/detail`, {
      code: code
    }).done((data) => {
      DETAIL_CACHE[code] = data;
      defer.resolve(data);
    }).error((error) => {
      console.error('error while detail loading', error);
      defer.reject(error);
    });
    return defer;
  }
}


export const api = new Api({
  addr: settings.apiHost
});



//const search = (args) => {
//  var defer = $.Deferred();
//  $.get(SEARCH_URL).done((data) => {
//    defer.resolve(data);
//  }).error((error) => {
//    console.log(error);
//    defer.reject(error);
//  });
//  return defer;
//};
