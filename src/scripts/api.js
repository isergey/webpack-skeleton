'use strict';
import $ from 'jquery';

const SEARCH_URL = 'data/realty/search/results.json';


const search = (args) => {
  var defer = $.Deferred();
  $.get(SEARCH_URL).done((data) => {
    defer.resolve(data);
  }).error((error) => {
    console.log(error);
    defer.reject(error);
  });
  return defer;
};

export {search};