'use strict';

/* Services */
angular.module('financeApplication.services', [])
    .factory("XLSXReaderService", ['$q', function ($q) {

        var service = function (data) {
        };

        var XLSXReader = function (file, handler) {
            var obj = {};
            XLSXReader.loadFile(obj, file, handler);
            return obj;
        };

        XLSXReader.loadFile = function (obj, file, handler) {

            var reader = new FileReader();

            reader.onload = function (e) {
                var data = e.target.result;
                var workbook = XLSX.read(data, {
                    type: 'binary'
                });

                obj.sheets = workbook.Sheets;
                handler(obj);
            };

            reader.readAsBinaryString(file);
        };

        service.readFile = function (file) {

            var deferred = $q.defer();

            XLSXReader(file, function (data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        };

        return service;
    }]);