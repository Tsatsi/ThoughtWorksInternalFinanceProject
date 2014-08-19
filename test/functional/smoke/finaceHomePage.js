'use strict';


describe('P1 Dashboard', function () {

    var path = require('path');
    var financeHomePagePage = require('../pages/financeHomePagePage.js');

    browser.get('index.html');

    it('should display homepage Title', function () {
        expect(financeHomePagePage.pageTitle()).toEqual('P1 Dashboard');
    });

    it('should display header', function () {
        expect(financeHomePagePage.header()).toBe('Internal Finance Dashboard');
    });

    it('should have upload button', function () {
        expect(financeHomePagePage.uploadButtonPresent()).toBeTruthy();

    });

    it('should have and upload button with button value: "Upload Excel File" ', function () {
        expect(financeHomePagePage.uploadButtonValue()).toBe('Upload Excel File');
    });

    it('should upload a file and display success message when the file is valid', function () {
        uploadFile('../../input-valid.xlsx');
        //add expectation here
    });

    it('should upload a file and display an error message when the file is invalid', function () {
        uploadFile('../../input-invalid.xlsx');
        //add expectation here
    });

    var uploadFile = function (filePath) {
        var absolutePath = path.resolve(__dirname, filePath);
        element(by.css('input[type="file"]')).sendKeys(absolutePath);
    }


});
