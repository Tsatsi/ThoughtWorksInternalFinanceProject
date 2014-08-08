'use strict';

/* Services */
angular.module('myApp.services', [])

    .factory("XLSXReaderService", ['$q', '$rootScope', function($q, $rootScope, XLSXReader)  {
        var service = function(data) {
            angular.extend(this, data);
        };
        var root = this;

        // Save the previous value of the `XLSXReader` variable.
        var previousXLSXReader = root.XLSXReader;


        // Create a safe reference to the XLSXReader object for use below.
        var XLSXReader = function(file, readCells, handler) {
            var obj = {};
            XLSXReader.utils.intializeFromFile(obj, file, readCells, handler);
            return obj;
        };

        // Export the XLSXReader object for **Node.js**, with
        // backwards-compatibility for the old `require()` API. If we're in
        // the browser, add `XLSXReader` as a global object via a string identifier,
        // for Closure Compiler 'advanced' mode.
        if (typeof exports !== 'undefined') {
            if (typeof module !== 'undefined' && module.exports) {
                exports = module.exports = XLSXReader;
            }
            exports.XLSXReader = XLSXReader;
        } else {
            root.XLSXReader = XLSXReader;
        }

        // Current version.
        XLSXReader.VERSION = '0.0.1';

        XLSXReader.utils = {
            'intializeFromFile': function(obj, file, readCells, handler) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    var data = e.target.result;
                    var workbook = XLSX.read(data, {
                        type: 'binary'
                    });

                    obj.sheets = XLSXReader.utils.parseWorkbook(workbook, readCells);
                    handler(obj);
                };

                reader.readAsBinaryString(file);
            },
            'parseWorkbook': function(workbook, readCells) {
                var sheets = {};

                _.forEachRight(workbook.SheetNames, function(sheetName) {
                    var sheet = workbook.Sheets[sheetName];
                    sheets[sheetName] = XLSXReader.utils.parseSheet(sheet, readCells);
                });

                return sheets;
            },
            'parseSheet': function(sheet, readCells) {
                var range = XLSX.utils.decode_range(sheet['!ref']);
                var sheetData = [];

                if (readCells === true) {
                    _.forEachRight(_.range(range.s.r, range.e.r + 1), function(row) {
                        var rowData = [];
                        _.forEachRight(_.range(range.s.c, range.e.c + 1), function(column) {
                            var cellIndex = XLSX.utils.encode_cell({
                                'c': column,
                                'r': row
                            });
                            var cell = sheet[cellIndex];
                            rowData[column] = cell ? cell.v : undefined;
                        });
                        sheetData[row] = rowData;
                    });
                };

                return {
                    'data': sheetData,
                    'name': sheet.name,
                    'col_size': range.e.c + 1,
                    'row_size': range.e.r + 1
                };
            }
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





