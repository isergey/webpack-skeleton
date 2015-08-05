/* eslint new-cap:1 */

import $ from 'jquery';
import settings from './settings';

const DETAIL_CACHE = {};

class Api {
  constructor(params) {
    this.addr = params.addr;
  }

  loadSchema() {
    return new Promise((resolve, reject) => {
      $.get(`${this.addr}/schema`).done((data) => {
        resolve(data);
      }).error((error) => {
        reject(error);
      });
    });
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
    return new Promise((resolve, reject) => {
      let requestData = JSON.stringify({
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
      $.ajax({
        url: `${this.addr}/search`,
        method: 'post',
        contentType: 'application/json',
        dataType: 'json',
        crossDomain: true,
        data: requestData
      }).done(function (data) {
        resolve(data);
      }).error(function (error) {
        console.error('Error while search', error);
        reject(error);
      });
    });
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
    setTimeout(() => {
      $.get(`${this.addr}/detail`, {
        code: code
      }).done((data) => {
        DETAIL_CACHE[code] = data;
        defer.resolve(data);
      }).error((error) => {
        console.error('error while detail loading', error);
        defer.reject(error);
      });
    }, 200);

    return defer;
  }
}

const api = new Api({
  addr: settings.apiHost
});

export default api;



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
