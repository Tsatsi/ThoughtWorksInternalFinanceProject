'use strict';

/* jasmine specs for services go here */

describe('service', function() {

    var scope, service;

  beforeEach(module('myApp.services'));
    beforeEach(inject(function($injector){
      scope = $injector.get('$rootScope');
      service = $injector.get("XLSXReaderService")
  }))

  describe('xlsx reader service', function() {

      it("should have xlsx defined", function () {
          expect(scope.XLSXReader).toBeDefined();
      });
  });
    it("should read XLSX file", function () {

    });
});
