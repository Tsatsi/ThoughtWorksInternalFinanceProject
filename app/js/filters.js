'use strict';

/* Filters */

angular.module('financeApplication.filters', []).
  filter('typeFilter', function() {
    return function(amount, type) {
        if(type==='Percentage'){
            return amount + '%';
        }else {
            return '$' + amount;
        }

    };
  });
