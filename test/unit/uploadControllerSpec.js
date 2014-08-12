'use strict';


describe('UploadController', function(){

    var controller, scope;

    beforeEach(module('myApp.controllers'));
    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        controller = $controller('UploadController', {$scope: scope});
    }));

    it("should have UploadController defined", function () {
        expect(controller).toBeDefined();
    });

    describe("#upload", function () {

    });




});
