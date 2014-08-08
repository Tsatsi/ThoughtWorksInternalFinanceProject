'use strict';

/* Services */

angular.module('myApp.services', [])
    .factory('_', ['$window',
        function($window) {
            return $window._;
        }
    ])
    .factory("XLSXReaderService", ['$q', '$rootScope', function($q, $rootScope, XLSXReader)  {
        var service = function(data) {
            angular.extend(this, data);
        };

        service.readFile = function(file, showPreview) {
            var deferred = $q.defer();

            XLSXReader(file, showPreview, function(data){
                $rootScope.$apply(function() {
                    deferred.resolve(data);
                });
            });

            return deferred.promise;
        };

        return service;
    }]);





